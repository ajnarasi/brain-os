import { useCurrentFrame } from "remotion";
import { typewriterSlice } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const TypewriterText: React.FC<{
  text: string;
  startFrame?: number;
  endFrame: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
}> = ({
  text,
  startFrame = 0,
  endFrame,
  color = COLORS.TEXT_PRIMARY,
  fontSize = 36,
  fontWeight = 600,
  fontFamily = "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const visible = typewriterSlice(text, frame, startFrame, endFrame);

  return (
    <span
      style={{ fontFamily, fontSize, fontWeight, color }}
    >
      {visible}
      {frame >= startFrame && frame < endFrame && (
        <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: COLORS.ACCENT_BLUE }}>|</span>
      )}
    </span>
  );
};
