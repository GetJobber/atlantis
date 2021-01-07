export const layout = {
  display: "flex",
  minHeight: "100vh",
};

export const sidebar = (width?: number) => ({
  flex: `0 0 ${width || 300}`,
  maxWidth: width || 300,
  width: width || 300,
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
