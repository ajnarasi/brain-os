import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { PersonaCard } from "../components/PersonaCard";
import { Terminal } from "../components/Terminal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";

/**
 * Showcase 3 — NorthGate QSR Holdings (Slice D strategic prize)
 *
 * Narrative: 08:15 CT Tuesday. Dana gets coffee. Brain has detected a P1 cluster at
 * fuel-attached SE Georgia Arby's on Buypass. Uses 2-message pattern (tight alert + expansion).
 *
 * Duration: 2820 frames (94s at 30fps)
 *
 * THIS IS THE HEADLINE SHOWCASE. Multi-back-end reconciliation. Zero autonomous action.
 */

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_AMBER, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Showcase 3 · Slice D · The Prize
      </div>
      <div style={{ fontSize: 58, fontWeight: 800, color: COLORS.TEXT_PRIMARY, letterSpacing: -1, opacity: fadeIn(frame, 15, 25), transform: `scale(${0.9 + scaleIn(frame, fps, 15) * 0.1})`, fontFamily: "'SF Pro Display', sans-serif", textAlign: "center" }}>
        NorthGate QSR Holdings
      </div>
      <div style={{ fontSize: 20, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 40, 25), fontFamily: "'SF Pro Display', sans-serif", textAlign: "center", maxWidth: 900 }}>
        67 locations · 3 brands under Inspire Brands · $340M GPV · IPG + Nashville + Buypass + STAR/NYCE + ValueLink + TeleCheck
      </div>
    </AbsoluteFill>
  );
};

const ScenePersona: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 100 }}>
    <PersonaCard
      icon="📊"
      title="Dana Okafor, Corporate Payments PM"
      benefits="08:15 CT Tuesday morning. Dana gets her coffee in the Nashville HQ. Her phone buzzes. The Brain has detected something while she was offline."
      accentColor={COLORS.ACCENT_AMBER}
      delay={10}
    />
  </AbsoluteFill>
);

const SceneTerminalAlert: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
    <div style={{ fontSize: 16, color: COLORS.ACCENT_RED, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'SF Pro Display', sans-serif", fontWeight: 700 }}>
      Proactive alert · No merchant prompt required
    </div>
    <Terminal
      command="brain.alert --merchant northgate-qsr --severity P1"
      startFrame={30}
      lines={[
        { text: "🚨 P1 — SE Georgia Arby's fuel-side decline cluster", delay: 10, color: COLORS.ACCENT_RED },
        { text: "", delay: 25 },
        { text: "3 of 4 fuel-attached Arby's declining on fuel side:", delay: 35, color: COLORS.TEXT_PRIMARY },
        { text: "  • Valdosta GA  07:42 CT  Buypass host timeout", delay: 55, color: COLORS.TEXT_SECONDARY },
        { text: "  • Dublin GA    07:55 CT  EMV kernel mismatch", delay: 75, color: COLORS.TEXT_SECONDARY },
        { text: "  • Macon GA     08:03 CT  Buypass host timeout", delay: 95, color: COLORS.TEXT_SECONDARY },
        { text: "", delay: 115 },
        { text: "Cordele GA is clean. That's the signal.", delay: 125, color: COLORS.ACCENT_BLUE },
        { text: "Back-end: Buypass only. Nashville (QSR side) healthy at 98.3%.", delay: 145, color: COLORS.TEXT_MUTED },
        { text: "", delay: 165 },
        { text: "Hypothesis: Buypass overnight firmware rollout (SE wave).", delay: 175, color: COLORS.ACCENT_PURPLE },
        { text: "Matches incidents.md#fuel-firmware-oct-2025 precedent exactly.", delay: 195, color: COLORS.TEXT_SECONDARY },
        { text: "", delay: 215 },
        { text: "Recommended: contact Chris Nguyen (Fiserv Corp TAM).", delay: 225, color: COLORS.ACCENT_GREEN },
        { text: "NOT recommending: any NorthGate-side action.", delay: 245, color: COLORS.ACCENT_RED },
        { text: "You have no levers here. This is Buypass-side.", delay: 265, color: COLORS.TEXT_MUTED },
        { text: "", delay: 285 },
        { text: "[ Draft the Slack to Chris? ]", delay: 295, color: COLORS.ACCENT_AMBER },
      ]}
    />
  </AbsoluteFill>
);

const SceneTerminalSlack: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
    <div style={{ fontSize: 18, color: COLORS.TEXT_SECONDARY, fontFamily: "'SF Pro Display', sans-serif" }}>
      Dana: <em>&ldquo;Draft the Slack.&rdquo;</em>
    </div>
    <Terminal
      command="brain.compose --channel slack --to chris-nguyen"
      startFrame={30}
      lines={[
        { text: "Drafting concise Slack message…", delay: 10, color: COLORS.TEXT_MUTED },
        { text: "", delay: 25 },
        { text: "Chris — quick ask.", delay: 35, color: COLORS.TEXT_PRIMARY },
        { text: "Starting 07:42 CT, fuel-side decline spikes at 3 of our", delay: 55, color: COLORS.TEXT_PRIMARY },
        { text: "4 fuel-attached Arby's in SE Georgia — Valdosta (09),", delay: 75, color: COLORS.TEXT_PRIMARY },
        { text: "Dublin (31), Macon (17). Cordele (44) clean.", delay: 95, color: COLORS.TEXT_PRIMARY },
        { text: "All 3 Buypass-side. Nashville (QSR) healthy.", delay: 115, color: COLORS.TEXT_PRIMARY },
        { text: "Signature matches Oct 14, 2025 incident — overnight", delay: 135, color: COLORS.TEXT_PRIMARY },
        { text: "Buypass pump firmware rollout in a regional wave.", delay: 155, color: COLORS.TEXT_PRIMARY },
        { text: "Can you confirm firmware window and ask Buypass", delay: 175, color: COLORS.TEXT_PRIMARY },
        { text: "ops to check pump re-sync? No action from our side.", delay: 195, color: COLORS.TEXT_PRIMARY },
        { text: "Thanks — Dana", delay: 215, color: COLORS.TEXT_PRIMARY },
        { text: "", delay: 235 },
        { text: "[ ✅ Send ] [ ✏️ Edit ]", delay: 245, color: COLORS.ACCENT_GREEN },
      ]}
    />
  </AbsoluteFill>
);

