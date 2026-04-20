import { useCurrentFrame } from "remotion";
import { typewriterSlice, fadeIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

interface TerminalLine {
  text: string;
  color?: string;
  delay: number;
  typeSpeed?: number;
}

export const Terminal: React.FC<{
  command: string;
  lines: TerminalLine[];
  startFrame?: number;
}> = ({ command, lines, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const commandEnd = startFrame + command.length * 1.5;
  const visibleCommand = typewriterSlice(command, frame, startFrame, commandEnd);

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        borderRadius: 12,
        padding: 24,
        width: 700,
        border: "1px solid #30363d",
        opacity: fadeIn(frame, startFrame, 10),
      }}
    >
      {/* Title bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
      </div>

      {/* Command line */}
      <div style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 15, marginBottom: 12 }}>
        <span style={{ color: COLORS.ACCENT_GREEN }}>$ </span>
        <span style={{ color: COLORS.TEXT_PRIMARY }}>{visibleCommand}</span>
        {frame < commandEnd && (
          <span style={{ color: COLORS.ACCENT_GREEN, opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>_</span>
        )}
      </div>

      {/* Output lines */}
      {lines.map((line, i) => {
        const lineStart = commandEnd + line.delay;
        const lineOpacity = fadeIn(frame, lineStart, 8);
        if (frame < lineStart) return null;
        return (
          <div
            key={i}
            style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              fontSize: 14,
              color: line.color ?? COLORS.TEXT_SECONDARY,
              opacity: lineOpacity,
              marginBottom: 6,
            }}
          >
            <span style={{ color: COLORS.TEXT_MUTED }}>{">"} </span>
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
