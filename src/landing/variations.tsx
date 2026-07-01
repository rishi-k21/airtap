import { useEffect, useState } from "react";
import { NAV_LINKS, STATS } from "./data";
import { Logo, LogoMark } from "./shared/Logo";
import { Icons } from "./shared/icons";
import { Reveal, SplitText } from "./shared/reveal";
import { ShaderCanvas } from "./shared/ShaderCanvas";
import { PhoneMockup } from "./shared/PhoneMockup";
import {
  RoutinesSection,
  SecuritySection,
  HowItWorksSection,
  StatsSection,
  SocialProofSection,
  FaqSection,
  CtaSection,
  Footer,
} from "./sections";
import s from "./sections.module.css";
import v from "./variations.module.css";

/* Brand-locked glass palettes (rgb 0..1) — purple → magenta family. */
const GLASS_COOL: [number, number, number][] = [
  [0.16, 0.1, 0.6],
  [0.443, 0.31, 0.933],
  [0.839, 0.431, 0.941],
];
/* Aurora glow palettes (rgb 0..1) — soft drifting brand gradients. */
const AURORA_COOL: [number, number, number][] = [
  [0.443, 0.31, 0.933], // purple
  [0.839, 0.431, 0.941], // magenta
  [0.55, 0.45, 0.96], // violet
];
const AURORA_WARM: [number, number, number][] = [
  [0.443, 0.31, 0.933], // purple
  [0.839, 0.431, 0.941], // magenta
  [0.933, 0.435, 0.176], // editorial orange
];
/* Wave field palette — light lilac troughs → soft magenta crests. Kept pale
   so dark hero text stays readable while the wave is still clearly present. */
const WAVE_BRAND: [number, number, number][] = [
  [0.74, 0.69, 0.95], // light lilac (troughs)
  [0.80, 0.66, 0.96], // soft brand purple (mid)
  [0.93, 0.74, 0.97], // pale magenta (lit crests)
];

