export const levelOne = {
  fontSize: 2,
  color: "sidebar.navGroup",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  py: 2,
  textTransform: "uppercase",
  fontWeight: "bold",
  textDecoration: "none",
};

export const levelTwo = {
  display: "flex",
  alignItems: "center",
  py: 1,
  color: "sidebar.navLink",
  fontSize: 2,
  textDecoration: "none",

  "&::before": {
    content: "''",
    display: "inline-block",
    width: 7,
    height: 7,
    border: t => `2px solid ${t.colors.sidebar.navLink}`,
    borderRadius: "rounded",
    verticalAlign: "middle",
    mr: 3,
    transition: "background 200ms, border 200ms",
  },

  "&:hover::before": {
    borderColor: "sidebar.navLinkActive",
    bg: "sidebar.navLinkActive",
  },

  "&.active": {
    color: "sidebar.navLinkActive",
    mb: 2,
  },

  "&.active::before": {
    borderColor: "sidebar.navLinkActive",
    bg: "sidebar.navLinkActive",
  },
};

export const levelThree = {
  fontSize: 2,
  color: "sidebar.tocLink",
  textDecoration: "none",
  py: 2,
  display: "flex",

  "&::before": {
    content: "'›'",
    mr: 3,
    mt: "1px",
    fontSize: 4,
    lineHeight: "1",
  },

  "&.active": {
    color: "sidebar.tocLinkActive",
  },
};
