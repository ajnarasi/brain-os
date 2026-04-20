import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn, fadeIn, slideIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const ChecklistItem: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeIn(frame, delay, 10);
  const xOffset = slideIn(frame, delay, 12, 40);
  const checkScale = scaleIn(frame, fps, delay + 6);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
        transform: `translateX(${xOffset}px)`,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: COLORS.ACCENT_GREEN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${checkScale})`,
          fontSize: 14,
          color: "white",
          fontWeight: 700,
        }}
      >
        {"\u2713"}
      </div>
      <span
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 18,
          color: COLORS.TEXT_PRIMARY,
        }}
      >
        {text}
      </span>
    </div>
  );
};
