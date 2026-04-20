import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PersonaCard } from "../components/PersonaCard";
import { Terminal } from "../components/Terminal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { fadeIn, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Showcase 2 — Casa Rosa Taqueria (Slice B distribution pilot)
 *
 * Narrative: It's 22:35 CT Tuesday. Maria just closed the register.
 * She types 3 words: "close me out." Brain delivers unified daily close + dispute draft.
 *
 * Duration: 2040 frames (68s at 30fps)
 */

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_GREEN, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Showcase 2 · Slice B
      </div>
      <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.TEXT_PRIMARY, letterSpacing: -1, opacity: fadeIn(frame, 15, 25), transform: `scale(${0.9 + scaleIn(frame, fps, 15) * 0.1})`, fontFamily: "'SF Pro Display', sans-serif" }}>
        Casa Rosa Taqueria
      </div>
      <div style={{ fontSize: 22, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 40, 25), fontFamily: "'SF Pro Display', sans-serif" }}>
        Clover SMB · 3 locations in Austin · Owner-operated
      </div>
    </AbsoluteFill>
  );
};

const ScenePersona: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 100 }}>
    <PersonaCard
      icon="🌮"
      title="Maria Delgado, Owner"
      benefits="It's 22:35 CT Tuesday night. Maria just closed the East Austin register. She opens the Clover app, taps 'Brain,' and types three words."
      accentColor={COLORS.ACCENT_GREEN}
      delay={10}
    />
  </AbsoluteFill>
);

const SceneTerminal: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30 }}>
    <div style={{ fontSize: 18, color: COLORS.TEXT_SECONDARY, fontFamily: "'SF Pro Display', sans-serif", maxWidth: 700, textAlign: "center" }}>
      Maria: <em>&ldquo;close me out&rdquo;</em>
    </div>
    <Terminal
      command="brain.close --merchant casa-rosa --date today"
      startFrame={45}
      lines={[
        { text: "AnalyticsAgent hydrating memory…", delay: 10, color: COLORS.TEXT_MUTED },
        { text: "Today: $474.33 across 10 transactions. Tips $59.64.", delay: 25, color: COLORS.TEXT_PRIMARY },
        { text: "", delay: 45 },
        { text: "By location (per-location rule enforced):", delay: 55, color: COLORS.ACCENT_BLUE },
        { text: "  East Austin: $150.75 / $19.58 tips (4 txns)", delay: 70, color: COLORS.TEXT_SECONDARY },
        { text: "  South Congress: $263.11 / $33.21 tips (3 txns) — 18% tip avg ↑", delay: 90, color: COLORS.TEXT_SECONDARY },
        { text: "  North Loop: $60.47 / $6.85 tips (3 txns)", delay: 110, color: COLORS.TEXT_SECONDARY },
        { text: "", delay: 130 },
        { text: "⚠ DoorDash dispute ($42.30) received 09:15.", delay: 140, color: COLORS.ACCENT_AMBER },
        { text: "  → DisputeAgent pre-drafted response.", delay: 160, color: COLORS.ACCENT_PURPLE },
        { text: "  → GPS pickup 19:24 + GPS delivery 19:41 captured.", delay: 180, color: COLORS.ACCENT_GREEN },
        { text: "  → Template win rate: 100% (6/6) with GPS data.", delay: 200, color: COLORS.ACCENT_GREEN },
        { text: "", delay: 220 },
        { text: "Luis handled the morning PIN-pad reboot at 07:04. ✓", delay: 230, color: COLORS.TEXT_MUTED },
        { text: "Tomorrow's forecast: $4,100–$4,500. Weather clear.", delay: 245, color: COLORS.TEXT_MUTED },
        { text: "", delay: 260 },
        { text: "[ Approve dispute draft? ]", delay: 270, color: COLORS.ACCENT_AMBER },
      ]}
    />
  </AbsoluteFill>
);

const SceneOutcome: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 28 }}>
      <div style={{ fontSize: 28, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 5, 25), fontFamily: "'SF Pro Display', sans-serif" }}>
        Maria&apos;s one-tap workflow:
      </div>
      <div style={{ display: "flex", gap: 48, opacity: fadeIn(frame, 30, 30) }}>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <AnimatedCounter from={0} to={180} startFrame={40} duration={45} suffix="s" color={COLORS.ACCENT_GREEN} fontSize={72} />
          <div style={{ fontSize: 15, color: COLORS.TEXT_MUTED, marginTop: 6 }}>to read the close</div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <AnimatedCounter from={0} to={1} startFrame={40} duration={45} suffix=" tap" color={COLORS.ACCENT_BLUE} fontSize={72} />
          <div style={{ fontSize: 15, color: COLORS.TEXT_MUTED, marginTop: 6 }}>to approve the dispute draft</div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <AnimatedCounter from={0} to={0} startFrame={40} duration={45} color={COLORS.ACCENT_PURPLE} fontSize={72} />
          <div style={{ fontSize: 15, color: COLORS.TEXT_MUTED, marginTop: 6 }}>support tickets filed</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_GREEN, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Slice B · The distribution pilot
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.TEXT_PRIMARY, textAlign: "center", maxWidth: 900, opacity: fadeIn(frame, 20, 30), fontFamily: "'SF Pro Display', sans-serif" }}>
        25 merchants. 90 days. 40% ticket deflection. NPS ≥50.
      </div>
      <div style={{ fontSize: 18, color: COLORS.TEXT_MUTED, textAlign: "center", opacity: fadeIn(frame, 55, 25), fontFamily: "'SF Pro Display', sans-serif" }}>
        Shipped via Clover App Market. Zero CAC.
      </div>
    </AbsoluteFill>
  );
};

export const CasaRosaShowcase: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={240}>
        <SceneIntro />
      </Sequence>
      <Sequence from={240} durationInFrames={360}>
        <ScenePersona />
      </Sequence>
      <Sequence from={600} durationInFrames={960}>
        <SceneTerminal />
      </Sequence>
      <Sequence from={1560} durationInFrames={300}>
        <SceneOutcome />
      </Sequence>
      <Sequence from={1860} durationInFrames={180}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
