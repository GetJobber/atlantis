export const actions = {
  display: "flex",
  position: "fixed",
  top: "large",
  right: "large",
  zIndex: 9999,

  "> *": {
    marginLeft: "small",
  },
} as const;
