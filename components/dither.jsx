'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/* ----- module-level View Transition hook (shared across instances) ----- */
const vtCallbacks = new Set();
let vtPatched = false;
function ensureViewTransitionPatch() {
  if (vtPatched || typeof document === 'undefined') return;
  const anyDoc = document;
  if (typeof anyDoc.startViewTransition !== 'function') return;
  vtPatched = true;
  const orig = anyDoc.startViewTransition.bind(document);
  anyDoc.startViewTransition = (cb) => {
    const t = orig(cb);
    const fire = () => vtCallbacks.forEach((f) => f());
    // Re-assert our top-layer position after the ::view-transition layer exists.
    requestAnimationFrame(fire);
    t?.ready?.then(fire).catch(() => {});
    return t;
  };
}

/* ----- Bayer threshold matrix, generated on the CPU ----- */
function generateBayer(n) {
  let m = [[0, 2], [3, 1]];
  let size = 2;
  while (size < n) {
    const ns = size * 2;
    const nm = Array.from({ length: ns }, () => new Array(ns).fill(0));
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const v = m[y][x] * 4;
        nm[y][x] = v + 0;
        nm[y][x + size] = v + 2;
        nm[y + size][x] = v + 3;
        nm[y + size][x + size] = v + 1;
      }
    }
    m = nm;
    size = ns;
  }
  const out = new Uint8Array(n * n);
  const denom = n * n;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      // Center each threshold in its band and map to 0–255.
      out[y * n + x] = Math.round(((m[y][x] + 0.5) / denom) * 255);
    }
  }
  return out;
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_scroll;  // page scroll offset in device px (anchors dither to the document)
uniform float u_time;
uniform float u_pixel;   // device px per dither cell
uniform float u_n;       // bayer matrix size
uniform float u_amp;     // animation amplitude
uniform float u_speed;
uniform vec3  u_color;
uniform sampler2D u_bayer;

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

void main() {
  // Sample in document space (top-left origin) so the pattern scrolls with the page.
  vec2 docPos = vec2(gl_FragCoord.x + u_scroll.x, (u_res.y - gl_FragCoord.y) + u_scroll.y);
  vec2 cell = floor(docPos / u_pixel);
  vec2 uv = (mod(cell, u_n) + 0.5) / u_n;
  float threshold = texture2D(u_bayer, uv).r;

  // A slowly drifting field modulates dither density so it feels alive.
  float field = vnoise(cell * 0.02 + vec2(u_time * u_speed * 0.1, u_time * u_speed * 0.07));
  float signal = 0.5 + (field - 0.5) * u_amp;

  float bit = step(threshold, signal);
  gl_FragColor = vec4(u_color * bit, 1.0);
}
`;

export default function DitherOverlay({
  pixelSize = 1,
  opacity = 0.3,
  blendMode = 'overlay',
  animate = true,
  speed = 1,
  amount = 0.6,
  color = [1, 1, 1],
  matrixSize = 8,
  maxDpr = 2,
  topLayer = true,
  zIndex = 2147483647,
}) {
  const pathname = usePathname();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const doAnimate = animate && !prefersReduced;

    /* --- compile --- */
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
      console.warn('DitherOverlay: shader link failed', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    /* --- fullscreen triangle --- */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* --- Bayer texture --- */
    const n = matrixSize;
    const bayer = generateBayer(n);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, n, n, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bayer);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    /* --- uniforms --- */
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uPixel = gl.getUniformLocation(program, 'u_pixel');
    const uN = gl.getUniformLocation(program, 'u_n');
    const uAmp = gl.getUniformLocation(program, 'u_amp');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uColor = gl.getUniformLocation(program, 'u_color');
    const uBayer = gl.getUniformLocation(program, 'u_bayer');

    gl.uniform1i(uBayer, 0);
    gl.uniform1f(uN, n);
    gl.uniform1f(uAmp, doAnimate ? amount : 0);
    gl.uniform1f(uSpeed, speed);
    gl.uniform3f(uColor, color[0], color[1], color[2]);

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
      gl.uniform1f(uPixel, Math.max(1, pixelSize * dpr));
    };
    resize();

    // Anchor the dither to the document by feeding the shader the page scroll.
    const readScroll = () => {
      const sx = window.scrollX || window.pageXOffset || 0;
      const sy = window.scrollY || window.pageYOffset || 0;
      gl.uniform2f(uScroll, sx * dpr, sy * dpr);
    };

    /* --- render loop --- */
    let raf = 0;
    let start = 0;
    const render = (t) => {
      if (!start) start = t;
      gl.uniform1f(uTime, (t - start) / 1000);
      readScroll();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (doAnimate) raf = requestAnimationFrame(render);
    };

    const draw = () => {
      if (doAnimate) {
        cancelAnimationFrame(raf);
        start = 0;
        raf = requestAnimationFrame(render);
      } else {
        gl.uniform1f(uTime, 0);
        readScroll();
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    };
    draw();

    const onResize = () => {
      resize();
      if (!doAnimate) draw();
    };
    window.addEventListener('resize', onResize);

    // When not animating, the loop is idle — redraw on scroll so the pattern tracks the page.
    const onScroll = () => {
      if (doAnimate) return; // the raf loop already reads scroll every frame
      readScroll();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (doAnimate) {
        start = 0;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener('webglcontextlost', onLost, false);

    /* --- top layer + View Transition re-assert --- */
    let promoted = false;
    const reassert = () => {
      if (!promoted) return;
      try {
        // Move ourselves back to the top of the top layer, above ::view-transition.
        (canvas).hidePopover();
        (canvas).showPopover();
      } catch {
      }
    };

    const supportsPopover =
      typeof canvas.showPopover === 'function' &&
      'popover' in HTMLElement.prototype;

    if (topLayer && supportsPopover) {
      try {
        canvas.setAttribute('popover', 'manual');
        canvas.showPopover();
        promoted = true;
        vtCallbacks.add(reassert);
        ensureViewTransitionPatch();
      } catch {
        promoted = false;
      }
    }

    /* --- cleanup --- */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      vtCallbacks.delete(reassert);
      if (promoted) {
        try {
          (canvas).hidePopover();
        } catch {
        }
      }
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [pixelSize, opacity, animate, speed, amount, matrixSize, maxDpr, topLayer, color]);

  // i dunno
  // if (pathname === '/lightshows') {
  //   return null;
  // }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        border: 0,
        background: 'transparent',
        maxWidth: 'none',
        maxHeight: 'none',
        pointerEvents: 'none',
        mixBlendMode: blendMode,
        opacity,
        zIndex,
        overflow: 'hidden',
      }}
    />
  );
}
