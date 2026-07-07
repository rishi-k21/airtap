import { useEffect, useRef, useState } from "react";
import { Logo, LogoMark } from "./shared/Logo";
import { Icons } from "./shared/icons";
import { Reveal, SplitText } from "./shared/reveal";
import { ShaderCanvas } from "./shared/ShaderCanvas";
import { PhoneMockup } from "./shared/PhoneMockup";
import { MessageModal } from "./shared/MessageModal";
import {
  RoutinesSection,
  SecuritySection,
  HowItWorksSection,
  FaqSection,
  Footer,
} from "./sections";
import s from "./sections.module.css";
import v from "./variations.module.css";
import d from "./variationD.module.css";

/* Brand-locked glass palette — purple → magenta family */
const GLASS_COOL: [number, number, number][] = [
  [0.16, 0.1, 0.6],
  [0.443, 0.31, 0.933],
  [0.839, 0.431, 0.941],
];

/* Wave field palette — light lilac troughs → soft magenta crests */
const WAVE_BRAND: [number, number, number][] = [
  [0.74, 0.69, 0.95],
  [0.80, 0.66, 0.96],
  [0.93, 0.74, 0.97],
];

const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "ja", short: "JA", label: "日本語" },
  { code: "ko", short: "KO", label: "한국어" },
  { code: "zh", short: "ZH", label: "简体中文" },
];

const HERO_BULLETS = [
  "No carrier charges",
  "Works via iMessage, SMS & Telegram",
  "No app to download",
];

