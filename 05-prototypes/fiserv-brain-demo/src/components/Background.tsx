import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../lib/colors";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: { x: number; y: number; delay: number }[] = [];

  for (let row = 0; row < 18; row++) {
    for (let col = 0; col < 32; col++) {
      dots.push({ x: col * 42 + 10, y: row * 42 + 10, delay: (row + col) * 0.5 });
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_PRIMARY }}>
      {dots.map((dot, i) => {
        const pulse = Math.sin((frame + dot.delay * 10) * 0.03) * 0.3 + 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: 2,
              height: 2,
              borderRadius: "50%",
              backgroundColor: COLORS.DOT_GRID,
              opacity: pulse,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
