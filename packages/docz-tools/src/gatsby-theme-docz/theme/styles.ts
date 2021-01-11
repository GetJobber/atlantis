export const styles = {
  root: {
    fontFamily: "body",
    fontSize: "large",
    lineHeight: "large",
  },
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
    my: "base",
  },
  ul: {
    pl: "large",
    my: "base",
  },
  li: {
    my: "small",
  },
  strong: {
    fontWeight: "bold",
  },
  blockquote: {
    bg: "greyLightest",
    my: "large",
    mx: 0,
    py: "base",
    pl: "large",
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
    my: "large",
    py: "base",
    px: "large",
    border: "1px solid",
    borderColor: "greyLighter",
  },
  inlineCode: {
    borderRadius: "base",
    fontSize: "small",
    fontFamily: "monospace",
    bg: "greyLightest",
    color: "greyBlueDark",
    py: "smaller",
    px: "small",
    border: "1px solid",
    borderColor: "greyLighter",
  },
};
