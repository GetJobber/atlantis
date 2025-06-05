"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow imports from @jobber/*/src/* paths",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
    messages: {
      noSrcImports:
        "Importing from '@jobber/*/src/*' is not allowed as these paths won't be valid in bundled packages. Import from '@jobber/*' instead.",
    },
  },

  create(context) {
    // Helper function to check if a path matches our invalid pattern
    function isInvalidJobberPath(path) {
      if (typeof path !== "string") return false;
      const regex = new RegExp("^@jobber\\/[^\\/]+\\/src\\/.*");

      return regex.test(path);
    }

    return {
      // Handle static imports
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (isInvalidJobberPath(importSource)) {
          context.report({
            node,
            messageId: "noSrcImports",
          });
        }
      },

      // Handle dynamic imports: import("@jobber/*/src/*")
      ImportExpression(node) {
        // For ESLint 7+, dynamic imports are represented by ImportExpression
        if (node.source && node.source.type === "Literal") {
          const importPath = node.source.value;

          if (isInvalidJobberPath(importPath)) {
            context.report({
              node,
              messageId: "noSrcImports",
            });
          }
        }
      },

      // Fallback for older ESLint versions
      CallExpression(node) {
        // Check if it's an import() call
        if (
          node.callee.type === "Import" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal"
        ) {
          const importPath = node.arguments[0].value;

          if (isInvalidJobberPath(importPath)) {
            context.report({
              node,
              messageId: "noSrcImports",
            });
          }
        }
      },
    };
  },
};
