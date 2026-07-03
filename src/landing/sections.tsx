import { useState } from "react";
import {
  ROUTINES,
  SECURITY_POINTS,
  HOW_IT_WORKS,
  STATS,
  LOGOS,
  TESTIMONIALS,
  FAQS,
  FOOTER_COLUMNS,
} from "./data";
import { Icons, type IconKey } from "./shared/icons";
import { Logo } from "./shared/Logo";
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
export function Footer({ showBrand }: { showBrand?: boolean }) {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footTop}>
          <div className={s.footBrandCol}>
            <Logo size={26} textColor="var(--fg)" />
            {showBrand && (
              <>
                <p className={s.footTag}>
                  The virtual Android cloud phone with a smart AI agent. Get anything done —
                  just text it.
                </p>
                <form className={s.newsletter} onSubmit={(e) => e.preventDefault()}>
                  <input className={s.newsInput} type="email" placeholder="Enter your email" aria-label="Email" />
                  <button className={s.newsBtn} aria-label="Subscribe">
                    <Icons.arrow width={18} height={18} />
                  </button>
                </form>
              </>
            )}
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav className={s.footCol} key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={s.footBottom}>
          <span className={s.footLegal}>
            © {new Date().getFullYear()} Airtap.ai — All rights reserved · Privacy · Terms · Trust Center
          </span>
          <div className={s.footSocial}>
            {["X", "in", "GH", "IG"].map((x) => (
              <a key={x} href="#" aria-label={x}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{x}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
