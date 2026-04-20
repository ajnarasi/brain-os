import { interpolate, spring } from "remotion";

const CLAMP = { extrapolateRight: "clamp" as const, extrapolateLeft: "clamp" as const };

export const fadeIn = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], CLAMP);

export const fadeOut = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [1, 0], CLAMP);

export const slideUp = (frame: number, start: number, duration: number, distance = 40) =>
  interpolate(frame, [start, start + duration], [distance, 0], CLAMP);

export const slideIn = (frame: number, start: number, duration: number, distance = 60) =>
  interpolate(frame, [start, start + duration], [distance, 0], CLAMP);

export const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay });

export const typewriterSlice = (text: string, frame: number, start: number, end: number) => {
  const charCount = Math.floor(
    interpolate(frame, [start, end], [0, text.length], CLAMP)
  );
  return text.slice(0, charCount);
};

export const counterValue = (
  frame: number,
  start: number,
  duration: number,
  from: number,
  to: number
) => Math.round(interpolate(frame, [start, start + duration], [from, to], CLAMP));
