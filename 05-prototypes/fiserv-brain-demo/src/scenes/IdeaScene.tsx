import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 3 — The Idea. Jobs-style slow reveal.
 * Duration: 360 frames (12s at 30fps)
 *
 * ONE idea: introduce the Brain as a second brain for merchants.
 */
export const IdeaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const whatIf = fadeIn(frame, 10, 25);
  const question = fadeIn(frame, 60, 30);
  const questionY = slideUp(frame, 60, 30, 20);

  const concept = fadeIn(frame, 150, 35);
  const conceptY = slideUp(frame, 150, 35, 25);

  const reveal = fadeIn(frame, 240, 30);
  const revealScale = scaleIn(frame, fps, 240);

  const lineWidth = scaleIn(frame, fps, 280) * 280;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: "0 120px",
      }}
    >
      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 24,
          color: COLORS.TEXT_MUTED,
          letterSpacing: 1,
          opacity: whatIf,
        }}
      >
        What if...
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 46,
          fontWeight: 600,
          color: COLORS.TEXT_PRIMARY,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.25,
          letterSpacing: -0.5,
          opacity: question,
          transform: `translateY(${questionY}px)`,
        }}
      >
        ...every Fiserv merchant had a second brain?
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 22,
          color: COLORS.TEXT_SECONDARY,
          textAlign: "center",
          maxWidth: 880,
          lineHeight: 1.6,
          opacity: concept,
          transform: `translateY(${conceptY}px)`,
        }}
      >
        A brain that remembers every failure, every incident, every lesson &mdash;
        and learns from all of them. For every merchant. Forever.
      </div>

      <div
        style={{
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_PURPLE})`,
          borderRadius: 2,
          marginTop: 20,
          opacity: reveal,
        }}
      />

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 54,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          letterSpacing: -1,
          opacity: reveal,
          transform: `scale(${0.92 + revealScale * 0.08})`,
        }}
      >
        Introducing{" "}
        <span
          style={{
            background: `linear-gradient(90deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_PURPLE})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Fiserv Brain
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};
