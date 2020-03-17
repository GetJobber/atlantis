export const button = ({ color }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  borderRadius: "2px",
  bg: color || "var(--color-green)",
  color: "var(--color-white)",
  verticalAlign: "middle",

  ":first-of-type": {
    borderRadius: "3px 0 0 3px",
  },

  ":last-of-type": {
    borderRadius: "0 3px 3px 0",
  },
});
