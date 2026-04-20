import { useCurrentFrame } from "remotion";
import { counterValue } from "../lib/animations";
import { COLORS } from "../lib/colors";

export const AnimatedCounter: React.FC<{
  from?: number;
  to: number;
  startFrame?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: number;
}> = ({
  from = 0,
  to,
  startFrame = 0,
  duration = 30,
  prefix = "",
  suffix = "",
  color = COLORS.TEXT_PRIMARY,
  fontSize = 72,
}) => {
  const frame = useCurrentFrame();
  const value = counterValue(frame, startFrame, duration, from, to);

  return (
    <span
      style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize,
        fontWeight: 800,
        color,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix}{value}{suffix}
    </span>
  );
};
