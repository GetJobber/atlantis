import { EditorView } from "@codemirror/view";

export const useAtlantisPreviewCodeTheme = () => {
  const atlantisPreviewCodeTheme = EditorView.theme(
    {
      "&": {
        color: "var(--color-text)",
        backgroundColor: "var(--color-surface--background)",
        border: "var(--border-base) solid var(--color-border)",
        borderRadius: "var(--radius-base)",
        padding: "var(--space-small)",
      },
      ".ͼi": {
        color: "var(--color-interactive)",
      },
      ".ͼe": {
        color: "var(--color-critical)",
      },
      ".ͼl": {
        color: "var(--color-invoice)",
      },
      ".ͼb": {
        color: "var(--color-quote)",
      },
      ".ͼg": {
        color: "var(--color-task)",
      },
      ".ͼd": {
        color: "var(--color-informative)",
      },
      ".ͼc": {
        color: "var(--color-informative)",
      },
      ".cm-content": {
        caretColor: "var(--color-interactive)",
      },
      ".cm-type": {
        color: "var(--color-text)",
      },
      "&.cm-focused": {
        outline: "transparent",
        boxShadow: "var(--shadow-focus)",
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "var(--color-surface)",
      },
      ".cm-gutters": {
        backgroundColor: "inherit",
        color: "var(--color-text--secondary)",
        border: "none",
      },
    },
    { dark: true },
  );

  return { atlantisPreviewCodeTheme };
};
