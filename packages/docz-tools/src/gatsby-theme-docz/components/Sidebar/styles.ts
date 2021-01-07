export const sidebar = (width: number) =>
  ({
    bg: "greyBlueDark",
    height: "100vh",
    position: "fixed",
    top: 0,
    width: width || 300,
  } as const);
