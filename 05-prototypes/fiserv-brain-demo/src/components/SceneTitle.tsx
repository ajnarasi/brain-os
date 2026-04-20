import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const SceneTitle: React.FC<{
  title: string;
  subtitle?: string;
  accentColor?: string;
}> = ({ title, subtitle, accentColor = COLORS.ACCENT_BLUE }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = scaleIn(frame, fps, 0);
  const opacity = fadeIn(frame, 0, 20);
  const yOffset = slideUp(frame, 0, 20);
  const underlineWidth = scaleIn(frame, fps, 8) * 80;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `translateY(${yOffset}px) scale(${0.8 + scale * 0.2})`,
      }}
    >
      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: underlineWidth,
          height: 3,
          backgroundColor: accentColor,
          borderRadius: 2,
        }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 22,
            color: COLORS.TEXT_SECONDARY,
            margin: 0,
            opacity: fadeIn(frame, 10, 15),
            transform: `translateY(${slideUp(frame, 10, 15)}px)`,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
