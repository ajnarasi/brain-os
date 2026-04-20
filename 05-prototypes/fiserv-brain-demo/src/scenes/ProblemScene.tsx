import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 2 — The Problem. Anchored to the Sept 2025 Payeezy→Clover class action.
 * Duration: 540 frames (18s at 30fps)
 *
 * ONE idea: Fiserv has a retention problem, and it's been documented publicly.
 */
export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const kickerOpacity = fadeIn(frame, 10, 20);
  const kickerY = slideUp(frame, 10, 20, 25);

  const headlineOpacity = fadeIn(frame, 40, 25);
  const headlineY = slideUp(frame, 40, 25, 30);

  const factOpacity = fadeIn(frame, 110, 30);
  const factY = slideUp(frame, 110, 30, 35);

  const statOpacity = fadeIn(frame, 200, 30);
  const statScale = fadeIn(frame, 200, 30);

  const punchlineOpacity = fadeIn(frame, 310, 30);
  const punchlineY = slideUp(frame, 310, 30, 25);

  const threeLineOpacity = fadeIn(frame, 400, 40);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 140px",
        gap: 36,
      }}
    >
      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 16,
          color: COLORS.ACCENT_RED,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: kickerOpacity,
          transform: `translateY(${kickerY}px)`,
        }}
      >
        September 2025
      </div>

      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          textAlign: "center",
          letterSpacing: -1,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          lineHeight: 1.1,
        }}
      >
        Fiserv has a retention problem.
      </h2>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 22,
          color: COLORS.TEXT_SECONDARY,
          textAlign: "center",
          maxWidth: 920,
          lineHeight: 1.5,
          opacity: factOpacity,
          transform: `translateY(${factY}px)`,
        }}
      >
        A securities class action alleged that Fiserv forcibly migrated roughly
        <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 700 }}> 200,000 Payeezy merchants </span>
        to Clover and concealed churn to Square and Toast.
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 18,
          opacity: statOpacity,
          transform: `scale(${0.92 + statScale * 0.08})`,
        }}
      >
        <span
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 84,
            fontWeight: 800,
            color: COLORS.ACCENT_RED,
            letterSpacing: -2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          −18.5%
        </span>
        <span
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 22,
            color: COLORS.TEXT_SECONDARY,
          }}
        >
          stock drop in a single day · April 24, 2025
        </span>
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.TEXT_PRIMARY,
          opacity: punchlineOpacity,
          transform: `translateY(${punchlineY}px)`,
          marginTop: 12,
        }}
      >
        The problem isn&apos;t pricing. It&apos;s friction.
      </div>

      <div
        style={{
          display: "flex",
          gap: 48,
          marginTop: 20,
          opacity: threeLineOpacity,
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 17,
          color: COLORS.TEXT_MUTED,
        }}
      >
        <span>Every integration re-learns the same lessons.</span>
        <span>·</span>
        <span>Launches go blind for 72 hours.</span>
        <span>·</span>
        <span>Every question becomes a ticket.</span>
      </div>
    </AbsoluteFill>
  );
};
