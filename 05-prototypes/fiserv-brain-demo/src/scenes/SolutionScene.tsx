import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";
import { AnimatedCounter } from "../components/AnimatedCounter";

/**
 * Scene 7 — Internal value to Fiserv.
 * Three revenue-level counters.
 * Duration: 660 frames (22s at 30fps)
 *
 * ONE idea: Fiserv captures value three ways at once.
 */
export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 30);

  const card1Opacity = fadeIn(frame, 100, 20);
  const card1Y = slideUp(frame, 100, 20, 30);

  const card2Opacity = fadeIn(frame, 220, 20);
  const card2Y = slideUp(frame, 220, 20, 30);

  const card3Opacity = fadeIn(frame, 340, 20);
  const card3Y = slideUp(frame, 340, 20, 30);

  const closerOpacity = fadeIn(frame, 480, 40);
  const closerY = slideUp(frame, 480, 40, 25);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
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
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        What&apos;s in it for Fiserv?
      </h2>

      <div style={{ display: "flex", gap: 28, width: "100%", justifyContent: "center" }}>
        {/* NRR card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            padding: "36px 40px",
            borderRadius: 20,
            backgroundColor: COLORS.BG_CARD,
            border: `1px solid ${COLORS.ACCENT_BLUE}`,
            minWidth: 280,
            opacity: card1Opacity,
            transform: `translateY(${card1Y}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 13,
              color: COLORS.ACCENT_BLUE,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            NRR lift
          </div>
          <AnimatedCounter
            from={0}
            to={400}
            startFrame={120}
            duration={45}
            suffix=" bps"
            color={COLORS.TEXT_PRIMARY}
            fontSize={68}
          />
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 15,
              color: COLORS.TEXT_MUTED,
              textAlign: "center",
            }}
          >
            on merchants using the Brain
            <br />
            vs. matched control
          </div>
        </div>

        {/* TAM leverage card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            padding: "36px 40px",
            borderRadius: 20,
            backgroundColor: COLORS.BG_CARD,
            border: `1px solid ${COLORS.ACCENT_PURPLE}`,
            minWidth: 280,
            opacity: card2Opacity,
            transform: `translateY(${card2Y}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 13,
              color: COLORS.ACCENT_PURPLE,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            TAM leverage
          </div>
          <AnimatedCounter
            from={1}
            to={10}
            startFrame={240}
            duration={45}
            prefix=""
            suffix="×"
            color={COLORS.TEXT_PRIMARY}
            fontSize={68}
          />
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 15,
              color: COLORS.TEXT_MUTED,
              textAlign: "center",
            }}
          >
            each TAM can serve
            <br />
            ten times more merchants
          </div>
        </div>

        {/* ARR card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            padding: "36px 40px",
            borderRadius: 20,
            backgroundColor: COLORS.BG_CARD,
            border: `1px solid ${COLORS.ACCENT_GREEN}`,
            minWidth: 280,
            opacity: card3Opacity,
            transform: `translateY(${card3Y}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 13,
              color: COLORS.ACCENT_GREEN,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Direct ARR ceiling
          </div>
          <AnimatedCounter
            from={0}
            to={14}
            startFrame={360}
            duration={45}
            prefix="$1."
            suffix="B"
            color={COLORS.TEXT_PRIMARY}
            fontSize={68}
          />
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 15,
              color: COLORS.TEXT_MUTED,
              textAlign: "center",
            }}
          >
            on direct SaaS alone
            <br />
            (~2–3M addressable merchants)
          </div>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 22,
          color: COLORS.TEXT_SECONDARY,
          textAlign: "center",
          opacity: closerOpacity,
          transform: `translateY(${closerY}px)`,
          maxWidth: 920,
          lineHeight: 1.5,
        }}
      >
        Plus channel partner revenue-share. Plus NRR lift on existing ARR.{" "}
        <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 700 }}>
          Three revenue streams at once.
        </span>
      </div>
    </AbsoluteFill>
  );
};
