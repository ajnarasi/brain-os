import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 1 — Title. Jobs-style reveal.
 * Duration: 120 frames (4s at 30fps)
 *
 * ONE idea: the name.
 */
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = scaleIn(frame, fps, 10);
  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 40);

  const subtitleOpacity = fadeIn(frame, 40, 25);
  const subtitleY = slideUp(frame, 40, 25, 30);

  const lineWidth = scaleIn(frame, fps, 50) * 260;

  const footerOpacity = fadeIn(frame, 70, 20);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <h1
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 96,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${0.85 + titleScale * 0.15})`,
          letterSpacing: -2,
        }}
      >
        Fiserv Brain
      </h1>

      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_PURPLE})`,
          borderRadius: 2,
        }}
      />

      <p
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 30,
          color: COLORS.TEXT_SECONDARY,
          margin: 0,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: -0.3,
        }}
      >
        A second brain for every merchant.
      </p>

      <p
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 14,
          color: COLORS.TEXT_MUTED,
          margin: 0,
          marginTop: 40,
          opacity: footerOpacity,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        A side-project pitch · April 2026
      </p>
    </AbsoluteFill>
  );
};
