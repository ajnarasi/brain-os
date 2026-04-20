import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 6 — How the Brain gets smarter (self-enhancement).
 * Uses Indigo Road's Klarna → Afterpay story as the concrete example.
 * Duration: 600 frames (20s at 30fps)
 *
 * ONE idea: the brain compounds, and that compounding is the moat.
 */
export const SelfEnhancementScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 30);

  const beat1Opacity = fadeIn(frame, 80, 25);
  const beat1Y = slideUp(frame, 80, 25, 20);

  const beat2Opacity = fadeIn(frame, 150, 25);
  const beat2Y = slideUp(frame, 150, 25, 20);

  const storyOpacity = fadeIn(frame, 230, 40);
  const storyY = slideUp(frame, 230, 40, 30);

  const punchlineOpacity = fadeIn(frame, 430, 40);
  const punchlineY = slideUp(frame, 430, 40, 25);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "0 140px",
      }}
    >
      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          textAlign: "center",
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.15,
        }}
      >
        The brain gets smarter.
        <br />
        <span style={{ color: COLORS.ACCENT_BLUE }}>Every. Single. Day.</span>
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: beat1Opacity,
          transform: `translateY(${beat1Y}px)`,
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 22,
            color: COLORS.TEXT_SECONDARY,
          }}
        >
          Every failure writes back to feedback memory.
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 22,
            color: COLORS.TEXT_SECONDARY,
            opacity: beat2Opacity,
            transform: `translateY(${beat2Y}px)`,
          }}
        >
          Every resolution becomes a rule.
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          padding: 28,
          maxWidth: 920,
          borderRadius: 16,
          backgroundColor: COLORS.BG_CARD,
          borderLeft: `4px solid ${COLORS.ACCENT_PURPLE}`,
          opacity: storyOpacity,
          transform: `translateY(${storyY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 16,
            color: COLORS.ACCENT_PURPLE,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          A real story from memory
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 20,
            color: COLORS.TEXT_PRIMARY,
            lineHeight: 1.55,
          }}
        >
          September 2025 — Indigo Road&apos;s Klarna integration duplicated 6 orders because the webhook idempotency
          key expired at 30 days. Their brain wrote the lesson to feedback memory:{" "}
          <span style={{ color: COLORS.ACCENT_BLUE, fontWeight: 600 }}>
            &ldquo;BNPL webhook TTL must be ≥35 days.&rdquo;
          </span>
          <br />
          <br />
          Six months later, when Sarah Chen started the Afterpay integration in April 2026, the brain surfaced the lesson
          automatically. <span style={{ color: COLORS.ACCENT_GREEN, fontWeight: 700 }}>Zero re-learning.</span>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
          textAlign: "center",
          opacity: punchlineOpacity,
          transform: `translateY(${punchlineY}px)`,
          marginTop: 6,
        }}
      >
        This is what makes it a{" "}
        <span style={{ color: COLORS.ACCENT_AMBER }}>moat</span>.
      </div>
    </AbsoluteFill>
  );
};
