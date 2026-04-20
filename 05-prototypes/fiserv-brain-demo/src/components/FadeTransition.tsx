import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../lib/animations";

export const FadeTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}> = ({ children, durationInFrames, fadeInDuration = 15, fadeOutDuration = 15 }) => {
  const frame = useCurrentFrame();
  const inOpacity = fadeIn(frame, 0, fadeInDuration);
  const outOpacity = fadeOut(frame, durationInFrames - fadeOutDuration, fadeOutDuration);
  const opacity = Math.min(inOpacity, outOpacity);

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};
