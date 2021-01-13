export const container = {
  bg: "greyLightest",
  border: "1px solid",
  borderColor: "greyLighter",
  borderRadius: "base",
  mb: "large",
};

export const prop = {
  display: "flex",
  py: "base",
  px: "base",
  borderTop: "1px solid",
  borderColor: "greyLighter",

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
  color: "greyBlueDark",
  mr: "base",
};

export const required = {
  position: "relative",
  display: "inline-block",
  color: "red",
  ml: "smallest",
  top: "-5px",
};

export const defaultValue = {
  color: "greyBlue",
};

export const typeValue = {
  display: "flex",
  alignItems: "center",
  fontFamily: "monospace",
  fontSize: "small",
  color: "greyBlue",
  lineHeight: "large",
  flex: "1",
};

export const toggle = {
  display: "flex",
  alignItems: "center",
  ml: "base",
};

export const description = {
  bg: "white",
  p: "base",
  borderTop: "1px solid",
  borderColor: "greyLighter",
  color: "greyBlue",
  fontSize: "base",

  "> p": {
    m: 0,
  },
};
