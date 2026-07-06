import { useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import styles from "./MessageModal.module.css";

const SMS_URL = "sms:+16502137322?body=Hi%20there%2C%20what%20are%20the%20top%205%20things%20I%20can%20do%20with%20Airtap";
const PHONE_DISPLAY = "+1 (650) 213-7322";
const WEBAPP_URL = "https://airtap.ai/app";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

export function MessageModal({ isOpen, onClose, theme = "light" }: MessageModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, SMS_URL, {
      width: 220,
      margin: 2,
      color: {
        dark: theme === "dark" ? "#f3f3f6" : "#16181f",
        light: theme === "dark" ? "#252734" : "#ffffff",
      },
    });
  }, [isOpen, theme]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Scan to text Airtap"
    >
      <div className={`${styles.modal} ${isDark ? styles.modalDark : ""}`}>
        <button className={`${styles.close} ${isDark ? styles.closeDark : ""}`} onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className={styles.title}>Message Airtap</h2>

        {/* Desktop: QR code section */}
        <div className={styles.qrSection}>
          <p className={styles.subtitle}>
            Point your phone's camera at the code. It opens your messaging app
            with Airtap's number ready to go.
          </p>
          <div className={`${styles.qrWrap} ${isDark ? styles.qrWrapDark : ""}`}>
            <canvas ref={canvasRef} />
          </div>
          <p className={styles.directText}>
            Or text us directly at{" "}
            <a
              href={SMS_URL}
              className={`${styles.phone} ${isDark ? styles.phoneDark : ""}`}
            >
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>

        {/* Mobile: primary SMS button */}
        <div className={styles.mobileSection}>
          <p className={`${styles.mobileSubtitle} ${isDark ? styles.mobileSubtitleDark : ""}`}>
            Tap below to open your messaging app with Airtap's number ready to go.
          </p>
          <a
            href={SMS_URL}
            className={`${styles.smsBtnMobile} ${isDark ? styles.smsBtnMobileDark : ""}`}
          >
            <span className={styles.smsBtnMobileLabel}>Text Airtap</span>
            <span className={styles.smsBtnMobilePhone}>{PHONE_DISPLAY}</span>
          </a>
        </div>

        <div className={`${styles.divider} ${isDark ? styles.dividerDark : ""}`}>
          <span className={`${styles.dividerLabel} ${isDark ? styles.dividerLabelDark : ""}`}>or</span>
        </div>

        <a
          href={WEBAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.webappBtn} ${isDark ? styles.webappBtnDark : ""}`}
        >
          <span className={styles.webappBtnTitle}>Log in to the web app</span>
          <span className={styles.webappBtnSub}>For advanced use cases, go to airtap.ai/app</span>
        </a>
      </div>
    </div>
  );
}
