export const wrapper = {
  position: "sticky",
  zIndex: 10,
  top: 0,
  height: 78,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  pr: 5,
  pl: 3,
};

export const link = open => ({
  ml: 3,

  "&:first-of-type": {
    mr: "auto",
    transform: `rotate(${open ? "0" : "180"}deg)`,
  },
});
