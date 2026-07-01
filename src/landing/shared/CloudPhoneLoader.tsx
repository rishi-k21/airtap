import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import s from "./CloudPhoneLoader.module.css";

gsap.registerPlugin(MotionPathPlugin);

const LOGO = `${import.meta.env.BASE_URL}airtap-agent.svg`;

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   VARIATION META
   ========================================================= */
type VarId = "boot" | "stream" | "flux" | "halo";

const VARIATIONS: { id: VarId; label: string; accent: string; tagline: string }[] = [
  { id: "boot", label: "Boot Core", accent: "#8f74f1", tagline: "Allocating & powering on your private Android instance." },
  { id: "stream", label: "Cloud Link", accent: "#4b8af6", tagline: "Locking onto the nearest region and opening the live stream." },
  { id: "flux", label: "Flux", accent: "#b06bf2", tagline: "Composing your instance from the cloud — almost there." },
  { id: "halo", label: "Halo", accent: "#714fee", tagline: "Tracing the secure boundary of your private device." },
];

/* =========================================================
   PUBLIC: full-page demo with floating nav
   ========================================================= */
export function CloudPhoneLoader() {
  const [active, setActive] = useState<VarId>("boot");
  const meta = VARIATIONS.find((v) => v.id === active)!;

  return (
    <div className={s.page} style={{ ["--accent" as string]: meta.accent }}>
      <div className={s.ambient} aria-hidden />

      <header className={s.head}>
        <span className={s.kicker}>
          <span className={s.kickerDot} />
          Cloud device · provisioning
        </span>
        <h1 className={s.title}>Your cloud phone is waking up</h1>
        <p className={s.sub}>{meta.tagline}</p>
      </header>

      <PhoneShell>
        {active === "boot" && <BootCore key="boot" />}
        {active === "stream" && <CloudLink key="stream" />}
        {active === "flux" && <FluxCore key="flux" />}
        {active === "halo" && <Halo key="halo" />}
      </PhoneShell>

      {/* floating nav — bottom right */}
      <nav className={s.nav} aria-label="Loading style">
        <span className={s.navTitle}>Loading style</span>
        <div className={s.navRow} role="tablist">
          {VARIATIONS.map((v, i) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={active === v.id}
              className={`${s.navBtn} ${active === v.id ? s.navActive : ""}`}
              style={{ ["--swatch" as string]: v.accent }}
              onClick={() => setActive(v.id)}
            >
              <span className={s.navIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.navLabel}>{v.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

/* =========================================================
   ANDROID 9:16 SHELL
   ========================================================= */
function PhoneShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 26, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className={s.phone} ref={ref}>
      <div className={s.frame}>
        <span className={s.punch} />
        <div className={s.screen}>{children}</div>
      </div>
    </div>
  );
}

/* =========================================================
   VARIATION A — BOOT CORE
   Breathing logo, orbiting comet ring, filling progress arc,
   counting %, cycling status, then a quick home-screen reveal.
   ========================================================= */
const BOOT_STEPS = [
  "Allocating your cloud device…",
  "Booting Android 14…",
  "Restoring secure session…",
  "Optimizing display stream…",
  "Almost ready…",
];
const ARC_R = 96;
const ARC_C = 2 * Math.PI * ARC_R;

function BootCore() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const arc = q("[data-arc]")[0] as unknown as SVGCircleElement;
    const pct = q("[data-pct]")[0] as HTMLElement;
    const status = q("[data-status]")[0] as HTMLElement;

    if (reduceMotion()) {
      gsap.set(arc, { strokeDashoffset: 0 });
      pct.textContent = "100%";
      status.textContent = "Ready";
      gsap.set(q("[data-home]"), { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(arc, { strokeDasharray: ARC_C, strokeDashoffset: ARC_C });

      // continuous ambient motion
      gsap.to(q("[data-orbit]"), { rotation: 360, transformOrigin: "50% 50%", duration: 6, ease: "none", repeat: -1 });
      gsap.to(q("[data-logo]"), { scale: 1.06, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(q("[data-glow]"), { opacity: 0.85, scale: 1.12, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      const counter = { v: 0 };

      tl.set(q("[data-home]"), { autoAlpha: 0 })
        .set(q("[data-stack]"), { autoAlpha: 1 })
        .set(counter, { v: 0 })
        .to(arc, { strokeDashoffset: 0, duration: 4.2, ease: "power1.inOut" }, 0)
        .to(counter, {
          v: 100,
          duration: 4.2,
          ease: "power1.inOut",
          onUpdate: () => { pct.textContent = `${Math.round(counter.v)}%`; },
        }, 0);

      // cycle status text in sync with progress
      BOOT_STEPS.forEach((msg, i) => {
        tl.call(() => {
          status.textContent = msg;
          gsap.fromTo(status, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }, [], (4.2 / BOOT_STEPS.length) * i);
      });

      // boot complete → reveal home screen
      tl.to(q("[data-stack]"), { autoAlpha: 0, scale: 1.08, duration: 0.5, ease: "power2.in" }, ">+0.1")
        .fromTo(q("[data-home]"), { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }, "<")
        .fromTo(q("[data-app]"), { autoAlpha: 0, scale: 0.4, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.045, ease: "back.out(2)" }, "<0.05")
        .to({}, { duration: 1.3 }) // hold
        .to(q("[data-home]"), { autoAlpha: 0, duration: 0.5, ease: "power2.in" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${s.layer} ${s.boot}`} ref={root}>
      <span className={s.bootAuroraA} data-glow />
      <span className={s.bootAuroraB} />

      <div className={s.bootStack} data-stack>
        <div className={s.ring}>
          <svg className={s.ringSvg} viewBox="0 0 220 220">
            <circle cx="110" cy="110" r={ARC_R} className={s.ringTrack} />
            <circle cx="110" cy="110" r={ARC_R} className={s.ringArc} data-arc strokeLinecap="round" />
            <g data-orbit>
              <circle cx="110" cy="14" r="4.5" className={s.ringComet} />
            </g>
          </svg>
          <span className={s.bootGlow} data-glow />
          <img className={s.bootLogo} src={LOGO} alt="" data-logo />
        </div>
        <div className={s.bootPct} data-pct>0%</div>
        <div className={s.bootStatus} data-status>{BOOT_STEPS[0]}</div>
      </div>

      <BootHome />
    </div>
  );
}

const HOME_APPS = ["#714fee", "#d66ef0", "#01a5be", "#4fac31", "#ed7e30", "#015af5", "#8f74f1", "#edcd30", "#e93323", "#01d4f5", "#be18e7", "#75c15d"];

function BootHome() {
  return (
    <div className={s.home} data-home>
      <div className={s.homeClock}>9:41</div>
      <div className={s.homeGrid}>
        {HOME_APPS.map((c, i) => (
          <span key={i} className={s.homeApp} data-app style={{ background: c }} />
        ))}
      </div>
      <div className={s.homeDock}>
        {HOME_APPS.slice(0, 4).map((c, i) => (
          <span key={i} className={s.homeApp} data-app style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   VARIATION B — CLOUD LINK
   Sonar pulses from a cloud node, packets streaming up,
   signal bars, dropping latency ping, region status.
   ========================================================= */
const STREAM_STEPS = [
  "Locating nearest region…",
  "Establishing secure tunnel…",
  "Negotiating video stream…",
  "Syncing your apps…",
];

function CloudLink() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const ping = q("[data-ping]")[0] as HTMLElement;
    const status = q("[data-status]")[0] as HTMLElement;

    if (reduceMotion()) {
      ping.textContent = "24 ms";
      status.textContent = "Connected";
      gsap.set(q("[data-bar]"), { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // sonar rings
      gsap.fromTo(
        q("[data-sonar]"),
        { scale: 0.25, opacity: 0.7 },
        { scale: 1, opacity: 0, duration: 2.6, ease: "power1.out", repeat: -1, stagger: 0.65, transformOrigin: "50% 50%" },
      );
      // cloud node float
      gsap.to(q("[data-node]"), { y: -6, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      // packets streaming up
      gsap.fromTo(
        q("[data-packet]"),
        { y: 120, opacity: 0 },
        { y: -120, opacity: 1, duration: 1.9, ease: "none", repeat: -1, stagger: { each: 0.16, repeat: -1 },
          keyframes: { opacity: [0, 1, 1, 0] } },
      );

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      const lat = { v: 188 };

      tl.set(lat, { v: 188 })
        .set(q("[data-bar]"), { scaleY: 0.12, transformOrigin: "50% 100%" })
        .to(lat, {
          v: 22,
          duration: 4,
          ease: "power2.out",
          onUpdate: () => { ping.textContent = `${Math.round(lat.v)} ms`; },
        }, 0)
        .to(q("[data-bar]"), { scaleY: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.5 }, 0.4);

      STREAM_STEPS.forEach((msg, i) => {
        tl.call(() => {
          status.textContent = msg;
          gsap.fromTo(status, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 });
        }, [], (4 / STREAM_STEPS.length) * i);
      });

      tl.call(() => {
        status.textContent = "Connected · streaming";
        gsap.fromTo(status, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
      }, [], ">")
        .to({}, { duration: 1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${s.layer} ${s.stream}`} ref={root}>
      <div className={s.streamDots} aria-hidden />

      <div className={s.streamCore}>
        <span className={s.sonar} data-sonar />
        <span className={s.sonar} data-sonar />
        <span className={s.sonar} data-sonar />
        <span className={s.sonar} data-sonar />
        <div className={s.cloudNode} data-node>
          <svg viewBox="0 0 48 32" width="46" height="31" fill="none">
            <path d="M37 14.2a8.5 8.5 0 0 0-16-3.2A7 7 0 0 0 9 16a7 7 0 0 0 1 13.8h26a8 8 0 0 0 1-15.6Z"
              fill="rgba(255,255,255,0.06)" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>
      </div>

      <div className={s.streamPackets} aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={s.packet} data-packet style={{ left: `${10 + i * 13}%` }} />
        ))}
      </div>

      <div className={s.streamMeta}>
        <div className={s.signal} aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={s.signalBar} data-bar style={{ height: `${8 + i * 6}px` }} />
          ))}
        </div>
        <div className={s.ping} data-ping>188 ms</div>
      </div>

      <div className={`${s.bootStatus} ${s.streamStatus}`} data-status>{STREAM_STEPS[0]}</div>
    </div>
  );
}

/* =========================================================
   VARIATION C — FLUX
   Abstract, non-literal: drifting aurora orbs behind a stack of
   concentric polygon rings (hexagon / diamond / triangle) that
   counter-rotate at different speeds, a breathing core, and a
   ring of orbiting shards. A clean progress bar + cycling status
   ground it as a loading state. No device chrome — pure motion.
   ========================================================= */
const FLUX_STEPS = [
  "Reserving compute…",
  "Weaving secure fabric…",
  "Composing your instance…",
  "Polishing the surface…",
];

// regular polygon points centred in a 220×220 viewBox
const poly = (n: number, r: number, rot = -90) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((rot + (360 / n) * k) * Math.PI) / 180;
    return `${(110 + r * Math.cos(a)).toFixed(1)},${(110 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const SHARDS = Array.from({ length: 6 }, (_, i) => i * 60);

function FluxCore() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const pct = q("[data-pct]")[0] as HTMLElement;
    const status = q("[data-status]")[0] as HTMLElement;
    const bar = q("[data-bar]")[0] as HTMLElement;

    if (reduceMotion()) {
      pct.textContent = "100%";
      status.textContent = "Ready";
      gsap.set(bar, { scaleX: 1 });
      gsap.set(q("[data-orb],[data-ring],[data-shard],[data-core]"), { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // aurora orbs drift independently
      q("[data-orb]").forEach((orb, i) => {
        gsap.to(orb, {
          x: "random(-32, 32)",
          y: "random(-28, 28)",
          scale: "random(0.82, 1.22)",
          duration: 4 + i * 1.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // concentric rings counter-rotate at different cadences
      gsap.to(q("[data-ring='0']"), { rotation: 360, transformOrigin: "50% 50%", duration: 22, ease: "none", repeat: -1 });
      gsap.to(q("[data-ring='1']"), { rotation: -360, transformOrigin: "50% 50%", duration: 15, ease: "none", repeat: -1 });
      gsap.to(q("[data-ring='2']"), { rotation: 360, transformOrigin: "50% 50%", duration: 9, ease: "none", repeat: -1 });

      // breathing core
      gsap.to(q("[data-core]"), { scale: 1.18, opacity: 0.95, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });

      // orbiting shards: parent spins, each shard self-rotates
      gsap.to(q("[data-orbit]"), { rotation: 360, transformOrigin: "50% 50%", duration: 12, ease: "none", repeat: -1 });
      gsap.to(q("[data-shard]"), { rotation: "+=180", duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.18, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      const counter = { v: 0 };

      tl.set(bar, { scaleX: 0, transformOrigin: "0% 50%" })
        .set(counter, { v: 0 })
        .set(q("[data-flash]"), { autoAlpha: 0, scale: 0.6 })
        .to(bar, { scaleX: 1, duration: 4.4, ease: "power1.inOut" }, 0)
        .to(counter, {
          v: 100,
          duration: 4.4,
          ease: "power1.inOut",
          onUpdate: () => { pct.textContent = `${Math.round(counter.v)}%`; },
        }, 0);

      FLUX_STEPS.forEach((msg, i) => {
        tl.call(() => {
          status.textContent = msg;
          gsap.fromTo(status, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }, [], (4.4 / FLUX_STEPS.length) * i);
      });

      // ready: a bright bloom pulses out from the core
      tl.call(() => {
        status.textContent = "Instance ready";
        gsap.fromTo(status, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
      }, [], ">")
        .fromTo(q("[data-flash]"), { autoAlpha: 0.9, scale: 0.6 }, { autoAlpha: 0, scale: 1.8, duration: 0.9, ease: "power2.out" }, "<")
        .to({}, { duration: 0.8 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${s.layer} ${s.flux}`} ref={root}>
      <span className={`${s.fluxOrb} ${s.fluxOrbA}`} data-orb aria-hidden />
      <span className={`${s.fluxOrb} ${s.fluxOrbB}`} data-orb aria-hidden />
      <span className={`${s.fluxOrb} ${s.fluxOrbC}`} data-orb aria-hidden />

      <div className={s.fluxStage}>
        <span className={s.fluxFlash} data-flash aria-hidden />
        <span className={s.fluxCore} data-core aria-hidden />

        <svg className={s.fluxSvg} viewBox="0 0 220 220" aria-hidden>
          <polygon className={s.fluxRing} data-ring="0" points={poly(6, 96)} />
          <polygon className={s.fluxRing} data-ring="1" points={poly(4, 66)} />
          <polygon className={s.fluxRing} data-ring="2" points={poly(3, 40)} />
        </svg>

        <div className={s.fluxOrbit} data-orbit aria-hidden>
          {SHARDS.map((deg) => (
            <span key={deg} className={s.fluxShard} data-shard style={{ transform: `rotate(${deg}deg) translateY(-104px)` }} />
          ))}
        </div>
      </div>

      <div className={s.buildHud}>
        <div className={s.buildRow}>
          <span className={s.buildStatus} data-status>{FLUX_STEPS[0]}</span>
          <span className={s.buildPct} data-pct>0%</span>
        </div>
        <div className={s.rezBarTrack}>
          <span className={s.rezBar} data-bar />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VARIATION D — HALO
   A cluster of glowing particles rides a rounded-rect path just
   inside the screen edge. The lead particle is large + bright;
   each trailing particle shrinks and dims, so the wave drags a
   comet trail around the device boundary as it loops.
   ========================================================= */
const HALO_STEPS = [
  "Securing the perimeter…",
  "Syncing edge buffers…",
  "Calibrating the display…",
  "Device online",
];
const HALO_N = 22;

// rounded-rect path in a 180×320 viewBox (matches the 9:16 screen)
const roundRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x + r},${y} H ${x + w - r} A ${r},${r} 0 0 1 ${x + w},${y + r} V ${y + h - r} ` +
  `A ${r},${r} 0 0 1 ${x + w - r},${y + h} H ${x + r} A ${r},${r} 0 0 1 ${x},${y + h - r} ` +
  `V ${y + r} A ${r},${r} 0 0 1 ${x + r},${y} Z`;
const HALO_PATH = roundRect(13, 13, 154, 294, 24);

// head → tail: leading particles are big/bright, trailing ones shrink + fade
const HALO_PARTS = Array.from({ length: HALO_N }, (_, i) => {
  const t = i / (HALO_N - 1);
  return {
    phase: 1 - i * 0.011, // tight cluster (~0.23 of the loop) so it reads as one comet
    r: 3.6 - t * 2.9,
    o: 1 - t * 0.92,
    color: i < 3 ? "#ece7fd" : i < 7 ? "#bcabf7" : i < 14 ? "#8f74f1" : "#714fee",
  };
});

function Halo() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const path = q("[data-path]")[0] as unknown as SVGPathElement;
    const dots = q("[data-halo]");
    const pct = q("[data-pct]")[0] as HTMLElement;
    const status = q("[data-status]")[0] as HTMLElement;
    const bar = q("[data-bar]")[0] as HTMLElement;

    if (reduceMotion()) {
      dots.forEach((d, i) =>
        gsap.set(d, { motionPath: { path, start: HALO_PARTS[i].phase, end: HALO_PARTS[i].phase } }));
      gsap.set(bar, { scaleX: 1 });
      pct.textContent = "100%";
      status.textContent = "Device online";
      return;
    }

    const ctx = gsap.context(() => {
      // each particle rides the edge at a fixed offset → the cluster travels as one comet
      dots.forEach((d, i) => {
        const ph = HALO_PARTS[i].phase;
        gsap.set(d, { motionPath: { path, start: ph, end: ph } });
        gsap.to(d, { motionPath: { path, start: ph, end: ph + 1 }, duration: 5, ease: "none", repeat: -1 });
      });

      // soft breathing glow at the centre
      gsap.to(q("[data-glow]"), { scale: 1.16, opacity: 0.9, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      const counter = { v: 0 };

      tl.set(bar, { scaleX: 0, transformOrigin: "0% 50%" })
        .set(counter, { v: 0 })
        .to(bar, { scaleX: 1, duration: 4.6, ease: "power1.inOut" }, 0)
        .to(counter, {
          v: 100,
          duration: 4.6,
          ease: "power1.inOut",
          onUpdate: () => { pct.textContent = `${Math.round(counter.v)}%`; },
        }, 0);

      HALO_STEPS.forEach((msg, i) => {
        tl.call(() => {
          status.textContent = msg;
          gsap.fromTo(status, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }, [], (4.6 / HALO_STEPS.length) * i);
      });

      tl.to({}, { duration: 1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${s.layer} ${s.halo}`} ref={root}>
      <span className={s.haloGlow} data-glow aria-hidden />

      <svg className={s.haloSvg} viewBox="0 0 180 320" aria-hidden>
        <defs>
          <filter id="haloGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path className={s.haloTrack} data-path d={HALO_PATH} />
        <g filter="url(#haloGlow)">
          {HALO_PARTS.map((p, i) => (
            <circle key={i} className={s.haloDot} data-halo cx={0} cy={0} r={p.r} style={{ fill: p.color, opacity: p.o }} />
          ))}
        </g>
      </svg>

      <div className={s.buildHud}>
        <div className={s.buildRow}>
          <span className={s.buildStatus} data-status>{HALO_STEPS[0]}</span>
          <span className={s.buildPct} data-pct>0%</span>
        </div>
        <div className={s.rezBarTrack}>
          <span className={s.rezBar} data-bar />
        </div>
      </div>
    </div>
  );
}