/* Phone max-width calculation to keep phone inside viewport-height hero */
const PHONE_MAX_W = "calc((100svh - 210px) * 346 / 720)";

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className={v.langWrap}>
      <button type="button" className={v.langBtn} onClick={() => setOpen((o) => !o)}>
        {current.short}
        <span className={`${v.langChevron} ${open ? v.langChevronOpen : ""}`}>▾</span>
      </button>
      {open && (
        <div className={v.langDropdown}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`${v.langOption} ${l.code === lang ? v.langOptionActive : ""}`}
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
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
/* iMessage feature copy                                               */
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
        Messaging mode
      </Reveal>
      <SplitText text="Get things done from your texts." as="h2" className={v.h2Local} />
      <Reveal as="p" className={s.lead} delay={0.1}>
        Airtap's superpower: just text your agent like a friend. Ask for anything, approve
        with a tap, and watch it happen — right inside iMessage and RCS.
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

function ImessageFeatures() {
  return (
    <section className={v.imsg} id="messaging">
      <div className={v.imsgShader}>
        <ShaderCanvas mode="glass" colors={GLASS_COOL} density={70} opacity={0.32} contrast={1.1} />
      </div>
      <div className={v.imsgInner}>
        <ImsgCopy />
        <Reveal className={v.imsgPhoneCol} y={40} delay={0.1}>
          <OrbitVisual />
        </Reveal>
      </div>
    </section>
  );
}

/* ==================================================================
   VARIATION D — DS-Strict · Light · IBM Plex Sans
   ================================================================== */

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const WEB_FEATURES = [
  {
    icon: "spark" as const,
    title: "Live screen stream",
    body: "Watch your cloud phone screen update in real time as the agent taps, types and swipes through your apps.",
  },
  {
    icon: "repeat" as const,
    title: "Visual routine builder",
    body: "Build, edit and schedule routines through a form or directly via prompt — no code required.",
  },
  {
    icon: "check" as const,
    title: "Full task history",
    body: "Every action the agent took, step by step — with a status summary at the end of each task.",
  },
  {
    icon: "bolt" as const,
    title: "Works in any browser",
    body: "No install, no extension. Open the web app from any device and your cloud phone is ready instantly.",
  },
];

/* ---- Cloud Phone Web App Section ---- */
function CloudPhoneSection() {
  return (
    <section className={d.cloudSection} id="cloud-phone">
      <div className={d.cloudInner}>
        <div className={d.cloudLayout}>
          {/* Copy */}
          <Reveal className={d.cloudCopy} y={24}>
            <span className={d.cloudEyebrow}>Advanced Mode</span>
            <h2 className={d.cloudTitle}>
              Watch your agent work, live in the browser.
            </h2>
            <p className={d.cloudSub}>
              Sign in with Google or your phone number to access the full web
              dashboard. Run tasks, build routines, and see your cloud phone
              screen streaming in real time — from any browser, no install needed.
            </p>
            <div className={d.cloudLoginRow}>
              <a href="#" className={`${d.cloudLoginBtn} ${d.cloudLoginPrimary}`}>
                <GoogleIcon />
                Continue with Google
              </a>
              <a href="#" className={`${d.cloudLoginBtn} ${d.cloudLoginOutline}`}>
                <Icons.phone width={16} height={16} />
                Use phone number
              </a>
            </div>
            <div className={d.cloudCaps}>
              {["Real-time stream", "Routine builder", "Task history", "Any browser"].map((cap) => (
                <span key={cap} className={d.cloudCap}>
                  <Icons.check width={12} height={12} />
                  {cap}
                </span>
              ))}
            </div>
          </Reveal>

          {/* App screenshots */}
          <Reveal y={40} delay={0.15}>
            <div className={d.appScreenshots}>
              <img
                src="/app-desktop.png"
                className={d.screenshotDesktop}
                alt="Airtap web app"
                draggable={false}
              />
              <img
                src="/app-mobile.png"
                className={d.screenshotMobile}
                alt="Airtap mobile app"
                draggable={false}
              />
            </div>
          </Reveal>
        </div>

        {/* Feature cards */}
        <div className={d.webFeatures}>
          {WEB_FEATURES.map((f, i) => {
            const Icon = Icons[f.icon];
            return (
              <Reveal key={f.title} className={d.webFeatureCard} delay={0.08 * i} y={20}>
                <div className={d.webFeatureIcon}><Icon /></div>
                <h4 className={d.webFeatureTitle}>{f.title}</h4>
                <p className={d.webFeatureBody}>{f.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Nav D ---- */
function NavD({ onCtaClick }: { onCtaClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`${d.nav} ${scrolled ? d.navScrolled : ""}`}>
      <a href="#product" style={{ textDecoration: "none" }}>
        <Logo size={24} textColor="var(--text-title)" />
      </a>
      <div className={d.navRight}>
        <a href="https://airtap.ai/technology" className={d.navTechLink}>Technology</a>
        <LanguageSelector />
        <button type="button" className={d.navCta} onClick={onCtaClick}>
          Get Started For Free
          <Icons.arrow width={14} height={14} />
        </button>
      </div>
    </nav>
  );
}

/* ---- Hero D ---- */
function HeroD({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <header className={d.hero} id="product">
      <div className={d.heroShader}>
        <ShaderCanvas mode="wave" colors={WAVE_BRAND} opacity={0.55} speed={0.7} />
      </div>
      <div className={d.heroInner}>
        <div className={d.heroSplit}>
          <div className={d.heroLeft}>
            <h1 className={d.heroTitle}>
              <SplitText text="Text your" as="span" style={{ display: "block" }} />
              <Reveal as="span" className={d.heroTitleStrong} style={{ display: "block" }} delay={0.15} y={16}>
                apps.
              </Reveal>
            </h1>
            <Reveal as="p" className={d.heroSub} delay={0.3}>
              Stop doing it yourself. Job applications, flight tracking, digital couponing:
              whatever you do on your phone, just text it to Airtap and let it handle the rest.
            </Reveal>
            <Reveal delay={0.35}>
              <ul className={d.heroBullets}>
                {HERO_BULLETS.map((b) => (
                  <li key={b} className={d.heroBulletItem}>
                    <Icons.check width={13} height={13} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className={d.heroCtas} delay={0.4}>
              <button className={d.heroPrimary} onClick={onCtaClick}>
                Message Airtap
                <Icons.arrow width={16} height={16} />
              </button>
            </Reveal>
            <Reveal as="p" className={d.heroCaption} delay={0.45}>
              Free Sign Up. No credit card or payment required.
            </Reveal>
          </div>
          <div className={d.heroRight}>
            <PhoneMockup captionTheme="light" phoneMaxW={PHONE_MAX_W} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---- Variation D composition ---- */
export function VariationD() {
  const [modal, setModal] = useState(false);
  return (
    <div className={`${d.root} ${d.themeLight}`} data-theme="light">
      <NavD onCtaClick={() => setModal(true)} />
      <HeroD onCtaClick={() => setModal(true)} />
      <CloudPhoneSection />
      <RoutinesSection />
      <HowItWorksSection />
      <ImessageFeatures />
      <SecuritySection />
      <FaqSection />
      <Footer />
      {/* Sticky mobile CTA — fixed at bottom, mobile only */}
      <div className={d.mobileStickyBar}>
        <button type="button" className={d.mobileStickyBtn} onClick={() => setModal(true)}>
          Message Airtap
          <Icons.arrow width={16} height={16} />
        </button>
      </div>
      <MessageModal isOpen={modal} onClose={() => setModal(false)} theme="light" />
    </div>
  );
}
