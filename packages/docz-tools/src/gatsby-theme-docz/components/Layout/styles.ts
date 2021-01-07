export const layout = {
  display: "flex",
};

export const sidebar = (width?: number) => ({
  flex: `0 0 ${width || 300}`,
  maxWidth: width || 300,
  width: width || 300,
  bg: "greyBlueDark",
});

export const content = {
  py: "larger",
  px: "large",
  flex: "1",
};

export const container = {
  maxWidth: 800,
  mx: "auto",
};
