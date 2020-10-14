export const wrapper = open => ({
  bg: "greyBlueDark",
  position: "sticky",
  top: 0,
  maxHeight: "100vh",
  overflowY: "scroll",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  gridRow: "1 / 99",
  flex: t => `1 0 ${t.sidebarWidth || 300}`,
  width: t => `${open ? 70 : t.sidebarWidth || 300}px`,
  maxWidth: t => t.sidebarWidth || 300,
  transition: "width 200ms ease-in-out",

  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const menu = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  width: t => t.sidebarWidth || 300,
};

export const search = {
  position: "sticky",
  top: 0,
};
