'use client';

import { useEffect, useRef } from 'react';

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
export function generateBayer(n) {
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

/* ----- shared WebGL helpers (also used by the worldwide background) ----- */

// Idle animation is slow and dithered, so 30fps reads the same as 60 for half the work.
// The slack keeps a 60Hz rAF from occasionally rounding down to 20fps.
export const IDLE_FRAME_MS = 1000 / 30 - 4;

const FULLSCREEN_VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function createGl(canvas, opts) {
  return canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
    ...opts,
  });
}

// Compiles and links a program that draws one fullscreen triangle. Returns null on failure.
export function createFullscreenProgram(gl, frag, label) {
  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, FULLSCREEN_VERT);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  // A linked program keeps what it needs, so the shader objects can go.
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(`${label}: shader link failed`, gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  return {
    uniform: (name) => gl.getUniformLocation(program, name),
    dispose: () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

// Uploads an n×n Bayer threshold matrix to texture unit 0.
export function createBayerTexture(gl, n) {
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, n, n, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, generateBayer(n));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return tex;
}

// Both shaders output one flat colour per dither cell, so rather than shading every device
// pixel, the canvas gets one backing pixel per cell and the browser upscales it with
// `image-rendering: pixelated` (16x fewer fragments at 2x DPR with 2px cells). The canvas is
// one cell larger than the viewport and nudged by a sub-cell transform, so cells stay locked
// to the scrolled document grid exactly as before.
export function createCellGrid(canvas, gl) {
  const grid = { cell: 1, cols: 0, rows: 0 };
  let lastTransform = '';

  // `cellPx` is the cell size in device px.
  grid.resize = (cellPx, dpr) => {
    const cell = Math.max(1, cellPx) / dpr;
    const cols = Math.ceil(window.innerWidth / cell) + 1;
    const rows = Math.ceil(window.innerHeight / cell) + 1;
    grid.cell = cell;
    canvas.style.width = `${cols * cell}px`;
    canvas.style.height = `${rows * cell}px`;
    if (cols !== grid.cols || rows !== grid.rows) {
      grid.cols = cols;
      grid.rows = rows;
      canvas.width = cols;
      canvas.height = rows;
      gl.viewport(0, 0, cols, rows);
    }
  };

  // Scroll offset (CSS px) -> index of the top-left cell, plus the canvas shift (<= 0, CSS px).
  grid.align = (sx, sy) => {
    const ox = Math.floor(sx / grid.cell);
    const oy = Math.floor(sy / grid.cell);
    const dx = ox * grid.cell - sx;
    const dy = oy * grid.cell - sy;
    const transform = `translate3d(${dx}px, ${dy}px, 0)`;
    if (transform !== lastTransform) {
      canvas.style.transform = transform;
      lastTransform = transform;
    }
    return { ox, oy, dx, dy };
  };

  return grid;
}

// Inline styles for a fixed, viewport-covering, cell-resolution canvas. Sizes come from createCellGrid.
export const CELL_CANVAS_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 'auto',
  bottom: 'auto',
  margin: 0,
  padding: 0,
  border: 0,
  maxWidth: 'none',
  maxHeight: 'none',
  pointerEvents: 'none',
  imageRendering: 'pixelated',
  willChange: 'transform',
};

const FRAG = `
precision highp float;
uniform vec2  u_res;     // canvas size in cells
uniform vec2  u_origin;  // document-space index of the top-left cell (anchors dither to the page)
uniform float u_time;
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
  // One fragment per cell, indexed in document space (top-left origin) so the pattern scrolls with the page.
  vec2 cell = u_origin + vec2(floor(gl_FragCoord.x), u_res.y - 1.0 - floor(gl_FragCoord.y));
  vec2 uv = (mod(cell, u_n) + 0.5) / u_n;
  float threshold = texture2D(u_bayer, uv).r;

  // A slowly drifting field modulates dither density so it feels alive.
  float field = vnoise(cell * 0.02 + vec2(u_time * u_speed * 0.1, u_time * u_speed * 0.07));
  float signal = 0.5 + (field - 0.5) * u_amp;

  float bit = step(threshold, signal);
  gl_FragColor = vec4(u_color * bit, 1.0);
}
`;

// Stable default so the effect below doesn't re-run (and rebuild the GL program) every render.
const WHITE = [1, 1, 1];

export default function DitherOverlay({
  pixelSize = 1,
  opacity = 0.3,
  blendMode = 'overlay',
  animate = true,
  speed = 1,
  amount = 0.6,
  color = WHITE,
  matrixSize = 8,
  maxDpr = 2,
  topLayer = true,
  zIndex = 2147483647,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = createGl(canvas, { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const doAnimate = animate && !prefersReduced;

    const prog = createFullscreenProgram(gl, FRAG, 'DitherOverlay');
    if (!prog) return;
    const tex = createBayerTexture(gl, matrixSize);

    const uRes = prog.uniform('u_res');
    const uOrigin = prog.uniform('u_origin');
    const uTime = prog.uniform('u_time');
    gl.uniform1i(prog.uniform('u_bayer'), 0);
    gl.uniform1f(prog.uniform('u_n'), matrixSize);
    gl.uniform1f(prog.uniform('u_amp'), doAnimate ? amount : 0);
    gl.uniform1f(prog.uniform('u_speed'), speed);
    gl.uniform3f(prog.uniform('u_color'), color[0], color[1], color[2]);

    const grid = createCellGrid(canvas, gl);
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      grid.resize(pixelSize * dpr, dpr);
      gl.uniform2f(uRes, grid.cols, grid.rows);
    };
    resize();

    /* --- render loop --- */
    const start = performance.now();
    let raf = 0;
    let lastDraw = -Infinity;
    let lastX = NaN;
    let lastY = NaN;

    const draw = (t) => {
      lastX = window.scrollX;
      lastY = window.scrollY;
      const { ox, oy } = grid.align(lastX, lastY);
      gl.uniform2f(uOrigin, ox, oy);
      gl.uniform1f(uTime, doAnimate ? (t - start) / 1000 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      lastDraw = t;
    };

    // Redraw every frame while the page scrolls (so the pattern tracks it), otherwise at 30fps.
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - lastDraw >= IDLE_FRAME_MS || window.scrollX !== lastX || window.scrollY !== lastY) {
        draw(t);
      }
    };

    const play = () => {
      cancelAnimationFrame(raf);
      if (doAnimate) raf = requestAnimationFrame(loop);
      else draw(performance.now());
    };
    play();

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener('resize', onResize);

    // When not animating there is no loop, so redraw on scroll to keep the pattern on the page.
    const onScroll = () => {
      if (!doAnimate) draw(performance.now());
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else play();
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
        canvas.hidePopover();
        canvas.showPopover();
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
          canvas.hidePopover();
        } catch {
        }
      }
      gl.deleteTexture(tex);
      prog.dispose();
    };
  }, [pixelSize, animate, speed, amount, matrixSize, maxDpr, topLayer, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        ...CELL_CANVAS_STYLE,
        background: 'transparent',
        overflow: 'hidden',
        mixBlendMode: blendMode,
        opacity,
        zIndex,
      }}
    />
  );
}
