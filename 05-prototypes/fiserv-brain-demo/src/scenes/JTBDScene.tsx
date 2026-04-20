import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Scene 4 — What the Brain Actually Does.
 * Three lifecycle phases: Integrate, Go-Live, Operate.
 * Duration: 540 frames (18s at 30fps)
 *
 * ONE idea: three jobs, one brain.
 */
interface Phase {
  icon: string;
  title: string;
  line: string;
  stat: string;
  color: string;
  delay: number;
}

const PHASES: Phase[] = [
  {
    icon: "🛠️",
    title: "Integrate",
    line: "From contract signature to first production transaction.",
    stat: "40% faster time-to-live",
    color: COLORS.ACCENT_BLUE,
    delay: 120,
  },
  {
    icon: "🚀",
    title: "Go-Live",
    line: "Watches your first 72 hours. Catches issues before your customers do.",
    stat: "90%+ clean-launch rate",
    color: COLORS.ACCENT_PURPLE,
    delay: 240,
  },
  {
    icon: "📊",
    title: "Operate",
    line: "Deflects tickets. Drafts disputes. Narrates your week. Forever.",
    stat: "40–60% ticket deflection",
    color: COLORS.ACCENT_GREEN,
    delay: 360,
  },
];

export const JTBDScene: React.FC = () => {
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
        gap: 40,
        padding: "0 140px",
      }}
    >
      <h2
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Three jobs. One brain.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 36, width: "100%", maxWidth: 980 }}>
        {PHASES.map((phase) => {
          const cardOpacity = fadeIn(frame, phase.delay, 25);
          const cardY = slideUp(frame, phase.delay, 25, 35);
          return (
            <div
              key={phase.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                padding: 28,
                borderRadius: 16,
                backgroundColor: COLORS.BG_CARD,
                border: `1px solid ${phase.color}`,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  flexShrink: 0,
                  width: 96,
                  textAlign: "center",
                }}
              >
                {phase.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    color: phase.color,
                    letterSpacing: -0.5,
                  }}
                >
                  {phase.title}
                </div>
                <div
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: 20,
                    color: COLORS.TEXT_SECONDARY,
                    lineHeight: 1.45,
                  }}
                >
                  {phase.line}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.TEXT_PRIMARY,
                  backgroundColor: COLORS.BG_CARD_LIGHT,
                  padding: "10px 18px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                }}
              >
                {phase.stat}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
