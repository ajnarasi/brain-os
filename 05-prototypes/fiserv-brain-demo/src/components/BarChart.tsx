import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

interface Bar {
  label: string;
  value: number;
  displayValue: string;
  color: string;
}

export const BarChart: React.FC<{
  bars: Bar[];
  maxValue: number;
  delay?: number;
  height?: number;
}> = ({ bars, maxValue, delay = 0, height = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 60,
        height,
        opacity: fadeIn(frame, delay, 15),
      }}
    >
      {bars.map((bar, i) => {
        const grow = scaleIn(frame, fps, delay + i * 10);
        const barHeight = (bar.value / maxValue) * (height - 60) * grow;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: bar.color,
                opacity: fadeIn(frame, delay + i * 10 + 15, 10),
              }}
            >
              {bar.displayValue}
            </span>
            <div
              style={{
                width: 100,
                height: barHeight,
                backgroundColor: bar.color,
                borderRadius: 8,
                minHeight: 4,
              }}
            />
            <span
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 16,
                color: COLORS.TEXT_SECONDARY,
                textAlign: "center",
              }}
            >
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
