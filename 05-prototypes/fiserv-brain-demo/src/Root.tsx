import "./index.css";
import { Composition } from "remotion";
import { MainComposition } from "./compositions/MainComposition";
import { IndigoRoadShowcase } from "./compositions/IndigoRoadShowcase";
import { CasaRosaShowcase } from "./compositions/CasaRosaShowcase";
import { NorthGateShowcase } from "./compositions/NorthGateShowcase";

/**
 * Fiserv Brain — Remotion composition registry.
 *
 * Four compositions register here:
 *   1. FiservBrainMain     — the main ~3-minute pitch video (9 scenes)
 *   2. IndigoRoadShowcase  — Slice A merchant demo (68s)
 *   3. CasaRosaShowcase    — Slice B merchant demo (68s)
 *   4. NorthGateShowcase   — Slice D merchant demo (98s, headline)
 *
 * All compositions: 1920×1080 at 30fps, dark pitch-deck palette.
 *
 * Open Remotion Studio with `npm run dev` and select any composition
 * from the left panel to preview.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main pitch video — 9 scenes, ~3 minutes */}
      <Composition
        id="FiservBrainMain"
        component={MainComposition}
        durationInFrames={5220}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Showcase 1 — Indigo Road (Slice A) */}
      <Composition
        id="IndigoRoadShowcase"
        component={IndigoRoadShowcase}
        durationInFrames={2040}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Showcase 2 — Casa Rosa (Slice B) */}
      <Composition
        id="CasaRosaShowcase"
        component={CasaRosaShowcase}
        durationInFrames={2040}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Showcase 3 — NorthGate QSR (Slice D, headline) */}
      <Composition
        id="NorthGateShowcase"
        component={NorthGateShowcase}
        durationInFrames={2940}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
