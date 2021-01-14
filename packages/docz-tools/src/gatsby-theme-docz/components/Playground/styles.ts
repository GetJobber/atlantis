export const previewWrapper = {
  position: "relative",
};

export const editor = () => ({
  border: "1px solid",
  borderColor: "greyLighter",
  p: "small",
  bg: "greyLightest",
  borderBottomLeftRadius: "base",
  borderBottomRightRadius: "base",
});

export const error = {
  bg: "red",
  my: "smallest",
  p: "large",
  borderRadius: "base",
  color: "white",
  fontSize: "small",
  whiteSpace: "pre-wrap",
};

export const preview = {
  p: "large",
  border: "1px solid",
  borderColor: "greyLighter",
  borderBottom: "none",
  borderTopLeftRadius: "base",
  borderTopRightRadius: "base",
};

export const buttons = {
  display: "none",
};

export const button = {
  bg: "white",
  border: "1px solid",
  borderColor: "greyLighter",
};

/**
 * These must be left in as `gatsby-theme-docz` expects
 * these functionsto exist.
 */
export const wrapper = () => ({});
export const wrapperBorder = () => ({});