/* ------------------------------------------------------------------ */
/* NAV                                                                 */
/* ------------------------------------------------------------------ */
function TopNav({
  theme,
  onToggleTheme,
}: {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`${v.nav} ${scrolled ? v.navScrolled : ""}`}>
      <a href="#product" style={{ textDecoration: "none" }}>
        <Logo size={24} textColor="var(--fg)" />
      </a>
      <div className={v.navLinks}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <div className={v.navRight}>
        {onToggleTheme && (
          <button
            type="button"
            className={v.themeToggle}
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Icons.sun width={17} height={17} /> : <Icons.moon width={17} height={17} />}
          </button>
        )}
        <a href="#" style={{ fontSize: 14.5, fontWeight: 500, color: "var(--muted)", textDecoration: "none" }}>
          Sign in
        </a>
        <a href="#" className={v.navCta}>
          Get started
          <Icons.arrow width={15} height={15} />
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Floating orbit visual (iMessage deep-dive)                          */
/* ------------------------------------------------------------------ */
function OrbitVisual() {
  return (
    <div className={v.orbit}>
      <div className={v.orbitRing} />
      <div className={v.orbitRing} data-r2 style={{ inset: "16%" }} />
      <div className={v.orbitCore}>
        <LogoMark size={42} fill="#fff" />
      </div>
      <div className={v.chip}>
        <span className={v.chipEmoji}>✈️</span> Flight booked
      </div>
      <div className={v.chip}>
        <span className={v.chipEmoji}>💼</span> 5 jobs applied
      </div>
      <div className={v.chip}>
        <span className={v.chipEmoji}>🛒</span> Groceries on the way
      </div>
      <div className={v.chip}>
        <span className={v.chipEmoji}>🎬</span> Trending reel saved
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* iMessage feature copy (shared)                                      */
/* ------------------------------------------------------------------ */
const IMSG_FEATURES = [
  { icon: "chat" as const, title: "No app to download", body: "It lives in the Messages app you already use every day." },
  { icon: "bolt" as const, title: "Reply and it's done", body: "Approve an action with a tap — the agent executes instantly." },
  { icon: "clock" as const, title: "Works while you sleep", body: "Routines fire and updates land in your thread, day or night." },
];

function ImsgCopy() {
  return (
    <div className={`${v.imsgCopy} ${s.headWrap}`}>
      <Reveal as="span" className={v.eyebrowLocal} y={14}>
        iMessage mode
      </Reveal>
      <SplitText text="Get things done from your texts." as="h2" className={v.h2Local} />
      <Reveal as="p" className={s.lead} delay={0.1}>
        Airtap's superpower: just text your agent like a friend. Ask for anything, approve
        with a tap, and watch it happen — right inside iMessage.
      </Reveal>
      <div className={v.imsgFeatures}>
        {IMSG_FEATURES.map((f, i) => {
          const Icon = Icons[f.icon];
          return (
            <Reveal key={f.title} className={v.imsgFeature} delay={0.15 + i * 0.08} y={20}>
              <div className={v.imsgFeatureIcon}>
                <Icon />
              </div>
              <div>
                <div className={v.imsgFeatureTitle}>{f.title}</div>
                <div className={v.imsgFeatureBody}>{f.body}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/** iMessage deep-dive (copy + orbit). The live phone now lives in the hero,
    so this fold explains the capabilities without a second mockup. */
function ImessageFeatures({ flip }: { flip?: boolean }) {
  return (
    <section className={v.imsg} id="imessage">
      <div className={v.imsgShader}>
        <ShaderCanvas mode="glass" colors={GLASS_COOL} density={70} opacity={0.32} contrast={1.1} />
      </div>
      <div className={`${v.imsgInner} ${flip ? v.imsgFlip : ""}`}>
        <ImsgCopy />
        <Reveal className={v.imsgPhoneCol} y={40} delay={0.1}>
          <OrbitVisual />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — Variation A · Aurora (light, split: copy + live phone)       */
/* ------------------------------------------------------------------ */
function HeroA() {
  return (
    <header className={v.hero} id="product">
      <div className={v.heroShader}>
        <ShaderCanvas mode="wave" colors={WAVE_BRAND} opacity={0.9} speed={0.5} />
      </div>
      <div className={v.heroInner}>
        <div className={v.heroSplit}>
          <div>
            <Reveal as="div" className={v.heroPill} y={14}>
              <span className={v.heroPillTag}>NEW</span>
              The AI that actually uses your apps
            </Reveal>
            <h1 className={v.heroTitle}>
              <SplitText text="Your phone." as="span" style={{ display: "block" }} />
              <SplitText
                text="Just text it."
                as="span"
                className={v.heroAccentLine}
                style={{ display: "block" }}
                delay={0.2}
              />
            </h1>
            <Reveal as="p" className={v.heroSub} delay={0.3}>
              Airtap gives you a virtual Android cloud phone with a smart agent that books
              flights, applies to jobs, orders food and more — all from a simple text.
            </Reveal>
            <Reveal className={v.heroCtas} delay={0.4}>
              <a href="#" className={`${s.btn} ${s.btnPrimary}`}>
                Get your cloud phone
                <Icons.arrow />
              </a>
              <a href="#imessage" className={`${s.btn} ${s.btnGhost}`}>
                See it work
              </a>
            </Reveal>
            <Reveal as="div" className={v.heroNote} delay={0.5}>
              <Icons.shield />
              Zero data stored · the agent can't see your passwords
            </Reveal>
          </div>
          <Reveal y={50} delay={0.2}>
            <PhoneMockup captionTheme="light" />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — Variation B · Midnight (dark, center stage: phone + chips)   */
/* ------------------------------------------------------------------ */
function HeroB({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const surface = theme === "dark" ? v.heroDarkSurface : v.heroDimSurface;
  return (
    <header className={`${v.hero} ${v.heroStageWrap} ${v.heroSurface} ${surface}`} id="product">
      <div
        className={v.heroGlow}
        style={{ top: "-18%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, #714fee, transparent 70%)" }}
      />
      <div className={v.heroShader}>
        <ShaderCanvas mode="aurora" colors={AURORA_COOL} opacity={0.9} speed={1.1} />
      </div>
      <div className={v.heroInner}>
        <div className={v.heroStage}>
          <Reveal as="div" className={v.heroPill} y={14}>
            <span className={v.heroPillTag}>CLOUD PHONE</span>
            Powered by an autonomous agent
          </Reveal>
          <h1 className={v.heroTitle} style={{ maxWidth: 760 }}>
            <SplitText text="Delegate your" as="span" style={{ display: "block" }} />
            <SplitText
              text="entire phone."
              as="span"
              className={v.heroAccentLine}
              style={{ display: "block" }}
              delay={0.2}
            />
          </h1>
          <Reveal as="p" className={v.heroSub} delay={0.3} style={{ maxWidth: 560 }}>
            A real Android device in the cloud, operated by an AI agent that taps, types and
            swipes for you. Tell it what you need — right from iMessage.
          </Reveal>
          <Reveal className={v.heroCtas} delay={0.4}>
            <a href="#" className={`${s.btn} ${s.btnPrimary}`}>
              Start free
              <Icons.arrow />
            </a>
            <a href="#routines" className={`${s.btn} ${s.btnGhost}`}>
              Browse routines
            </a>
          </Reveal>

          <div className={v.stageWrap}>
            <Reveal className={v.stagePhone} y={50} delay={0.25}>
              <PhoneMockup captionTheme="dark" />
            </Reveal>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — Variation C · Editorial (asymmetric: phone left, big type)   */
/* ------------------------------------------------------------------ */
function HeroC() {
  return (
    <header className={`${v.hero} ${v.heroMagWrap}`} id="product">
      <div className={v.heroShader}>
        <ShaderCanvas mode="aurora" colors={AURORA_WARM} opacity={0.7} speed={1.5} />
      </div>
      <div className={v.heroInner}>
        <div className={v.heroMag}>
          <Reveal className={v.magPhone} y={50} delay={0.2}>
            <PhoneMockup captionTheme="light" />
          </Reveal>
          <div className={v.magType}>
            <Reveal as="div" className={v.heroPill} y={14}>
              <span className={v.heroPillTag}>AIRTAP.AI</span>
              Cloud phone · AI agent · iMessage
            </Reveal>
            <h1 className={v.heroTitleMag}>
              <SplitText text="Stop using" as="span" style={{ display: "block" }} />
              <SplitText text="apps. Start" as="span" style={{ display: "block" }} delay={0.12} />
              <SplitText
                text="asking."
                as="span"
                className={v.heroAccentLine}
                style={{ display: "block" }}
                delay={0.24}
              />
            </h1>
            <Reveal as="p" className={v.heroSub} delay={0.36}>
              A virtual phone that runs itself. Text your agent in plain English and it
              handles the booking, the applying, the ordering — across any app.
            </Reveal>
            <Reveal className={v.heroCtas} delay={0.46}>
              <a href="#" className={`${s.btn} ${s.btnPrimary}`}>
                Claim your phone
                <Icons.arrow />
              </a>
              <a href="#imessage" className={`${s.btn} ${s.btnGhost}`}>
                Watch a conversation
              </a>
            </Reveal>
            <div className={v.magStats}>
              {STATS.slice(0, 3).map((st, i) => (
                <Reveal key={st.label} className={v.magStat} delay={0.5 + i * 0.08} y={16}>
                  <div className={v.magStatVal}>{st.value}</div>
                  <div className={v.magStatLabel}>{st.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* VARIATION COMPOSITIONS — each has a distinct section flow           */
/* ------------------------------------------------------------------ */
export function VariationA() {
  return (
    <div className={`${v.root} ${v.themeLight}`}>
      <TopNav />
      <HeroA />
      <RoutinesSection />
      <ImessageFeatures />
      <SecuritySection />
      <HowItWorksSection />
      <StatsSection />
      <SocialProofSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export function VariationB() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <div className={`${v.root} ${theme === "dark" ? v.themeDark : v.themeMidnightLight}`}>
      <TopNav theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <HeroB theme={theme} />
      <HowItWorksSection />
      <RoutinesSection />
      <ImessageFeatures flip />
      <StatsSection />
      <SecuritySection />
      <SocialProofSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export function VariationC() {
  return (
    <div className={`${v.root} ${v.themeEditorial}`}>
      <TopNav />
      <HeroC />
      <RoutinesSection />
      <ImessageFeatures />
      <HowItWorksSection />
      <SecuritySection />
      <SocialProofSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
