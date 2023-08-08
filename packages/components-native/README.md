# 🔱 Jobber Atlantis Components - Mobile 📱

Atlantis is a component library designed and maintained by
[Jobber](https://getjobber.com).

---

This package contains the base set of [React components](https://reactjs.org/)
for Atlantis.

## Installation

To install this package into your project with [npm](https://www.npmjs.com/)
run:

```sh
npm install @jobber/components-native
# iOS Linking
cd ios
pod install
```

## Usage

Import and render an Atlantis component:

```tsx
import React from "react";
import { Icon } from "@jobber/components-native";

export function MyComponent() {
  return <Icon />;
}
```

## Setting up with Jest

In order to make `@jobber/components-native` work with Jest, you may need to
make Jest transpile the package by adding
`"/node_modules/@jobber/components-native"` to `transformIgnorePatterns` in you
Jest config.

```json
transformIgnorePatterns: [
  "node_modules/@jobber/components-native",
],
```

Also update the Jest config as to include the `jestSetup.js`

```json
setupFiles: [
    ...
    "./node_modules/@jobber/components-native/jestSetup.js",
    ...
  ],
```

## Further Reading

More information on Atlantis can be found at
[https://atlantis.getjobber.com](https://atlantis.getjobber.com).
