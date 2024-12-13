import { useEffect } from "react";
import prism from "prismjs";

// STODO: This was a workaround hack to get syntax highlighting in documentation code examples functional and keep moving.
// Now that we have some breathing room, is there a better way to do this?
// Essentially prismjs wasn't highlighting the code properly because it was being rendered as TSX (which it is)
// So I forcibly removed the TSX class and replaced it with JS.
// Can we just get prism to style TSX properly instead?

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
