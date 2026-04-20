import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn, fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const PersonaCard: React.FC<{
  icon: string;
  title: string;
  benefits: string;
  accentColor: string;
  delay?: number;
}> = ({ icon, title, benefits, accentColor, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = scaleIn(frame, fps, delay);
  const opacity = fadeIn(frame, delay, 15);
  const yOffset = slideUp(frame, delay, 15, 50);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        opacity,
        transform: `translateY(${yOffset}px) scale(${0.9 + scale * 0.1})`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
          backgroundColor: COLORS.BG_CARD,
          border: `2px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: accentColor,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 18,
            color: COLORS.TEXT_SECONDARY,
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          {benefits}
        </div>
      </div>
    </div>
  );
};
