export const sidebar = (width: number) =>
  ({
    bg: "greyBlueDark",
    height: "100vh",
    position: "fixed",
    top: 0,
    width: width,
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  } as const);

export const search = {
  position: "relative",
  mt: "large",
  mx: "base",

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
  py: "small",
  pr: "base",
  pl: "38px",
  fontSize: "base",
  fontFamily: "body",
  color: "white",

  "&:focus": {
    boxShadow: (t: any) => `0 0 3px ${t.colors.greyBlueLightest}`,
  },
} as const;
