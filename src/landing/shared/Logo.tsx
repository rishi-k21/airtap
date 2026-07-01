/**
 * Airtap brand logo.
 * - `Logo`     → the full lockup (bolt mark + "airtap" wordmark), the official
 *                gradient art from /public/airtap-logo.svg. Used in nav/footer.
 * - `LogoMark` → just the bolt, drawn from `AIRTAP_MARK_PATH` so it can be
 *                recolored (e.g. white in the orbit core).
 */

const FULL_LOGO = `${import.meta.env.BASE_URL}airtap-logo.svg`;

/** The official "tap" bolt, matching /public/airtap-logo.svg (viewBox 0 0 49.5 48). */
export const AIRTAP_MARK_PATH =
  "M16.8318 5.01758C20.4236 -1.62082 29.8998 -1.67167 33.5847 4.8623L33.6726 5.01758L36.8289 10.8604L34.2908 14.8018L34.2791 14.8184C34.2 14.9454 34.1179 15.073 34.0388 15.1973L29.699 7.16601C27.7872 3.63418 22.7191 3.63407 20.8074 7.16601L9.36207 28.3291C10.5469 28.0461 11.8759 27.8617 13.364 27.8135H13.4373L13.4343 27.8076C17.1729 27.8076 20.3725 29.1663 23.1736 31.0215C22.1713 32.3005 21.1997 33.4635 20.2595 34.5166C18.1334 33.1698 15.9365 32.3338 13.4744 32.3281C9.62854 32.458 7.49092 33.7036 6.34449 34.7314C5.75157 35.2623 5.37844 35.7759 5.16383 36.1289C5.05661 36.3067 4.98875 36.4423 4.95485 36.5186C4.9379 36.5581 4.9274 36.5813 4.92457 36.5869C3.55212 39.7943 5.89174 43.4707 9.48414 43.4736V43.4814C17.005 43.4765 25.1867 32.9148 35.948 15.875L37.8767 12.8027V12.7998L39.4148 15.6465H39.4158L49.3464 34.0117C52.7628 40.3254 48.1855 47.9941 41.0134 47.9941H41.0105V47.9912C37.9216 47.9911 35.256 46.752 32.9265 45.1426C30.7749 43.6573 28.7222 41.7202 26.7937 39.9131C27.7453 38.8373 28.7084 37.6798 29.6882 36.4346V36.4375C31.7579 38.3716 33.5965 40.1166 35.4939 41.4268C37.4193 42.7564 39.1867 43.4735 41.0105 43.4736V43.4766H41.0134C44.7689 43.4766 47.161 39.4639 45.3738 36.1631L37.5701 21.7295C26.5555 38.7998 18.5699 47.9997 9.47926 48V47.9902C2.31014 47.9865 -2.26073 40.321 1.15504 34.0088L16.8318 5.01758Z";

export function LogoMark({
  size = 28,
  fill = "#714FEE",
  className,
}: {
  size?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      width={(size * 49.5) / 48}
      height={size}
      viewBox="0 0 49.5 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path d={AIRTAP_MARK_PATH} fill={fill} />
    </svg>
  );
}

export function Logo({
  size = 26,
  className,
}: {
  size?: number;
  /** kept for call-site compatibility — the lockup is the fixed gradient art */
  markFill?: string;
  textColor?: string;
  className?: string;
}) {
  // Full lockup is 149×54 → keep aspect ratio, scale to the requested mark height.
  return (
    <img
      src={FULL_LOGO}
      alt="Airtap"
      className={className}
      height={Math.round(size * 1.16)}
      style={{ height: Math.round(size * 1.16), width: "auto", display: "block" }}
    />
  );
}
