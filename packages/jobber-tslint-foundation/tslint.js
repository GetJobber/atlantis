const path = require('path');

module.exports = {
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended",
    "tslint-microsoft-contrib",
    "tslint-config-prettier",
    "tslint-plugin-prettier",
    "tslint-react"
  ],
  "jsRules": {},
  "rules": {
    "interface-name": false,
    "no-implicit-dependencies": false,
    "prettier": true,
    "import-name": [true, {
      "react": "React",
      "*.css": "styles"
    }],
    "missing-jsdoc": false,
    "quotemark": [true, "single", "avoid-escape", "avoid-template", "jsx-double"],
    "prefer-template": true,
    "no-default-export": false,
    "no-relative-imports": false,
    "typedef": false,
    "jsx-no-multiline-js": false
  },
  "rulesDirectory": [
    path.join(path.dirname(require.resolve('tslint-config-prettier')), './'),
    path.join(path.dirname(require.resolve('tslint-microsoft-contrib')), './'),
    path.join(path.dirname(require.resolve('tslint-react')), './'),
  ]
}
