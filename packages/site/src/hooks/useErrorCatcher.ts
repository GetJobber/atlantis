import { showToast } from "@jobber/components";
import { useEffect } from "react";

// STODO: Let's implement this properly.
// We're still hiding a lot of console errors in the terminal and I think them popping up all ugly in the UI means we'll notice them sooner.

/**
 * Attempts to catch all errors and toss them up as toasts.
 */
export const useErrorCatcher = () => {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.type === "error" && e.message) {
        showToast({ message: e.message });
        e.preventDefault();
      }
    };
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  });
};
