export type Mood = "calm" | "lazer" | "cool";

export interface ClippyRef {
  mood: Mood;
  makeLazer: () => void;
  makeCalm: () => void;
  makeCool: () => void;
}
