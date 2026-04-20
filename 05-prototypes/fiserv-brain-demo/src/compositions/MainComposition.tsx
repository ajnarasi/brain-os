import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "../components/Background";
import { TitleScene } from "../scenes/TitleScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { IdeaScene } from "../scenes/IdeaScene";
import { JTBDScene } from "../scenes/JTBDScene";
import { PersonaBenefitsScene } from "../scenes/PersonaBenefitsScene";
import { SelfEnhancementScene } from "../scenes/SelfEnhancementScene";
import { SolutionScene } from "../scenes/SolutionScene";
import { TimeReductionScene } from "../scenes/TimeReductionScene";
import { OutroScene } from "../scenes/OutroScene";

/**
 * Fiserv Brain — Main pitch composition.
 *
 * Nine scenes. ~3 minutes total (5460 frames at 30fps).
 * Jobs-style keynote discipline: one idea per scene, specific numbers, slow reveals.
 *
 * Scene order answers the 7 topics in the user's brief:
 *   1. TitleScene          → "Fiserv Brain"
 *   2. ProblemScene        → retention problem (Sept 2025 class action anchor)
 *   3. IdeaScene           → "A second brain for every merchant" — the reveal
 *   4. JTBDScene           → What the brain actually does (3 lifecycle phases)
 *   5. PersonaBenefitsScene → Who the merchants are (3 synthetic personas)
 *   6. SelfEnhancementScene → How the brain gets smarter (Klarna → Afterpay story)
 *   7. SolutionScene       → Internal value to Fiserv (NRR, TAM leverage, ARR)
 *   8. TimeReductionScene  → External value to merchants (4 KPI counters)
 *   9. OutroScene          → CTA: Slice A, Slice B, Slice D
 */
export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />

      <Sequence from={0} durationInFrames={120}>
        <TitleScene />
      </Sequence>

      <Sequence from={120} durationInFrames={540}>
        <ProblemScene />
      </Sequence>

      <Sequence from={660} durationInFrames={360}>
        <IdeaScene />
      </Sequence>

      <Sequence from={1020} durationInFrames={540}>
        <JTBDScene />
      </Sequence>

      <Sequence from={1560} durationInFrames={900}>
        <PersonaBenefitsScene />
      </Sequence>

      <Sequence from={2460} durationInFrames={600}>
        <SelfEnhancementScene />
      </Sequence>

      <Sequence from={3060} durationInFrames={660}>
        <SolutionScene />
      </Sequence>

      <Sequence from={3720} durationInFrames={900}>
        <TimeReductionScene />
      </Sequence>

      <Sequence from={4620} durationInFrames={600}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
