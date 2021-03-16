export type LevelType = "l1" | "l2" | "l3" | "l4" | "l5" | "l6";

export const list = {
  margin: 0,
  p: 0,
  paddingLeft: "large",
};

export const item = (level: LevelType) => {
  return {
    listStyle: getListStyle(level),
    marginLeft: getMarginLeft(level),
  };
};

function getListStyle(level: LevelType) {
  if (level === "l3" || level === "l5") {
    return "circle";
  }

  if (level === "l4" || level === "l6") {
    return "square";
  }

  return "none";
}

function getMarginLeft(level: LevelType) {
  return `calc(var(--space-base) * ${getMultiplier()})`;

  function getMultiplier() {
    if (level === "l1") return -1;
    if (level === "l2") return 0;
    if (level === "l3") return 1;
    if (level === "l4") return 2;
    if (level === "l5") return 3;
    if (level === "l6") return 4;
    return;
  }
}

export const link = {
  color: "green",
  transition: "color 300ms",

  "&:hover": {
    textDecoration: "none",
    color: "greenDark",
  },
};
