export const navigation = {
  py: "large",
};

export const levelOneLink = {
  display: "block",
  textTransform: "uppercase",
  px: "large",
  my: "small",
  textDecoration: "none",
  fontWeight: "bold",
  color: "greyBlueLighter",
  transition: "color 300ms",

  "&:hover": {
    color: "white",
  },
} as const;
