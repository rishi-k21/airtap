import { useEffect, useRef, useState } from "react";
import { CONVERSATIONS, type ChatMessage } from "../data";
import styles from "./PhoneMockup.module.css";

const AGENT_AVATAR = `${import.meta.env.BASE_URL}airtap-agent.svg`;
const ADVANCE_DELAY = 5000;

/* ---------- inline iOS glyphs ---------- */
const CellularIcon = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="#000">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="10" y="3" width="3" height="9" rx="1" />
    <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
    <rect x="0.5" y="0.8" width="22" height="11.4" rx="3.3" stroke="#000" strokeOpacity="0.4" />
    <rect x="2" y="2.3" width="19" height="8.4" rx="2" fill="#000" />
    <path d="M24.5 4.2c1.4.4 1.4 4.2 0 4.6V4.2Z" fill="#000" fillOpacity="0.4" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="13" height="22" viewBox="0 0 13 22" fill="none">
    <path d="M11 2 2.5 11 11 20" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
    <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FaceTimeIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect x="1" y="2" width="16" height="12" rx="3.4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M17 6.2 22.3 3v10L17 9.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const SendArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13V3.5M8 3.5 3.8 7.7M8 3.5l4.2 4.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const cardGradients: Record<string, string> = {
  flight: "linear-gradient(135deg,#714FEE,#4C20E9)",
  reel: "linear-gradient(135deg,#D66EF0,#8911A6)",
  job: "linear-gradient(135deg,#01A5BE,#007385)",
  cart: "linear-gradient(135deg,#4FAC31,#306C1D)",
  receipt: "linear-gradient(135deg,#ED7E30,#834218)",
};
const cardEmoji: Record<string, string> = {
  flight: "✈️",
  reel: "🎬",
  job: "💼",
  cart: "🛒",
  receipt: "📋",
};

interface PhoneMockupProps {
  /** light or dark caption text treatment */
  captionTheme?: "light" | "dark";
  /** Override max phone width via CSS var — used to constrain phone inside viewport-height heroes */
  phoneMaxW?: string;
}

