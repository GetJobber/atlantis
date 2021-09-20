import { useMemo } from "react";
import calculateStrength from "zxcvbn";

export function usePasswordStrength(password: string, dictionary?: string[]) {
  const {
    guesses,
    score,
    feedback: { warning, suggestions },
    crack_times_display: { offline_fast_hashing_1e10_per_second: timeToCrack },
  } = useMemo(
    () => calculateStrength(password, dictionary),
    [password, dictionary],
  );
  return {
    guesses,
    score,
    warning,
    suggestions,
    timeToCrack,
  };
}
