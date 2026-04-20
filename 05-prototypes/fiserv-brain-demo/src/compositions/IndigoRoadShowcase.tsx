import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { PersonaCard } from "../components/PersonaCard";
import { Terminal } from "../components/Terminal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { fadeIn, scaleIn } from "../lib/animations";
import { COLORS } from "../lib/colors";
import { useVideoConfig } from "remotion";

/**
 * Showcase 1 — Indigo Road Apparel (Slice A value pilot)
 *
 * Narrative: Sarah (CTO) hits an Afterpay sandbox signature failure.
 * The Brain diagnoses it AND surfaces the Klarna → Afterpay memory-compounding lesson.
 *
 * Duration: 2040 frames (68s at 30fps)
 */

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_BLUE, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Showcase 1 · Slice A
      </div>
      <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.TEXT_PRIMARY, letterSpacing: -1, opacity: fadeIn(frame, 15, 25), transform: `scale(${0.9 + scaleIn(frame, fps, 15) * 0.1})`, fontFamily: "'SF Pro Display', sans-serif" }}>
        Indigo Road Apparel
      </div>
      <div style={{ fontSize: 22, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 40, 25), fontFamily: "'SF Pro Display', sans-serif" }}>
        Mid-market fashion · $180M GPV · CommerceHub + Shopify ISV
      </div>
    </AbsoluteFill>
  );
};

const ScenePersona: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 100 }}>
    <PersonaCard
      icon="👩‍💻"
      title="Sarah Chen, CTO"
      benefits="It's April 2026. Sarah is building the Afterpay BNPL integration. Her first sandbox test just failed with AFTERPAY_INVALID_SIGNATURE. She opens the Brain."
      accentColor={COLORS.ACCENT_BLUE}
      delay={10}
    />
  </AbsoluteFill>
);

const SceneTerminal: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30 }}>
    <div style={{ fontSize: 18, color: COLORS.TEXT_SECONDARY, fontFamily: "'SF Pro Display', sans-serif", maxWidth: 700, textAlign: "center" }}>
      Sarah to the Brain: <em>&ldquo;Sandbox test failed with AFTERPAY_INVALID_SIGNATURE. Also — what idempotency TTL should I use?&rdquo;</em>
    </div>
    <Terminal
      command="brain.diagnose --merchant indigo-road --txn txn_4722"
      startFrame={60}
      lines={[
        { text: "IntegrationAgent hydrating memory…", delay: 10, color: COLORS.TEXT_MUTED },
        { text: "✓ Found: commercehub.md HMAC SHA256 signing spec", delay: 25, color: COLORS.ACCENT_GREEN },
        { text: "Diagnosis: signing concat order wrong.", delay: 45, color: COLORS.TEXT_PRIMARY },
        { text: "  → must be: apiKey + clientRequestId + timestamp + rawPayload", delay: 60, color: COLORS.ACCENT_BLUE },
        { text: "  → reference: github.com/Fiserv/commercehub-api-examples", delay: 80, color: COLORS.TEXT_SECONDARY },
        { text: "", delay: 95 },
        { text: "⚡ Memory-compounded lesson surfaced:", delay: 105, color: COLORS.ACCENT_PURPLE },
        { text: "  Idempotency TTL = 35 days, not 30.", delay: 125, color: COLORS.TEXT_PRIMARY },
        { text: "  Source: Klarna webhook timeout, Sept 2025", delay: 145, color: COLORS.TEXT_MUTED },
        { text: "  That incident cost us $4K in duplicate orders.", delay: 165, color: COLORS.TEXT_MUTED },
        { text: "  Your project memory already has 35 locked in. ✓", delay: 185, color: COLORS.ACCENT_GREEN },
      ]}
    />
  </AbsoluteFill>
);

const SceneOutcome: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 28 }}>
      <div style={{ fontSize: 28, color: COLORS.TEXT_SECONDARY, opacity: fadeIn(frame, 5, 25), fontFamily: "'SF Pro Display', sans-serif" }}>
        Resolution time:
      </div>
      <AnimatedCounter from={120} to={4} startFrame={30} duration={60} suffix=" min" color={COLORS.ACCENT_GREEN} fontSize={96} />
      <div style={{ fontSize: 18, color: COLORS.TEXT_MUTED, textAlign: "center", maxWidth: 700, opacity: fadeIn(frame, 100, 30), fontFamily: "'SF Pro Display', sans-serif" }}>
        Previously: Sarah would file a Fiserv support ticket, wait 24–48 hours for a response,
        and re-learn the Klarna lesson from scratch when she added Afterpay. Now: zero re-learning.
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 14, color: COLORS.ACCENT_BLUE, letterSpacing: 2, textTransform: "uppercase", opacity: fadeIn(frame, 5, 20), fontFamily: "'SF Pro Display', sans-serif" }}>
        Slice A · The value pilot
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.TEXT_PRIMARY, textAlign: "center", maxWidth: 900, opacity: fadeIn(frame, 20, 30), fontFamily: "'SF Pro Display', sans-serif" }}>
        3 merchants. 120 days. +30% approval rate. −50% dispute handling time.
      </div>
    </AbsoluteFill>
  );
};

export const IndigoRoadShowcase: React.FC = () => {
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
