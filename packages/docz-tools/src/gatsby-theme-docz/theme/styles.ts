export const styles = {
  a: {
    color: "green",
    textDecoration: "none",
    transition: "color 300ms",

    "&:hover": {
      color: "greenDark",
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
    bg: "greyLightest",
    marginY: "large",
    marginX: 0,
    paddingY: "base",
    pl: "large",
    pr: "base",
    borderLeft: "var(--border-thicker) solid",
    borderColor: "greyBlueLighter",
    borderRadius: "base",
    lineHeight: "large",
    fontStyle: "italic",
    color: "greyBlue",

    "> p": {
      m: 0,
    },
  },
  pre: {
    marginY: "large",
    paddingY: "base",
    paddingX: "large",
    border: "1px solid",
    borderColor: "greyLighter",
  },
  inlineCode: {
    display: "inline-block",
    borderRadius: "base",
    fontSize: "small",
    fontFamily: "monospace",
    bg: "greyLightest",
    color: "greyBlueDark",
    paddingY: "smaller",
    paddingX: "small",
    marginBottom: "smallest",
    border: "1px solid",
    borderColor: "greyLighter",
  },
};
