'use client';

import { useEffect, useRef } from 'react';
import {
  CELL_CANVAS_STYLE,
  IDLE_FRAME_MS,
  createBayerTexture,
  createCellGrid,
  createFullscreenProgram,
  createGl,
} from '@/components/dither';

/*
  Site-wide background texture built from /worldwideAlert.svg.

  The SVG's two shapes (the globe and the four-point star) are rasterized into
  separate channels of one texture, then tiled across the page in a staggered
  grid and Bayer-dithered. It sits behind all content and scrolls slower than
  the page for depth.

  Behind the content column the globes are a faint, still grey "watermark" that
  fades out toward the middle of the screen. Out in the margins beside it they
  get the animated "signal" treatment: breathing grey globes, alert rings, and
  flaring stars.
*/

const SVG_SRC = '/worldwideAlert.svg';
const TEX_W = 512;
const TEX_H = 256;

const FRAG = `
precision highp float;
uniform vec2  u_res;      // canvas size in cells
uniform vec2  u_origin;   // index of the top-left cell in parallaxed page space
uniform float u_cell;     // CSS px per dither cell
uniform float u_shiftX;   // CSS px the canvas is shifted by to stay on the cell grid (<= 0)
uniform float u_viewW;    // viewport width, CSS px
uniform float u_time;
uniform float u_n;        // bayer matrix size
uniform float u_scale;    // tile scale (smaller on phones)
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

// Masked to the unit square so neighbouring tiles never pick up a clamped edge.
float sampleMark(vec2 uv, float channel) {
  float inside = step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
  vec4 m = texture2D(u_mark, clamp(uv, 0.0, 1.0));
  return inside * (channel < 0.5 ? m.r : m.g);
}

void main() {
  // One fragment per dither cell; work in CSS px with a top-left origin.
  vec2 pix = vec2(floor(gl_FragCoord.x), u_res.y - 1.0 - floor(gl_FragCoord.y));
  vec2 cell = u_origin + pix;
  vec2 p = (cell + 0.5) * u_cell;
  float screenX = (pix.x + 0.5) * u_cell + u_shiftX;

  float threshold = texture2D(u_bayer, (mod(cell, u_n) + 0.5) / u_n).r;

  // Staggered tiling: every other row shifts by half a tile, and some spots
  // are left empty (below) so it reads as a scatter rather than wallpaper.
  vec2 tile = vec2(300.0, 210.0) * u_scale;
  vec2 globe = vec2(108.0, 54.0) * u_scale;
  float row = floor(p.y / tile.y);
  vec2 shifted = p + vec2(mod(row, 2.0) * tile.x * 0.5, 0.0);
  vec2 local = fract(shifted / tile) * tile;
  vec2 center = tile * 0.5;
  float seed = hash(floor(shifted / tile));
  float present = step(0.4, seed);
  vec2 uv = (local - (center - globe * 0.5)) / globe;

  // A slow diagonal broadcast wave, broken up by noise, sets how lit each area is.
  float wave = 0.5 + 0.5 * sin(dot(p, vec2(0.0042, 0.0063)) - u_time * 0.55);
  wave = mix(wave, vnoise(p * 0.004 + u_time * 0.05), 0.35);
  wave = smoothstep(0.15, 0.9, wave);

  // How much of the animated "signal" treatment this cell gets: 0 behind the content, 1 in the margins.
  float halfWidth = u_content * 0.5;
  float fromCenter = abs(screenX - u_viewW * 0.5);
  float accent = smoothstep(halfWidth + 8.0, halfWidth + 200.0, fromCenter);

  // Marks fade out toward the middle of the screen so they stay out from under the text. Full
  // strength from the edge of the content column (or the screen edge on phones) outwards; the
  // cubic keeps most of the column nearly empty and ramps up close to its edge.
  float fade = pow(clamp(fromCenter / (min(u_content, u_viewW) * 0.5 + 8.0), 0.0, 1.0), 3.0);

  // Alert rings expanding out of each globe on its own schedule.
  float phase = fract(u_time * 0.12 + seed);
  float radius = mix(globe.y * 0.55, min(tile.x, tile.y) * 0.5, phase);
  float ringDist = abs(length((local - center) * vec2(1.0, 1.6)) - radius);
  float ringWidth = 2.0 * u_scale;
  float ring = (1.0 - smoothstep(ringWidth * 0.5, ringWidth * 1.5, ringDist)) * (1.0 - phase) * present;
  ring *= accent * 0.3 * wave;

  float globeA = sampleMark(uv, 0.0) * present;
  float monoDensity = globeA * mix(0.2, 0.34, wave);
  float signalDensity = globeA * mix(0.04, 0.34, wave);
  float globeDensity = mix(monoDensity, signalDensity, accent) * fade;

  // The star is a flare across the globe: it swells and shrinks on each tile's
  // own rhythm and knocks the globe grid out behind it. In the watermark it holds still.
  float tw = mix(0.5, 0.5 + 0.5 * sin(u_time * 1.1 + seed * 6.2831), accent);
  vec2 starCenter = vec2(0.493, 0.5);
  vec2 starScale = vec2(mix(0.35, 0.8, tw), mix(0.45, 0.9, tw));
  float starA = sampleMark(starCenter + (uv - starCenter) / starScale, 1.0) * present;
  float starHalo = sampleMark(starCenter + (uv - starCenter) / (starScale * 1.25), 1.0) * present;
  float starDensity = mix(0.5, mix(0.25, 0.7, tw), accent) * fade;

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

    const gl = createGl(canvas, { alpha: false });
    if (!gl) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let raf = 0;

    const prog = createFullscreenProgram(gl, FRAG, 'WorldwideBackground');
    if (!prog) return;
    const u = prog.uniform;

    const bayerTex = createBayerTexture(gl, matrixSize);

    /* --- mark texture (unit 1), filled once the SVG is rasterized --- */
    const markTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, markTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

    const uRes = u('u_res');
    const uOrigin = u('u_origin');
    const uCell = u('u_cell');
    const uShiftX = u('u_shiftX');
    const uViewW = u('u_viewW');
    const uTime = u('u_time');
    const uScale = u('u_scale');
    gl.uniform1i(u('u_bayer'), 0);
    gl.uniform1i(u('u_mark'), 1);
    gl.uniform1f(u('u_n'), matrixSize);
    gl.uniform1f(u('u_content'), contentWidth);

    const grid = createCellGrid(canvas, gl);
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      // Phones get smaller globes, so halve the dither cell to keep their lines legible.
      const compact = window.innerWidth < 640;
      grid.resize(pixelSize * (compact ? 0.5 : 1) * dpr, dpr);
      gl.uniform2f(uRes, grid.cols, grid.rows);
      gl.uniform1f(uCell, grid.cell);
      gl.uniform1f(uViewW, window.innerWidth);
      gl.uniform1f(uScale, compact ? 0.7 : 1);
    };
    resize();

    const start = performance.now();
    let lastDraw = -Infinity;
    let lastX = NaN;
    let lastY = NaN;
    const draw = (t = performance.now()) => {
      lastX = window.scrollX;
      lastY = window.scrollY;
      const { ox, oy, dx } = grid.align(lastX * parallax, lastY * parallax);
      gl.uniform2f(uOrigin, ox, oy);
      gl.uniform1f(uShiftX, dx);
      gl.uniform1f(uTime, prefersReduced ? 0 : (t - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      lastDraw = t;
    };

    // Redraw every frame while the page scrolls (to keep the parallax smooth), otherwise at 30fps.
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - lastDraw >= IDLE_FRAME_MS || window.scrollX !== lastX || window.scrollY !== lastY) {
        draw(t);
      }
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
        // Each cell samples the mark once, so plain linear filtering matches the old full-res look.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        play();
      })
      .catch(() => {});
    play();

    const onResize = () => {
      resize();
      draw();
    };
    // With reduced motion there is no loop, so redraw on scroll to keep the parallax in place.
    const onScroll = () => {
      if (prefersReduced) draw();
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
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onLost, false);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteTexture(bayerTex);
      gl.deleteTexture(markTex);
      prog.dispose();
    };
  }, [pixelSize, matrixSize, parallax, contentWidth, maxDpr]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        ...CELL_CANVAS_STYLE,
        zIndex: -1,
        background: '#fff',
      }}
    />
  );
}
