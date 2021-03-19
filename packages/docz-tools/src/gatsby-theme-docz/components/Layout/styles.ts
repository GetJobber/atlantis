export const layout = {
  display: "flex",
  minHeight: "100vh",
};

export const sidebar = (width?: number) => ({
  flex: `0 0 ${width}`,
  maxWidth: width,
  width: width,
});

export const content = {
  paddingY: "largest",
  paddingX: "large",
  flex: "1",
};
