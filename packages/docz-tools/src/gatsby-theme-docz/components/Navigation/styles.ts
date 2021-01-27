export const navigation = {
  paddingTop: "base",
  paddingBottom: "largest",
  paddingX: "large",
};

export const item = {
  marginY: "base",
};

export const levelOneLink = (active?: boolean) =>
  ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: "bold",
    color: active ? "white" : "greyBlueLighter",
    transition: "color 300ms",
    cursor: "pointer",

    "&:hover": {
      color: "white",
    },
  } as const);

export const levelTwoLink = (active: boolean) =>
  ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "base",
    color: active ? "white" : "greyBlueLighter",
    transition: "color 300ms",
    cursor: active ? "default" : "pointer",
    pointerEvents: active ? "none" : undefined,
    fontWeight: "base",

    "&::before": {
      content: `""`,
      width: "small",
      height: "small",
      borderRadius: "circle",
      marginRight: "small",
      transition: "box-shadow 300ms",
      bg: active ? "green" : undefined,
      boxShadow: active
        ? undefined
        : (t: any) => `0 0 0 1px ${t.colors.greyBlueLighter} inset`,
    },

    "&:hover": {
      color: "white",

      "&:before": {
        boxShadow: active
          ? undefined
          : (t: any) => `0 0 0 1px ${t.colors.white} inset`,
      },
    },
  } as const);

export const levelThreeLink = (active: boolean) => ({
  display: "flex",
  alignItems: "center",
  color: active ? "white" : "greyBlueLight",
  fontWeight: "base",
  textDecoration: "none",
  fontSize: "base",
  transition: "color 300ms",

  "&:hover": {
    color: active ? "white" : "greyBlueLighter",
  },
});
