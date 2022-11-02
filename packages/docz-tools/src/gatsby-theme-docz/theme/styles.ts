export const styles = {
  a: {
    color: "var(--color-interactive)",
    textDecoration: "none",
    transition: "color 300ms",

    "&:hover": {
      color: "var(--color-interactive--hover)",
    },
  },
  ol: {
    pl: "large",
    marginY: "base",
  },
  ul: {
    pl: "large",
    marginY: "base",
  },
  li: {
    marginY: "small",
  },
  strong: {
    fontWeight: "bold",
  },
  blockquote: {
    bg: "var(--color-surface--background)",
    marginY: "large",
    marginX: 0,
    paddingY: "base",
    pl: "large",
    pr: "base",
    borderLeft: "var(--border-thicker) solid",
    borderColor: "var(--color-border)",
    borderRadius: "base",
    lineHeight: "large",
    fontStyle: "italic",
    color: "var(--color-text--secondary)",

    "> p": {
      m: 0,
    },
  },
  pre: {
    marginY: "large",
    paddingY: "base",
    paddingX: "large",
    border: "1px solid",
    borderColor: "var(--color-border)",
  },
  inlineCode: {
    display: "inline-block",
    borderRadius: "base",
    fontSize: "base",
    fontFamily: "monospace",
    bg: "var(--color-surface--background)",
    color: "var(--color-text)",
    paddingX: "smaller",
  },
};
