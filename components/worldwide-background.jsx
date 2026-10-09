'use client';

import { useEffect, useRef } from 'react';
import { generateBayer } from '@/components/dither';

/*
  Site-wide background texture built from /worldwideAlert.svg.

  The SVG's two shapes (the globe and the four-point star) are rasterized into
  separate channels of one texture, then tiled across the page in a staggered
  grid and Bayer-dithered. It sits behind all content and scrolls slower than
  the page for depth.

  Every variant shares a faint grey "watermark" base and an animated "signal"
  treatment (breathing grey globes, alert rings, and flaring stars). They differ
  in where and when the signal shows up:

    signal     signal everywhere, all the time
    quiet      watermark only
    spotlight  signal follows the cursor (and blooms while scrolling on touch)
    scroll     signal blooms while scrolling, then settles back to the watermark
    gutter     signal only in the margins beside the content column
    giant      one huge, very faint globe parked at the bottom of the screen
*/

export const BACKGROUND_VARIANTS = ['signal', 'quiet', 'spotlight', 'scroll', 'gutter', 'giant'];

const SVG_SRC = '/worldwideAlert.svg';
const TEX_W = 512;
const TEX_H = 256;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_scroll;   // parallaxed page scroll in device px
uniform float u_time;
uniform float u_dpr;
uniform float u_pixel;    // device px per dither cell
uniform float u_n;        // bayer matrix size
uniform float u_scale;    // tile scale (smaller on phones)
uniform float u_mode;     // index into BACKGROUND_VARIANTS
uniform vec2  u_mouse;    // eased cursor position, CSS px
uniform float u_mouseOn;  // 0-1, eased cursor presence
uniform float u_energy;   // 0-1, decaying scroll activity
uniform float u_hover;    // 1 when the device has a real pointer
uniform float u_content;  // content column width, CSS px
uniform sampler2D u_bayer;
uniform sampler2D u_mark; // r = globe, g = star

const vec3 INK    = vec3(0.020, 0.020, 0.020); // #050505
const vec3 PAPER  = vec3(1.0);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Always sample (no early return) so mipmap derivatives stay well-defined.
float sampleMark(vec2 uv, float channel) {
  float inside = step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
  vec4 m = texture2D(u_mark, clamp(uv, 0.0, 1.0));
  return inside * (channel < 0.5 ? m.r : m.g);
}