export function PhoneMockup({ captionTheme = "light", phoneMaxW }: PhoneMockupProps) {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conv = CONVERSATIONS[active];

  // play the active conversation
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCount(0);
    setTyping(false);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const push = (fn: () => void, d: number) => {
      timers.current.push(window.setTimeout(fn, d));
    };

    let acc = reduce ? 0 : 500;
    conv.messages.forEach((m, i) => {
      if (reduce) {
        push(() => setCount(i + 1), 0);
        return;
      }
      if (m.role === "agent") {
        acc += 600;
        push(() => setTyping(true), acc);
        acc += 1350;
        push(() => {
          setTyping(false);
          setCount(i + 1);
        }, acc);
      } else {
        acc += 750;
        push(() => setCount(i + 1), acc);
      }
    });
    acc += ADVANCE_DELAY;
    push(() => setActive((a) => (a + 1) % CONVERSATIONS.length), acc);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playKey]);

  // keep scrolled to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [count, typing]);

  const select = (i: number) => {
    if (i === active) {
      setPlayKey((k) => k + 1);
    } else {
      setActive(i);
    }
  };

  const visible = conv.messages.slice(0, count);

  return (
    <div
      className={styles.stage}
      style={
        {
          "--cap-accent": conv.accent,
          "--cap-muted": captionTheme === "dark" ? "rgba(235,235,245,0.66)" : "#5b5b68",
          "--cap-dot": captionTheme === "dark" ? "rgba(255,255,255,0.22)" : "rgba(20,20,40,0.18)",
          ...(phoneMaxW ? { "--phone-max-w": phoneMaxW } : {}),
        } as React.CSSProperties
      }
    >
      <div className={styles.phone}>
        <div className={styles.frame}>
          <div className={styles.island} />
          <div className={styles.screen}>
            {/* status bar */}
            <div className={styles.statusbar}>
              <span className={styles.statusTime}>9:41</span>
              <span className={styles.statusIcons}>
                <CellularIcon />
                <BatteryIcon />
              </span>
            </div>

            {/* contact header */}
            <div className={styles.nav}>
              <div className={styles.navTop}>
                <span className={styles.back}>
                  <ChevronLeft />
                  <span className={styles.badge}>5</span>
                </span>
                <span className={styles.facetime}>
                  <FaceTimeIcon />
                </span>
              </div>
              <img className={styles.navAvatar} src={AGENT_AVATAR} alt="Airtap agent" />
              <span className={styles.navName}>
                Airtap
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={styles.verified}>
                  <circle cx="6" cy="6" r="6" fill="#0a7cff" />
                  <path d="M3.4 6.1 5.1 7.8 8.6 4.3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <ChevronRight />
              </span>
            </div>

            {/* messages */}
            <div className={styles.messages} ref={scrollRef}>
              <div className={styles.timestamp}>
                iMessage · <b>Today 9:41 AM</b>
              </div>
              {visible.map((m, i) => (
                <MessageRow
                  key={`${conv.id}-${i}`}
                  msg={m}
                  prev={conv.messages[i - 1]}
                  next={conv.messages[i + 1]}
                  accent={conv.accent}
                />
              ))}
              {typing && (
                <div className={`${styles.row} ${styles.rowThem} ${styles.newGroup}`}>
                  <div className={styles.typing}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* input bar */}
            <div className={styles.inputbar}>
              <span className={styles.plus}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className={styles.field}>
                iMessage
                <span className={styles.send}>
                  <SendArrow />
                </span>
              </span>
            </div>
            <div className={styles.homebar} />
          </div>
        </div>
      </div>

      {/* caption + carousel */}
      <div className={styles.caption}>
        <span className={styles.eyebrow} style={{ background: conv.accent }}>
          <span className={styles.eyebrowDot} />
          Use case {String(active + 1).padStart(2, "0")} / {CONVERSATIONS.length}
        </span>
        <h3 className={styles.capTitle}>{conv.useCase}</h3>
        <p className={styles.capTagline}>{conv.tagline}</p>
        <div className={styles.dots} role="tablist" aria-label="Switch use case">
          {CONVERSATIONS.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === active}
              aria-label={c.useCase}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              style={i === active ? { background: conv.accent } : undefined}
              onClick={() => select(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageRow({
  msg,
  prev,
  next,
  accent,
}: {
  msg: ChatMessage;
  prev?: ChatMessage;
  next?: ChatMessage;
  accent: string;
}) {
  const me = msg.role === "user";
  const firstOfGroup = !prev || prev.role !== msg.role;
  const lastOfGroup = !next || next.role !== msg.role;

  const bubbleClass = [
    styles.bubble,
    me ? styles.me : styles.them,
    !firstOfGroup && (me ? styles.tTopMe : styles.tTopThem),
    !lastOfGroup && (me ? styles.tBotMe : styles.tBotThem),
    lastOfGroup && styles.tail,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={[
        styles.row,
        me ? styles.rowMe : styles.rowThem,
        firstOfGroup ? styles.newGroup : "",
      ].join(" ")}
    >
      <div className={styles.bubbleWrap} style={{ alignItems: me ? "flex-end" : "flex-start" }}>
        {msg.text && <div className={bubbleClass}>{msg.text}</div>}
        {msg.attachment && (
          <div className={styles.card}>
            <div
              className={styles.cardTop}
              style={{ background: cardGradients[msg.attachment.kind] }}
            >
              {cardEmoji[msg.attachment.kind]}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{msg.attachment.title}</div>
              {msg.attachment.subtitle && (
                <div className={styles.cardSub}>{msg.attachment.subtitle}</div>
              )}
              {msg.attachment.meta && (
                <div className={styles.cardMeta} style={{ color: accent }}>
                  {msg.attachment.meta}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
