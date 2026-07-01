import { useEffect, useRef } from "react";

interface DotGridProps {
  /** hex color for dots + edges, e.g. "#714fee" */
  color?: string;
  /** px spacing between grid nodes */
  spacing?: number;
  /** max simultaneous lit edges as a fraction of all edges (0..1) */
  density?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/**
 * Animated dotted grid: a jittered lattice of nodes that drift gently while
 * edge lines randomly "attach" and "detach" between neighbours. Pure Canvas 2D
 * + rAF — the most performant route for a few-hundred-node network field.
 */
export function DotGrid({
  color = "#714fee",
  spacing = 46,
  density = 0.18,
  className,
  style,
}: DotGridProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { r, g, b } = hexToRgb(color);

    // per-node fluid wander: two sine octaves per axis with random
    // direction / frequency / amplitude so each dot floats independently
    type Pt = {
      x: number;
      y: number;
      bx: number;
      by: number;
      ph: number;
      // [freq1, phase1, amp1, freq2, phase2, amp2] for x and y
      mx: [number, number, number, number, number, number];
      my: [number, number, number, number, number, number];
    };
    type Edge = { a: number; b: number; alpha: number; target: number; spd: number; next: number };

    let W = 0;
    let H = 0;
    let pts: Pt[] = [];
    let edges: Edge[] = [];

    const TAU = Math.PI * 2;
    const wander = (): [number, number, number, number, number, number] => {
      const amp = spacing * (0.16 + Math.random() * 0.28); // up to ~0.44 of a cell
      return [
        0.06 + Math.random() * 0.16, // slow base frequency
        Math.random() * TAU,
        amp,
        0.18 + Math.random() * 0.3, // faster ripple octave
        Math.random() * TAU,
        amp * 0.4,
      ];
    };

    const mkEdge = (a: number, b: number): Edge => ({
      a,
      b,
      alpha: 0,
      target: Math.random() < density ? 0.4 + Math.random() * 0.5 : 0,
      spd: 1.4 + Math.random() * 1.8,
      next: performance.now() + Math.random() * 4000,
    });

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      if (W === 0 || H === 0) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;
      pts = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (Math.random() - 0.5) * spacing * 0.4;
          const y = row * spacing + (Math.random() - 0.5) * spacing * 0.4;
          pts.push({
            x,
            y,
            bx: x,
            by: y,
            ph: Math.random() * TAU,
            mx: wander(),
            my: wander(),
          });
        }
      }
      const idx = (c: number, rr: number) => rr * cols + c;
      edges = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (col < cols - 1) edges.push(mkEdge(idx(col, row), idx(col + 1, row)));
          if (row < rows - 1) edges.push(mkEdge(idx(col, row), idx(col, row + 1)));
          // a few diagonals for organic connections
          if (col < cols - 1 && row < rows - 1 && Math.random() < 0.5)
            edges.push(mkEdge(idx(col, row), idx(col + 1, row + 1)));
        }
      }
    };

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      // fluid wander: each node floats freely via two summed sine octaves
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!reduce) {
          const mx = p.mx;
          const my = p.my;
          p.x = p.bx + Math.sin(t * mx[0] + mx[1]) * mx[2] + Math.sin(t * mx[3] + mx[4]) * mx[5];
          p.y = p.by + Math.cos(t * my[0] + my[1]) * my[2] + Math.cos(t * my[3] + my[4]) * my[5];
        }
      }

      // edges attach / detach
      ctx.lineWidth = 1;
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        if (!reduce && now >= e.next) {
          e.target = e.target > 0.4 ? 0 : 0.5 + Math.random() * 0.5;
          e.next = now + 1400 + Math.random() * 5200;
        }
        e.alpha += (e.target - e.alpha) * Math.min(e.spd * dt, 1);
        if (e.alpha < 0.012) continue;
        const A = pts[e.a];
        const B = pts[e.b];
        ctx.strokeStyle = `rgba(${r},${g},${b},${e.alpha * 0.24})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // nodes (gentle twinkle)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const tw = reduce ? 0.5 : 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.2 + p.ph));
        ctx.fillStyle = `rgba(${r},${g},${b},${0.2 * tw})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, spacing, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
