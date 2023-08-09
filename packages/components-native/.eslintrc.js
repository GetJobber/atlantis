module.exports = {
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**"],
      },
    ],
    "react/forbid-elements": [
      "error",
      {
        forbid: [
          { element: "div", message: "Use `<View>` instead" },
          { element: "span", message: "Use `<View>` instead" },
          { element: "button", message: "Use `<Button/>` instead" },
          { element: "a", message: "Use `<AutoLink/>` instead" },
          { element: "img", message: "Use `<Image/>` instead" },
          { element: "input", message: "Use a Form input instead" },
        ],
      },
    ],
  },
};
