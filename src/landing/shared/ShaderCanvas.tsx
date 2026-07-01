import { useEffect, useRef } from "react";

type Mode = "dots" | "aurora" | "glass" | "wave";

interface ShaderCanvasProps {
  mode?: Mode;
  /** rgb 0..1 triplets */
  colors?: [number, number, number][];
  /** dot grid density (cells across the short axis) — or rib count for glass */
  density?: number;
  opacity?: number;
  speed?: number;
  /** >1 boosts contrast (used to make glass pop on light backgrounds) */
  contrast?: number;
  className?: string;
  style?: React.CSSProperties;
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_DOTS = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform float u_density;
uniform float u_opacity;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = gl_FragCoord.xy / u_res.y;
  vec2 grid = p * u_density;
  vec2 id = floor(grid);
  vec2 f = fract(grid) - 0.5;
  float wave = sin(u_time * 0.6 + id.x * 0.45 + id.y * 0.35);
  float twinkle = 0.5 + 0.5 * sin(u_time * 1.3 + id.x * 1.7 - id.y * 1.1);
  float r = 0.07 + 0.045 * wave;
  float d = length(f);
  float dot = smoothstep(r, r - 0.045, d);
  float vign = smoothstep(1.15, 0.15, length(uv - 0.5));
  float alpha = dot * (0.18 + 0.55 * vign) * (0.55 + 0.45 * twinkle);
  gl_FragColor = vec4(u_c1, alpha * u_opacity);
}
`;

const FRAG_AURORA = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_opacity;

float blob(vec2 uv, vec2 c, float r) {
  float d = length(uv - c);
  return smoothstep(r, 0.0, d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float a = uv.x;
  uv.x *= u_res.x / u_res.y;
  float t = u_time * 0.32;

  vec2 p1 = vec2(0.35 + 0.18 * sin(t * 1.1), 0.40 + 0.14 * cos(t * 0.9));
  vec2 p2 = vec2(0.70 + 0.16 * cos(t * 0.8), 0.62 + 0.16 * sin(t * 1.3));
  vec2 p3 = vec2(0.55 + 0.20 * sin(t * 0.6 + 2.0), 0.30 + 0.12 * cos(t * 1.0));
  p1.x *= u_res.x / u_res.y;
  p2.x *= u_res.x / u_res.y;
  p3.x *= u_res.x / u_res.y;

  float b1 = blob(uv, p1, 0.55);
  float b2 = blob(uv, p2, 0.60);
  float b3 = blob(uv, p3, 0.48);

  vec3 col = u_c1 * b1 + u_c2 * b2 + u_c3 * b3;
  float alpha = clamp(b1 + b2 + b3, 0.0, 1.0);
  // soft top-to-bottom falloff so it reads as a glow, not a wall of color
  alpha *= smoothstep(1.05, 0.1, length((gl_FragCoord.xy / u_res) - 0.5));
  gl_FragColor = vec4(col, alpha * u_opacity);
}
`;

/* Animated "fractal glass" — vertical fluted ribs refracting a slow
   flowing color field, with a roaming bright core. */
const FRAG_GLASS = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_opacity;
uniform float u_density;   // rib count across the width
uniform float u_contrast;  // >1 boosts pop on light backgrounds

