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
import d from "./variationD.module.css";

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

/* ==================================================================
   VARIATION D — DS-Strict · Dark · IBM Plex Sans · Web Dashboard
   All colors, typography and spacing from the Airtap design system.
   ================================================================== */

/* Google G icon for OAuth CTA */
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

const PHONE_APPS = [
  "#714fee","#d66ef0","#01a5be","#4fac31",
  "#ed7e30","#015af5","#8f74f1","#edcd30",
  "#e93323","#01d4f5","#be18e7","#75c15d",
];

const RECENT_TASKS = [
  { label: "Create Flying Cat Motivationa...", done: true },
  { label: "Find latest MKBHD YouTube...", done: false },
  { label: "Check unread Slack messages", done: true },
  { label: "Sign in to Google Play Store", done: true },
];

/* ---- Web Dashboard Mockup ---- */
function DashboardMockup() {
  return (
    <div className={d.dashWrap}>
      {/* Sidebar */}
      <div className={d.dbSidebar}>
        <div className={d.dbLogo}>
          <div className={d.dbLogoMark}><LogoMark size={14} fill="#fff" /></div>
          <span className={d.dbLogoText}>Airtap</span>
        </div>
        <div className={`${d.dbNavItem} ${d.dbActive}`}>
          <Icons.repeat width={14} height={14} />
          Routines
        </div>
        <div className={d.dbNavItem}>
          <Icons.check width={14} height={14} />
          Tasks
        </div>
        <div className={d.dbSection}>Recent</div>
        {RECENT_TASKS.map((t) => (
          <div key={t.label} className={d.dbRecentItem}>
            <span className={d.dbDot} style={{ background: t.done ? "var(--green-green-400)" : "var(--red-red-500)" }} />
            {t.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className={d.dbMain}>
        <div className={d.dbMainHead}>
          <p className={d.dbMainTitle}>Hello Rishi,</p>
          <p className={d.dbMainSub}>What can I do for you today?</p>
        </div>
        <div className={d.dbMessages}>
          <div className={`${d.dbBubble} ${d.dbUser}`}>
            Apply to 5 senior product designer roles in SF for me.
          </div>
          <div className={`${d.dbBubble} ${d.dbAgent}`}>
            Got it. Using your saved résumé and Easy Apply on LinkedIn.
            <div className={d.dbCard}>
              <div className={d.dbCardTitle}>Sr. Product Designer · 3 of 5 submitted</div>
              <div className={d.dbCardSub}>Figma · Linear · Notion · $160k+</div>
            </div>
          </div>
          <div className={`${d.dbBubble} ${d.dbUser}`}>Skip anything below $160k</div>
          <div className={`${d.dbBubble} ${d.dbAgent}`}>Noted. Filtered + finished all 5. I'll ping you on replies 📨</div>
        </div>
        <div className={d.dbInput}>
          <span className={d.dbInputText}>Chat with Airtap</span>
          <span className={d.dbChip}><Icons.phone width={10} height={10} /> Cloud Phone</span>
          <span className={d.dbChip}><Icons.spark width={10} height={10} /> Flash</span>
        </div>
      </div>

      {/* Phone panel */}
      <div className={d.dbPhonePanel}>
        <span className={d.dbPanelLabel}>Cloud Phone</span>
        <span className={d.dbLiveTag}>
          <span className={d.dbLiveDot} /> Live
        </span>
        <div className={d.dbPhone}>
          <div className={d.dbPhoneScreen}>
            <div className={d.dbPhoneTime}>9:41</div>
            <div className={d.dbPhoneApps}>
              {PHONE_APPS.map((c, i) => (
                <span key={i} className={d.dbPhoneApp} style={{ background: c }} />
              ))}
            </div>
            <div className={d.dbPhoneBrand}>Airtap</div>
          </div>
        </div>
      </div>
    </div>
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
    body: "Build, edit and schedule routines from a drag-and-drop dashboard — no prompting required.",
  },
  {
    icon: "check" as const,
    title: "Full task history",
    body: "Every action the agent took, step by step. Replay, audit or resume any task from the timeline.",
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

          {/* Dashboard mockup */}
          <Reveal y={40} delay={0.15}>
            <DashboardMockup />
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
function NavD() {
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
      <div className={d.navLinks}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a href="#cloud-phone">Web App</a>
      </div>
      <div className={d.navRight}>
        <a href="#" className={d.navSignIn}>Sign in</a>
        <a href="#" className={d.navCta}>
          Get started
          <Icons.arrow width={14} height={14} />
        </a>
      </div>
    </nav>
  );
}

/* ---- Hero D ---- */
function HeroD() {
  return (
    <header className={d.hero} id="product">
      <div className={d.heroShader}>
        <ShaderCanvas mode="aurora" colors={AURORA_COOL} opacity={0.75} speed={0.9} />
      </div>
      <div className={d.heroInner}>
        <Reveal as="div" className={d.heroEyebrow} y={14}>
          <span className={d.heroEyebrowDot} />
          Airtap Cloud Phone · Advanced
        </Reveal>
        <h1 className={d.heroTitle}>
          Your phone,{" "}
          <span className={d.heroTitleStrong}>running itself.</span>
        </h1>
        <p className={d.heroSub}>
          A real Android device in the cloud operated by an AI agent.
          Text it from iMessage or control it live from the web —
          it handles the tapping, you handle the thinking.
        </p>
        <Reveal className={d.heroCtas} delay={0.2}>
          <a href="#" className={d.heroPrimary}>
            Get started free
            <Icons.arrow width={16} height={16} />
          </a>
          <a href="#cloud-phone" className={d.heroOutline}>
            Open web dashboard
          </a>
        </Reveal>
        <Reveal as="div" className={d.heroNote} delay={0.3}>
          <Icons.shield width={14} height={14} />
          Zero passwords stored · end-to-end isolated sessions
        </Reveal>
      </div>
    </header>
  );
}

/* ---- Variation D composition ---- */
export function VariationD() {
  return (
    <div className={d.root} data-theme="dark">
      <NavD />
      <HeroD />
      <CloudPhoneSection />
      <RoutinesSection />
      <HowItWorksSection />
      <ImessageFeatures />
      <SecuritySection />
      <StatsSection />
      <SocialProofSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
