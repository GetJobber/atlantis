import { showToast } from "@jobber/components";
import { useEffect } from "react";

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
