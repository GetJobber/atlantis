import { useEffect } from "react";
import prism from "prismjs";

/**
 * This is to forcibly remove all 'language-tsx' usages on the page and replace them with 'language-javascript'
 *
 * This is for prism, to get proper styling in place.
 *
 * @returns {updateStyles}
 */
export const useStyleUpdater = () => {
  const updateStyles = () => {
    // Tabs fires this update before updating its own DOM.
    requestAnimationFrame(() => {
      const pres = document.querySelectorAll(".root-pre");
      pres.forEach(p => {
        p.classList.remove("language-tsx");
        p.classList.add("language-javascript");
      });
      const code = document.querySelectorAll(".root-code");
      code.forEach(p => {
        p.classList.remove("language-tsx");
        p.classList.add("language-javascript");
      });
      prism.highlightAll();
    });
  };

  useEffect(() => {
    updateStyles();
  }, []);

  return { updateStyles };
};