void main() {
  // Snap to dither cells, then work in CSS px with a top-left origin.
  vec2 frag = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 cell = floor((frag + u_scroll) / u_pixel);
  vec2 p = (cell + 0.5) * u_pixel / u_dpr;
  vec2 screen = frag / u_dpr;
  vec2 view = u_res / u_dpr;
  bool giant = u_mode > 4.5;

  float threshold = texture2D(u_bayer, (mod(cell, u_n) + 0.5) / u_n).r;

  vec2 tile, globe, local, center;
  float seed;
  if (giant) {
    // One mark, wider than the screen, parked low so its top arc peeks up.
    globe = vec2(1.0, 0.5) * max(view.x * 1.15, 900.0);
    tile = globe * 2.0;
    center = u_scroll / u_dpr + vec2(view.x * 0.5, view.y * 0.9);
    local = p;
    seed = 0.37;
  } else {
    // Staggered tiling: every other row shifts by half a tile, and some spots
    // are left empty (below) so it reads as a scatter rather than wallpaper.
    tile = vec2(300.0, 210.0) * u_scale;
    globe = vec2(108.0, 54.0) * u_scale;
    float row = floor(p.y / tile.y);
    vec2 shifted = p + vec2(mod(row, 2.0) * tile.x * 0.5, 0.0);
    local = fract(shifted / tile) * tile;
    center = tile * 0.5;
    seed = hash(floor(shifted / tile));
  }
  float present = giant ? 1.0 : step(0.4, seed);
  vec2 uv = (local - (center - globe * 0.5)) / globe;

  // A slow diagonal broadcast wave, broken up by noise, sets how lit each area is.
  float wave = 0.5 + 0.5 * sin(dot(p, vec2(0.0042, 0.0063)) - u_time * 0.55);
  wave = mix(wave, vnoise(p * 0.004 + u_time * 0.05), 0.35);
  wave = smoothstep(0.15, 0.9, wave);

  // How much of the animated "signal" treatment this pixel gets (0 = watermark).
  float accent = 1.0;
  if (u_mode > 0.5 && u_mode < 1.5) {
    accent = 0.0;
  } else if (u_mode > 1.5 && u_mode < 2.5) {
    float spot = u_mouseOn * (1.0 - smoothstep(60.0, 280.0, length(screen - u_mouse)));
    accent = max(spot, u_energy * (1.0 - u_hover));
  } else if (u_mode > 2.5 && u_mode < 3.5) {
    accent = u_energy;
  } else if (u_mode > 3.5 && u_mode < 4.5) {
    float halfWidth = u_content * 0.5;
    accent = smoothstep(halfWidth + 8.0, halfWidth + 200.0, abs(screen.x - view.x * 0.5));
  }

  // Alert rings expanding out of each globe on its own schedule.
  float phase = fract(u_time * (giant ? 0.04 : 0.12) + seed);
  float radius = giant
    ? mix(globe.y * 0.5, globe.x * 0.75, phase)
    : mix(globe.y * 0.55, min(tile.x, tile.y) * 0.5, phase);
  float ringDist = abs(length((local - center) * vec2(1.0, 1.6)) - radius);
  float ringWidth = giant ? 4.0 : 2.0 * u_scale;
  float ring = (1.0 - smoothstep(ringWidth * 0.5, ringWidth * 1.5, ringDist)) * (1.0 - phase) * present;
  ring *= accent * (giant ? 0.2 : 0.3) * wave;

  float globeA = sampleMark(uv, 0.0) * present;
  float monoDensity = globeA * mix(0.2, 0.34, wave);
  float signalDensity = globeA * (giant ? mix(0.04, 0.16, wave) : mix(0.04, 0.34, wave));
  float globeDensity = mix(monoDensity, signalDensity, accent);

  // The star is a flare across the globe: it swells and shrinks on each tile's
  // own rhythm and knocks the globe grid out behind it. In the watermark it holds still.
  float tw = mix(0.5, 0.5 + 0.5 * sin(u_time * 1.1 + seed * 6.2831), accent);
  vec2 starCenter = vec2(0.493, 0.5);
  vec2 starScale = vec2(mix(0.35, 0.8, tw), mix(0.45, 0.9, tw));
  float starA = sampleMark(starCenter + (uv - starCenter) / starScale, 1.0) * present;
  float starHalo = sampleMark(starCenter + (uv - starCenter) / (starScale * 1.25), 1.0) * present;
  float starDensity = giant ? mix(0.06, 0.18, tw) : mix(0.5, mix(0.25, 0.7, tw), accent);

  // Monochrome: the signal treatment is a slightly darker grey than the watermark.
  vec3 ink = mix(PAPER, INK, mix(0.1, 0.16, accent));

  vec3 color = PAPER;
  if (step(threshold, ring) > 0.5) color = mix(PAPER, INK, 0.12);
  if (step(threshold, globeDensity) > 0.5) color = ink;
  if (starHalo > 0.5) color = PAPER;
  if (starA > 0.5 && step(threshold, starDensity) > 0.5) color = ink;

  gl_FragColor = vec4(color, 1.0);
}
`;

// Split the SVG into its globe and star shapes so they can be animated separately.
async function rasterizeMark() {
  const text = await (await fetch(SVG_SRC)).text();
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.documentElement;
  const viewBox = svg.getAttribute('viewBox') || '0 0 190 95';
  const paths = [...doc.querySelectorAll('path')];

  const drawAlpha = async (path) => {
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${TEX_W}" height="${TEX_H}" preserveAspectRatio="none">${path.outerHTML}</svg>`;
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = TEX_W;
    c.height = TEX_H;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, TEX_W, TEX_H);
    return ctx.getImageData(0, 0, TEX_W, TEX_H).data;
  };

  const [globe, star] = await Promise.all([drawAlpha(paths[0]), drawAlpha(paths[1])]);
  const out = new Uint8Array(TEX_W * TEX_H * 4);
  for (let i = 0; i < TEX_W * TEX_H; i++) {
    out[i * 4] = globe[i * 4 + 3];
    out[i * 4 + 1] = star[i * 4 + 3];
    out[i * 4 + 3] = 255;
  }
  return out;
}

