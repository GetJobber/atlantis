import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useState } from "react";

// For retheme purposes only.

// This will be removed once the retheme is out of the experiment.
export function useAtlantisConfig() {
  const [JOBBER_RETHEME, setJOBBER_RETHEME] = useState(false);

  useSafeLayoutEffect(() => {
    setJOBBER_RETHEME(document.body.classList.contains("jobber-retheme"));
  }, []);

  return { JOBBER_RETHEME };
}