const SceneOutcome: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30 }}>
      <div style={{ fontSize: 30, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 5, 25), fontFamily: "'SF Pro Display', sans-serif", textAlign: "center" }}>
        Time from detection to Chris pinged:
      </div>
      <AnimatedCounter from={0} to={60} startFrame={30} duration={50} prefix="< " suffix="s" color={COLORS.ACCENT_AMBER} fontSize={120} />
      <div style={{ display: "flex", gap: 40, marginTop: 24, opacity: fadeIn(frame, 90, 30) }}>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <div style={{ fontSize: 14, color: COLORS.TEXT_MUTED, letterSpacing: 1, textTransform: "uppercase" }}>Locations clustered</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.ACCENT_BLUE }}>3 of 4</div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <div style={{ fontSize: 14, color: COLORS.TEXT_MUTED, letterSpacing: 1, textTransform: "uppercase" }}>Back-ends reconciled</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.ACCENT_PURPLE }}>5</div>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'SF Pro Display', sans-serif" }}>
          <div style={{ fontSize: 14, color: COLORS.TEXT_MUTED, letterSpacing: 1, textTransform: "uppercase" }}>Autonomous actions</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.ACCENT_GREEN }}>0</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 22 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_AMBER, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Slice D · The V2 strategic prize
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.TEXT_PRIMARY, textAlign: "center", maxWidth: 920, opacity: fadeIn(frame, 20, 30), transform: `translateY(${slideUp(frame, 20, 30, 20)}px)`, fontFamily: "'SF Pro Display', sans-serif", lineHeight: 1.35 }}>
        One brand under Inspire Brands or Yum!. IPG + Nashville + Buypass.
        <br />
        Narrative + leverage. Never actor.
      </div>
      <div style={{ fontSize: 18, color: COLORS.TEXT_MUTED, textAlign: "center", opacity: fadeIn(frame, 65, 30), fontFamily: "'SF Pro Display', sans-serif" }}>
        The largest single revenue line in Fiserv&apos;s book.
      </div>
    </AbsoluteFill>
  );
};

export const NorthGateShowcase: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={240}>
        <SceneIntro />
      </Sequence>
      <Sequence from={240} durationInFrames={360}>
        <ScenePersona />
      </Sequence>
      <Sequence from={600} durationInFrames={1020}>
        <SceneTerminalAlert />
      </Sequence>
      <Sequence from={1620} durationInFrames={780}>
        <SceneTerminalSlack />
      </Sequence>
      <Sequence from={2400} durationInFrames={300}>
        <SceneOutcome />
      </Sequence>
      <Sequence from={2700} durationInFrames={240}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
