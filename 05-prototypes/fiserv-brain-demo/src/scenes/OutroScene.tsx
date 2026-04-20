import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 9 — Call to action. Names Slice A, Slice B, and Slice D explicitly.
 * Duration: 600 frames (20s at 30fps)
 *
 * ONE idea: the MVP is ready to pilot, and the prize is the strategic-QSR slice.
 */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 30);

  const sliceAOpacity = fadeIn(frame, 90, 25);
  const sliceAY = slideUp(frame, 90, 25, 20);

  const sliceBOpacity = fadeIn(frame, 180, 25);
  const sliceBY = slideUp(frame, 180, 25, 20);

  const andOpacity = fadeIn(frame, 270, 25);
  const andY = slideUp(frame, 270, 25, 20);

  const sliceDOpacity = fadeIn(frame, 330, 30);
  const sliceDY = slideUp(frame, 330, 30, 25);

  const closerOpacity = fadeIn(frame, 440, 35);
  const closerY = slideUp(frame, 440, 35, 25);

  const footerOpacity = fadeIn(frame, 520, 30);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: "0 140px",
      }}
    >
      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 44,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        The MVP is ready to pilot.
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 28px",
            borderRadius: 12,
            backgroundColor: COLORS.BG_CARD,
            borderLeft: `4px solid ${COLORS.ACCENT_BLUE}`,
            opacity: sliceAOpacity,
            transform: `translateY(${sliceAY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.ACCENT_BLUE,
              letterSpacing: -0.5,
              minWidth: 110,
            }}
          >
            Slice A
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 20,
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.4,
            }}
          >
            Mid-market fashion brand · CommerceHub + Shopify ISV · 3 merchants · 120-day value pilot
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 28px",
            borderRadius: 12,
            backgroundColor: COLORS.BG_CARD,
            borderLeft: `4px solid ${COLORS.ACCENT_GREEN}`,
            opacity: sliceBOpacity,
            transform: `translateY(${sliceBY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.ACCENT_GREEN,
              letterSpacing: -0.5,
              minWidth: 110,
            }}
          >
            Slice B
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 20,
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.4,
            }}
          >
            Clover SMB restaurant · Clover App Market · 25 merchants · 90-day distribution pilot
          </div>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 18,
          color: COLORS.TEXT_MUTED,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          opacity: andOpacity,
          transform: `translateY(${andY}px)`,
        }}
      >
        and one more thing...
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "22px 30px",
          borderRadius: 12,
          backgroundColor: COLORS.BG_CARD,
          borderLeft: `4px solid ${COLORS.ACCENT_AMBER}`,
          width: "100%",
          maxWidth: 900,
          opacity: sliceDOpacity,
          transform: `translateY(${sliceDY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.ACCENT_AMBER,
            letterSpacing: -0.5,
            minWidth: 110,
          }}
        >
          Slice D
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 20,
            color: COLORS.TEXT_PRIMARY,
            lineHeight: 1.4,
          }}
        >
          Strategic-QSR prize · One brand under Inspire Brands or Yum! · IPG + Nashville + Buypass + STAR/NYCE + ValueLink
        </div>
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
          marginTop: 16,
          opacity: closerOpacity,
          transform: `translateY(${closerY}px)`,
        }}
      >
        Let&apos;s pilot Slice A and Slice B. Then go after Slice D.
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 13,
          color: COLORS.TEXT_MUTED,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          marginTop: 12,
          opacity: footerOpacity,
        }}
      >
        Fiserv Brain · Built on Karpathy&apos;s Second Brain OS · Ajay Narasimma · April 2026
      </div>
    </AbsoluteFill>
  );
};
