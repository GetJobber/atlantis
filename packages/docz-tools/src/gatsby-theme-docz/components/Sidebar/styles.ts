export const sidebar = (width: number, sidebarOffset: number) =>
  ({
    bg: "greyBlueDark",
    height: `calc(100vh - ${sidebarOffset}px)`,
    position: "fixed",
    top: sidebarOffset,
    width: width,
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  } as const);

export const search = {
  position: "relative",
  marginTop: "large",
  marginX: "base",

  svg: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "small",
  },
} as const;

export const input = {
  boxSizing: "border-box",
  appearance: "none",
  border: 0,
  width: "100%",
  bg: "blue",
  outline: "none",
  transition: "box-shadow 300ms",
  borderRadius: "base",
  paddingY: "small",
  pr: "base",
  pl: "38px",
  fontSize: "base",
  fontFamily: "body",
  color: "white",

  "&:focus": {
    boxShadow: (t: any) => `0 0 3px ${t.colors.greyBlueLightest}`,
  },
} as const;
