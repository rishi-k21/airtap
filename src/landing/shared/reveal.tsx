import {
  createElement,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** seconds */
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  style?: React.CSSProperties;
}

/** Fades + lifts an element into view on scroll. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  start = "top 85%",
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, toggleActions: once ? "play none none none" : "play none none reverse" },
        },
      );
    });
    return () => ctx.revert();
  }, [delay, y, duration, start, once]);

  return createElement(
    as,
    { ref, className, style: { opacity: 0, ...style } },
    children,
  );
}

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** stagger between words, seconds */
  stagger?: number;
  delay?: number;
  start?: string;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
}

/** Splits a heading into words that rise + fade in sequentially on scroll. */
export function SplitText({
  text,
  as = "h2",
  className,
  stagger = 0.045,
  delay = 0,
  start = "top 82%",
  style,
  wordStyle,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-word] > span");
    if (reduceMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        },
      );
    });
    return () => ctx.revert();
  }, [stagger, delay, start, text]);

  return createElement(
    as,
    { ref, className, style, "aria-label": text },
    words.map((w, i) => (
      <span
        key={i}
        data-word
        aria-hidden
        style={{
          display: "inline-flex",
          overflow: "hidden",
          verticalAlign: "top",
          // room for descenders (g, y, p) so the clip mask doesn't cut them off
          paddingBottom: "0.24em",
          marginBottom: "-0.24em",
          ...wordStyle,
        }}
      >
        <span style={{ display: "inline-block", willChange: "transform" }}>{w}</span>
        {i < words.length - 1 ? " " : ""}
      </span>
    )),
  );
}

/** Parallax: translates an element as it scrolls through the viewport. */
export function useParallax(distance = 60) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, [distance]);
  return ref;
}