vec3 palette(float x) {
  x = clamp(x, 0.0, 1.0);
  vec3 ab = mix(u_c1, u_c2, smoothstep(0.0, 0.6, x));
  return mix(ab, u_c3, smoothstep(0.4, 1.0, x));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float t = u_time * 0.28;

  // ---- vertical fluted ribs ----
  float ribs = u_density;
  float colF = uv.x * ribs;
  float local = fract(colF) - 0.5;          // -0.5..0.5 across a rib
  float refr = local / ribs * 2.4;          // per-rib refraction offset

  // ---- flowing color field (drifts continuously) ----
  float fx = uv.x + refr;
  float fy = uv.y;
  float band = fx * 1.25 - fy * 0.4;
  band += 0.16 * sin(fy * 3.0 + t * 1.3);
  band += 0.11 * sin(fx * 5.0 - t * 0.9);
  float g = sin(band * 3.14159 + t * 1.6) * 0.5 + 0.5;
  vec3 col = palette(g);

  // ---- roaming bright core ----
  vec2 hp = vec2(0.40 + 0.34 * sin(t * 0.8), 0.48 + 0.22 * cos(t * 0.65));
  float hd = length(vec2((fx - hp.x) * aspect, fy - hp.y));
  float glow = smoothstep(1.0, 0.0, hd);
  col += glow * 0.26;

  // ---- 3D rib shading + crisp edge highlight ----
  float ribShade = cos(local * 3.14159);    // 1 center, 0 edge
  col *= mix(0.74, 1.16, ribShade * ribShade);
  col += smoothstep(0.44, 0.5, abs(local)) * 0.05;

  // ---- contrast lift ----
  col = (col - 0.5) * u_contrast + 0.5;
  col = clamp(col, 0.0, 1.3);

  gl_FragColor = vec4(col, u_opacity);
}
`;

/* Big, slow, abstract 3D wave field. A layered height surface is lit with a
   pseudo-normal so flowing ridges catch the light — reads as soft sculpted
   silk drifting behind the hero. Brand purple → magenta palette. */
const FRAG_WAVE = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_opacity;

// layered, domain-warped height field
float height(vec2 p, float t) {
  float h = 0.0;
  h += sin(p.x * 1.5 + t * 0.55) * 0.55;
  h += sin(p.y * 1.2 - t * 0.42 + p.x * 0.7) * 0.42;
  h += sin((p.x + p.y) * 0.95 + t * 0.33) * 0.30;
  h += sin(length(p - vec2(0.6, -0.2)) * 1.9 - t * 0.6) * 0.22;
  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  // centered, aspect-correct coords, scaled up for BIG waves
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y * 2.6;
  float t = u_time;

  float e = 0.05;
  float c  = height(p, t);
  float hx = height(p + vec2(e, 0.0), t);
  float hy = height(p + vec2(0.0, e), t);

  // pseudo-surface normal from the height gradient
  vec3 n = normalize(vec3((c - hx) / e, (c - hy) / e, 1.4));
  vec3 lightDir = normalize(vec3(0.45, 0.65, 0.75));
  float diff = clamp(dot(n, lightDir), 0.0, 1.0);
  float spec = pow(diff, 8.0);

  // colour by surface height, then warm the lit crests
  float m = c * 0.5 + 0.5;
  vec3 col = mix(u_c1, u_c2, smoothstep(0.05, 0.95, m));
  col = mix(col, u_c3, smoothstep(0.45, 1.0, diff));
  col += spec * 0.16;

  // soft ridge highlights so the wave structure still reads
  float ridge = smoothstep(0.78, 0.98, diff);
  col += ridge * 0.1;

  // gentle depth shading — kept bright so troughs never darken the text
  col *= mix(0.9, 1.12, diff);
  col = clamp(col, 0.0, 1.0);

  // radial fill, slightly stronger toward the top where the headline sits
  float vign = smoothstep(1.7, 0.05, length(uv - 0.5));
  float alpha = (0.6 + 0.18 * diff) * vign;
  gl_FragColor = vec4(col, alpha * u_opacity);
}
`;

function frag(mode: Mode) {
  if (mode === "dots") return FRAG_DOTS;
  if (mode === "aurora") return FRAG_AURORA;
  if (mode === "wave") return FRAG_WAVE;
  return FRAG_GLASS;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export function ShaderCanvas({
  mode = "dots",
  colors,
  density = 34,
  opacity = 1,
  speed = 1,
  contrast = 1,
  className,
  style,
}: ShaderCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette =
      colors ??
      (mode === "dots"
        ? [[0.443, 0.31, 0.933]]
        : mode === "glass"
          ? [
              [0.18, 0.12, 0.62],
              [0.443, 0.31, 0.933],
              [0.839, 0.431, 0.941],
            ]
          : [
              [0.443, 0.31, 0.933],
              [0.839, 0.431, 0.941],
              [0.004, 0.647, 0.745],
            ]);

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, frag(mode)));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const u_res = gl.getUniformLocation(program, "u_res");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_opacity = gl.getUniformLocation(program, "u_opacity");
    const u_density = gl.getUniformLocation(program, "u_density");
    const u_contrast = gl.getUniformLocation(program, "u_contrast");
    const u_c1 = gl.getUniformLocation(program, "u_c1");
    const u_c2 = gl.getUniformLocation(program, "u_c2");
    const u_c3 = gl.getUniformLocation(program, "u_c3");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = reduce ? 8 : ((now - start) / 1000) * speed;
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, t);
      gl.uniform1f(u_opacity, opacity);
      if (u_density) gl.uniform1f(u_density, density);
      if (u_contrast) gl.uniform1f(u_contrast, contrast);
      if (u_c1) gl.uniform3fv(u_c1, palette[0]);
      if (u_c2 && palette[1]) gl.uniform3fv(u_c2, palette[1]);
      if (u_c3 && palette[2]) gl.uniform3fv(u_c3, palette[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [mode, colors, density, opacity, speed, contrast]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
