import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";
import { COLORS } from "../lib/colors";
import { PersonaCard } from "../components/PersonaCard";

/**
 * Scene 5 — The 3 synthetic merchants.
 * Duration: 900 frames (30s at 30fps)
 *
 * ONE idea: three very different merchants, three very different brains, one architecture.
 */
export const PersonaBenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 10, 25);
  const titleY = slideUp(frame, 10, 25, 30);
  const footerOpacity = fadeIn(frame, 780, 40);

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
          fontSize: 46,
          fontWeight: 800,
          color: COLORS.TEXT_PRIMARY,
          margin: 0,
          textAlign: "center",
          letterSpacing: -1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Three merchants. Three very different brains.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", maxWidth: 1000 }}>
        <PersonaCard
          icon="👗"
          title="Indigo Road Apparel"
          benefits="Mid-market fashion brand. $180M GPV. 32 stores. Omnichannel + D2C + wholesale. CommerceHub + Shopify ISV + Nashville. Slice A — the value pilot."
          accentColor={COLORS.ACCENT_BLUE}
          delay={80}
        />
        <PersonaCard
          icon="🌮"
          title="Casa Rosa Taqueria"
          benefits="Clover-native SMB restaurant. 3 locations in Austin. Owner-operated by Maria. Clover App Market + Nashville. Slice B — the distribution pilot."
          accentColor={COLORS.ACCENT_GREEN}
          delay={260}
        />
        <PersonaCard
          icon="🍔"
          title="NorthGate QSR Holdings"
          benefits="47 Arby's, 12 Buffalo Wild Wings, 8 Jimmy John's. $340M GPV. IPG + Nashville + Buypass + STAR/NYCE + ValueLink. Slice D — the V2 strategic prize."
          accentColor={COLORS.ACCENT_AMBER}
          delay={440}
        />
      </div>

      <div
        style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 14,
          color: COLORS.TEXT_MUTED,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginTop: 16,
          opacity: footerOpacity,
        }}
      >
        Synthetic personas · inspired by public patterns · not real Fiserv customers
      </div>
    </AbsoluteFill>
  );
};
