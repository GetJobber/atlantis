export const actions = {
  display: "flex",
  paddingTop: "var(--space-base)",
  paddingBottom: "var(--space-extravagant)",

  "> *": {
    marginRight: "small",
  },
} as const;
