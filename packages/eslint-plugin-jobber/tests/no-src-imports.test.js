"use strict";

const { RuleTester } = require("eslint");
const rule = require("../rules/no-src-imports");

// Configure RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

// Run the tests
ruleTester.run("no-src-imports", rule, {
  valid: [
    // Valid imports
    {
      code: `import { Button } from "@jobber/components";`,
    },
    {
      code: `import { useShowClear } from "@jobber/hooks";`,
    },
    {
      code: `import { colors } from "@jobber/design";`,
    },
    {
      code: `import React from "react";`,
    },
    {
      code: `import { something } from "../utils";`,
    },
    // Edge case: Similar but not matching pattern
    {
      code: `import { Component } from "@otherpkg/components/src/Component";`,
    },
    // Edge case: Valid dynamic import
    {
      code: `import("@jobber/components").then(module => { console.log(module); });`,
    },
    // Edge case: Valid advanced dynamic import
    {
      code: `
        function loadComponents(path) {
          return import(path);
        }
        loadComponents("@jobber/components");
      `,
    },
    // Edge case: Dynamic import with variable path - can't be detected at lint time
    {
      code: `
        const path = "@jobber/components/src/Button";
        import(path).then(module => { console.log(module); });
      `,
    },
  ],
  invalid: [
    // Invalid imports with @jobber/*/src/* pattern
    {
      code: `import { Clearable } from "@jobber/hooks/src/useShowClear";`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    {
      code: `import { Button } from "@jobber/components/src/Button";`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    {
      code: `import { colors } from "@jobber/design/src/constants";`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    {
      code: `import { Icon } from "@jobber/components/src/Icon/Icon";`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    {
      code: `import { Icon } from "@jobber/components/src/";`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    // Edge case: Multiple imports in same file
    {
      code: `
        import { Button } from "@jobber/components";
        import { Clearable } from "@jobber/hooks/src/useShowClear";
        import { colors } from "@jobber/design";
      `,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
    // Edge case: Invalid dynamic import
    {
      code: `import("@jobber/components/src/Button").then(module => { console.log(module); });`,
      errors: [
        {
          messageId: "noSrcImports",
        },
      ],
    },
  ],
});
