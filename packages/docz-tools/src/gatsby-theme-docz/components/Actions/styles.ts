export const actions = {
  display: "flex",
  position: "fixed",
  top: "large",
  right: "large",
  zIndex: 999,

  "> *": {
    marginLeft: "small",
  },
} as const;
