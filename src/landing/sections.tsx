import { useState } from "react";
import {
  ROUTINES,
  SECURITY_POINTS,
  HOW_IT_WORKS,
  STATS,
  LOGOS,
  TESTIMONIALS,
  FAQS,
} from "./data";
import { Icons, type IconKey } from "./shared/icons";
import { Reveal, SplitText } from "./shared/reveal";
import { ShaderCanvas } from "./shared/ShaderCanvas";
import s from "./sections.module.css";

function Heading({
  eyebrow,
  title,
  lead,
  center,
  fullWidth,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={`${s.headWrap} ${center ? s.center : ""} ${fullWidth ? s.headWide : ""}`}>
      <Reveal as="span" className={s.eyebrow} y={14}>
        {eyebrow}
      </Reveal>
      <SplitText text={title} as="h2" className={s.h2} />
      {lead && (
        <Reveal as="p" className={s.lead} delay={0.1}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Routines ---------- */
export function RoutinesSection() {
  return (
    <section className={s.section} id="routines">
      <div className={s.container}>
        <Heading
          eyebrow="Routines library"
          title="Set it once. It runs forever."
          lead="Pick from dozens of ready-made routines or build your own. Choose what time they run and how often — your agent handles the rest, on schedule."
        />
        <div className={s.routineGrid}>
          {ROUTINES.map((r, i) => (
            <Reveal key={r.id} className={s.routineCard} delay={(i % 3) * 0.08} y={36}>
              <span className={s.routineCat}>{r.category}</span>
              <div className={s.routineEmoji}>{r.emoji}</div>
              <h3 className={s.routineTitle}>{r.title}</h3>
              <p className={s.routineDesc}>{r.description}</p>
              <span className={s.routineCadence}>
                <Icons.clock />
                {r.cadence}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal className={s.routineFoot} delay={0.1}>
          <a href="https://airtap.ai/routine-templates" className={`${s.btn} ${s.btnPrimary}`}>
            Explore the full routines library
            <Icons.arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
export function HowItWorksSection() {
  return (
    <section className={s.section} id="how">
      <div className={s.container}>
        <Heading
          eyebrow="How it works"
          title="A phone that runs itself"
          lead="Four steps from sign-up to autopilot. No code, no complicated setup."
        />
        <div className={s.steps}>
          {HOW_IT_WORKS.map((f, i) => {
            const Icon = Icons[f.icon as IconKey];
            return (
              <Reveal key={f.title} className={s.step} delay={i * 0.1} y={36}>
                <div className={s.stepNum}>0{i + 1}</div>
                <div className={s.stepIcon}>{Icon && <Icon />}</div>
                <h3 className={s.stepTitle}>{f.title}</h3>
                <p className={s.stepBody}>{f.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Security ---------- */
export function SecuritySection() {
  return (
    <section className={s.section} id="security">
      <div className={s.container}>
        <div className={s.securityWrap}>
          <div>
            <Heading
              eyebrow="Security & privacy"
              title="Your data never leaves your hands"
              lead="Airtap is built so the agent can act for you without ever seeing what matters. We store nothing — there's simply no data to leak."
            />
            <div className={s.secPoints}>
              {SECURITY_POINTS.map((p, i) => {
                const Icon = Icons[p.icon as IconKey];
                return (
                  <Reveal key={p.title} className={s.secPoint} delay={i * 0.08} y={24}>
                    <div className={s.secIcon}>{Icon && <Icon />}</div>
                    <div>
                      <div className={s.secPointTitle}>{p.title}</div>
                      <div className={s.secPointBody}>{p.body}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <Reveal y={40} delay={0.1}>
            <div className={s.privacyCard}>
              <div className={s.privacyHead}>
                <span className={s.privacyLed} />
                Agent session · live view
              </div>
              <div className={s.field2}>
                <div className={s.fieldLabel}>Email</div>
                <div className={s.fieldVal}>
                  you@airtap.ai
                  <span className={s.tagVisible}>visible</span>
                </div>
              </div>
              <div className={s.field2}>
                <div className={s.fieldLabel}>Password</div>
                <div className={s.fieldVal}>
                  <span className={s.masked}>••••••••••••</span>
                  <span className={s.tagBlocked}>blocked</span>
                </div>
              </div>
              <div className={s.field2}>
                <div className={s.fieldLabel}>Payment card</div>
                <div className={s.fieldVal}>
                  <span className={s.masked}>•••• •••• •••• 4242</span>
                  <span className={s.tagBlocked}>blocked</span>
                </div>
              </div>
              <div className={s.privacyNote}>
                <Icons.shield />
                The agent operates the screen but is cryptographically blocked from
                reading secure fields. Sessions are wiped on logout.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
export function StatsSection() {
  return (
    <section style={{ padding: "0 0 8px" }}>
      <div className={s.container}>
        <div className={s.stats}>
          {STATS.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.07} y={20}>
              <div className={s.statVal}>{st.value}</div>
              <div className={s.statLabel}>{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Social proof ---------- */
export function SocialProofSection() {
  return (
    <section className={s.section} id="reviews">
      <div className={s.container}>
        <Reveal as="p" className={`${s.eyebrow} ${s.center}`} style={{ display: "block", textAlign: "center" }}>
          Featured in
        </Reveal>
        <div className={s.logos} style={{ marginTop: 24, marginBottom: 8 }}>
          {LOGOS.map((l) => (
            <span key={l} className={s.logoItem}>
              {l}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 80 }}>
          <Heading
            center
            fullWidth
            eyebrow="Loved by early users"
            title="People are getting their time back"
          />
        </div>
        <div className={s.quotes}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} className={s.quoteCard} delay={(i % 2) * 0.1} y={32}>
              <div className={s.stars}>★★★★★</div>
              <p className={s.quoteText}>“{t.quote}”</p>
              <div className={s.quoteFoot}>
                <div className={s.avatar}>{t.initials}</div>
                <div>
                  <div className={s.qName}>{t.name}</div>
                  <div className={s.qRole}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={s.section} id="faq">
      <div className={s.container}>
        <Heading center fullWidth eyebrow="FAQ" title="Questions, answered" />
        <div className={s.faqList}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={s.faqItem}>
                <button
                  className={s.faqQ}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <span className={`${s.faqIcon} ${isOpen ? s.faqIconOpen : ""}`}>
                    <Icons.plus width={15} height={15} />
                  </span>
                </button>
                <div className={`${s.faqA} ${isOpen ? s.faqAOpen : ""}`}>
                  <p className={s.faqAText}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function CtaSection() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <Reveal className={s.cta} y={40}>
          <div className={s.ctaShader}>
            <ShaderCanvas mode="dots" density={26} opacity={0.5} colors={[[1, 1, 1]]} />
          </div>
          <h2 className={s.ctaTitle}>Your AI phone is one text away.</h2>
          <p className={s.ctaLead}>
            Spin up a cloud phone, connect iMessage, and let your agent take it from here.
          </p>
          <div className={s.ctaRow}>
            <a href="#" className={`${s.btn} ${s.ctaWhite}`}>
              Get your cloud phone
              <Icons.arrow />
            </a>
            <a href="#imessage" className={`${s.btn} ${s.ctaOutline}`}>
              See it in iMessage
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footRow}>
          <span className={s.footCopyright}>© Airtap AI Inc.</span>
          <div className={s.footLinks}>
            <a href="https://discord.gg/WwVb35b6xY" className={s.footIconLink} aria-label="Discord" target="_blank" rel="noopener noreferrer">
              <DiscordIcon />
            </a>
            <a href="https://x.com/airtap_ai" className={s.footIconLink} aria-label="X" target="_blank" rel="noopener noreferrer">
              <XIcon />
            </a>
            <a href="https://airtap.ai/terms-and-privacy#terms" className={s.footTextLink} target="_blank" rel="noopener noreferrer">Terms of Use</a>
            <a href="https://airtap.ai/terms-and-privacy#privacy" className={s.footTextLink} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
