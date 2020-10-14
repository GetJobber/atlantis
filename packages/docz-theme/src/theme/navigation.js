export const heading = {
  fontSize: 2,
  color: "greyBlueLighter",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textTransform: "uppercase",
  fontWeight: "bold",
  textDecoration: "none",
  transition: "color 200ms",
  my: 4,

  "&:hover": {
    color: "white",
  },

  "&.active": {
    color: "white",
  },
};

export const bullet = {
  display: "flex",
  alignItems: "center",
  my: 3,
  color: "greyBlueLight",
  fontSize: 2,
  textDecoration: "none",

  "&::before": {
    content: "''",
    display: "inline-block",
    width: 7,
    height: 7,
    border: t => `2px solid ${t.colors.greyBlueLight}`,
    borderRadius: "rounded",
    verticalAlign: "middle",
    mr: 3,
    transition: "background 200ms, border 200ms",
  },

  "&:hover": {
    color: "green",
  },

  "&:hover::before": {
    borderColor: "green",
    bg: "green",
  },

  "&.active": {
    color: "green",
    mb: 2,
  },

  "&.active::before": {
    borderColor: "green",
    bg: "green",
  },
};

export const arrow = {
  fontSize: 2,
  color: "greyBlueLight",
  textDecoration: "none",
  py: 2,
  display: "flex",
  transition: "color 200ms",

  "&:hover": {
    color: "white",
  },

  "&::before": {
    content: "'›'",
    mr: 3,
    mt: "1px",
    fontSize: 4,
    lineHeight: "1",
  },

  "&.active": {
    color: "white",
  },
};
