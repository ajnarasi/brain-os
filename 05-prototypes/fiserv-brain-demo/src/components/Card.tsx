import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn, fadeIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const Card: React.FC<{
  icon: string;
  title: string;
  body: string;
  delay?: number;
  accentColor?: string;
  width?: number;
}> = ({ icon, title, body, delay = 0, accentColor = COLORS.ACCENT_BLUE, width = 280 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = scaleIn(frame, fps, delay);
  const opacity = fadeIn(frame, delay, 10);

  return (
    <div
      style={{
        width,
        backgroundColor: COLORS.BG_CARD,
        borderRadius: 16,
        padding: 28,
        border: `1px solid ${COLORS.BG_CARD_LIGHT}`,
        opacity,
        transform: `scale(${0.8 + scale * 0.2})`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 36 }}>{icon}</div>
      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: accentColor,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 15,
          color: COLORS.TEXT_SECONDARY,
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
    </div>
  );
};
