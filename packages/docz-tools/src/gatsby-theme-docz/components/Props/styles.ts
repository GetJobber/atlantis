export const container = {
  bg: "var(--color-surface--background)",
  border: "1px solid",
  borderColor: "var(--color-border)",
  borderRadius: "base",
  marginBottom: "large",
};

export const prop = {
  display: "flex",
  paddingY: "base",
  paddingX: "base",
  borderTop: "1px solid",
  borderColor: "var(--color-border)",

  "&:first-of-type": {
    borderTop: "none",
  },
};

export const propName = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: 135,
  fontFamily: "monospace",
  fontSize: "small",
  fontWeight: "bold",
  color: "var(--color-text--secondary)",
  marginRight: "base",
};

export const required = {
  position: "relative",
  display: "inline-block",
  color: "var(--color-critical)",
  marginLeft: "smallest",
  top: "-5px",
};

export const defaultValue = {
  color: "var(--color-text--secondary)",
  marginTop: "smallest",
};

export const typeValue = {
  display: "flex",
  alignItems: "center",
  fontFamily: "monospace",
  fontSize: "small",
  color: "var(--color-text--secondary)",
  lineHeight: "large",
  flex: "1",
};

export const toggle = {
  display: "flex",
  alignItems: "center",
  marginLeft: "base",
};

export const description = {
  bg: "var(--color-surface)",
  padding: "base",
  borderTop: "1px solid",
  borderColor: "var(--color-border)",
  color: "var(--color-text--secondary)",
  fontSize: "base",

  "> p": {
    margin: 0,
  },
};