export default function WorldwideBackground({
  variant = 'signal',
  pixelSize = 2,
  matrixSize = 8,
  parallax = 0.45,
  contentWidth = 1152, // max-w-6xl
  maxDpr = 2,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mode = Math.max(0, BACKGROUND_VARIANTS.indexOf(variant));
    const scrollRate = mode === BACKGROUND_VARIANTS.indexOf('giant') ? 0.1 : parallax;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let raf = 0;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.warn('WorldwideBackground: shader link failed', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* --- Bayer threshold texture (unit 0) --- */
    const bayerTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bayerTex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.LUMINANCE, matrixSize, matrixSize, 0,
      gl.LUMINANCE, gl.UNSIGNED_BYTE, generateBayer(matrixSize),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    /* --- mark texture (unit 1), filled once the SVG is rasterized --- */
    const markTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, markTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

    const u = (name) => gl.getUniformLocation(program, name);
    const uRes = u('u_res');
    const uScroll = u('u_scroll');
    const uTime = u('u_time');
    const uDpr = u('u_dpr');
    const uPixel = u('u_pixel');
    const uScale = u('u_scale');
    gl.uniform1i(u('u_bayer'), 0);
    gl.uniform1i(u('u_mark'), 1);
    gl.uniform1f(u('u_n'), matrixSize);
    gl.uniform1f(u('u_mode'), mode);
    gl.uniform1f(u('u_content'), contentWidth);
    const uMouse = u('u_mouse');
    const uMouseOn = u('u_mouseOn');
    const uEnergy = u('u_energy');
    const hasHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    gl.uniform1f(u('u_hover'), hasHover ? 1 : 0);

    // Cursor and scroll state, eased every frame so the signal fades in and out smoothly.
    const pointer = { x: -1000, y: -1000, tx: -1000, ty: -1000, on: 0, target: 0 };
    let energy = 0;
    let lastScrollY = window.scrollY;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uDpr, dpr);
      // Phones get smaller globes, so halve the dither cell to keep their lines legible.
      const compact = window.innerWidth < 640;
      gl.uniform1f(uPixel, Math.max(1, pixelSize * (compact ? 0.5 : 1) * dpr));
      gl.uniform1f(uScale, compact ? 0.7 : 1);
    };
    resize();

    let start = 0;
    const draw = (t = 0) => {
      if (!start) start = t;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.on += (pointer.target - pointer.on) * 0.06;
      energy *= 0.96;
      gl.uniform1f(uTime, prefersReduced ? 0 : (t - start) / 1000);
      gl.uniform2f(uScroll, window.scrollX * scrollRate * dpr, window.scrollY * scrollRate * dpr);
      gl.uniform2f(uMouse, pointer.x, pointer.y);
      gl.uniform1f(uMouseOn, pointer.on);
      gl.uniform1f(uEnergy, prefersReduced ? 0 : Math.min(1, energy));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (prefersReduced) draw();
      else raf = requestAnimationFrame(loop);
    };

    rasterizeMark()
      .then((pixels) => {
        if (disposed) return;
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, markTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TEX_W, TEX_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        play();
      })
      .catch(() => {});
    play();

    const onResize = () => {
      resize();
      if (prefersReduced) draw();
    };
    const onScroll = () => {
      energy = Math.min(1.4, energy + Math.abs(window.scrollY - lastScrollY) * 0.004);
      lastScrollY = window.scrollY;
      if (prefersReduced) draw();
    };
    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      if (pointer.target === 0) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.target = 1;
    };
    const onPointerLeave = () => {
      pointer.target = 0;
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else play();
    };
    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onLost, false);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteTexture(bayerTex);
      gl.deleteTexture(markTex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [variant, pixelSize, matrixSize, parallax, contentWidth, maxDpr]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        background: '#fff',
      }}
    />
  );
}
