import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";
import { AnimatedCounter } from "../components/AnimatedCounter";

/**
 * Scene 8 — External value to merchants.
 * Four counter stats.
 * Duration: 900 frames (30s at 30fps)
 *
 * ONE idea: merchants get a clean, measurable win on 4 dimensions.
 */
interface Stat {
  label: string;
  from: number;
  to: number;
  prefix: string;
  suffix: string;
  color: string;
  sub: string;
  delay: number;
}

const STATS: Stat[] = [
  {
    label: "TIME TO FIRST TXN",
    from: 0,
    to: 40,
    prefix: "−",
    suffix: "%",
    color: COLORS.ACCENT_BLUE,
    sub: "integration acceleration",
    delay: 100,
  },
  {
    label: "INTEGRATION TICKETS",
    from: 0,
    to: 25,
    prefix: "−",
    suffix: "%",
    color: COLORS.ACCENT_PURPLE,
    sub: "during build + cert",
    delay: 260,
  },
  {
    label: "SUPPORT DEFLECTION",
    from: 0,
    to: 60,
    prefix: "",
    suffix: "%",
    color: COLORS.ACCENT_GREEN,
    sub: "operate phase, tier-1 tickets",
    delay: 420,
  },
  {
    label: "NPS AT 6 MONTHS",
    from: 0,
    to: 52,
    prefix: "",
    suffix: "",
    color: COLORS.ACCENT_AMBER,
    sub: "measured post-launch",
    delay: 580,
  },
];

export const TimeReductionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 30);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 52,
        padding: "0 140px",
      }}
    >
      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        What&apos;s in it for merchants?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          width: "100%",
          maxWidth: 980,
        }}
      >
        {STATS.map((stat) => {
          const opacity = fadeIn(frame, stat.delay, 25);
          const y = slideUp(frame, stat.delay, 25, 40);
          return (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "32px 28px",
                borderRadius: 16,
                backgroundColor: COLORS.BG_CARD,
                border: `1px solid ${stat.color}`,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 12,
                  color: stat.color,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                }}
              >
                {stat.label}
              </div>
              <AnimatedCounter
                from={stat.from}
                to={stat.to}
                startFrame={stat.delay + 20}
                duration={45}
                prefix={stat.prefix}
                suffix={stat.suffix}
                color={COLORS.TEXT_PRIMARY}
                fontSize={72}
              />
              <div
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 15,
                  color: COLORS.TEXT_MUTED,
                  textAlign: "center",
                }}
              >
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
