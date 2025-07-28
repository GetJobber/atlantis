module.exports = {
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-internal-modules": "off",
    "monorepo-cop/no-relative-import-outside-package": "off",
    "import/no-default-export": "off",
    "import/no-cycle": "off",
    "import/no-unresolved": [
      "error",
      {
        ignore: [
          "^@atlantis/docs",
          "^@atlantis/packages",
          "^@jobber/component/styles",
        ],
      },
    ],
  },
};
