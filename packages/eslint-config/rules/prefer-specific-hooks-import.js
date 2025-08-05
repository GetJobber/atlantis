/**
 * Custom ESLint rule to enforce specific import patterns for @jobber/hooks
 *
 * This rule enforces that imports from "@jobber/hooks" should use specific
 * hook imports like "@jobber/hooks/useBool" instead of named imports from
 * the main package.
 *
 * ❌ Bad:  import { useBool } from "@jobber/hooks";
 * ✅ Good: import { useBool } from "@jobber/hooks/useBool";
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "enforce specific import paths for @jobber/hooks",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      preferSpecificImport:
        "Import '{{hookName}}' from '@jobber/hooks/{{hookName}}' instead of '@jobber/hooks'",
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // Only check imports from "@jobber/hooks"
        if (node.source.value !== "@jobber/hooks") {
          return;
        }

        // Only check named imports (not default or namespace imports)
        const namedImports = node.specifiers.filter(
          spec => spec.type === "ImportSpecifier",
        );

        if (namedImports.length === 0) {
          return;
        }

        // Check each named import
        namedImports.forEach(specifier => {
          const hookName = specifier.imported.name;

          // Verify it follows the "use" pattern (hooks should start with "use")
          if (!hookName.startsWith("use")) {
            return;
          }

          context.report({
            node: specifier,
            messageId: "preferSpecificImport",
            data: {
              hookName,
            },
            fix(fixer) {
              // If there's only one named import, replace the entire import
              if (namedImports.length === 1) {
                return fixer.replaceText(
                  node,
                  `import { ${hookName} } from "@jobber/hooks/${hookName}";`,
                );
              }

              // If there are multiple named imports, we need to split them
              // This is more complex, so for now we'll handle the simple case
              // and let the user manually fix complex cases
              const otherImports = namedImports
                .filter(spec => spec !== specifier)
                .map(spec => spec.imported.name);

              if (otherImports.length > 0) {
                // Create two separate import statements
                const remainingImports = `import { ${otherImports.join(
                  ", ",
                )} } from "@jobber/hooks";`;
                const specificImport = `import { ${hookName} } from "@jobber/hooks/${hookName}";`;

                return [
                  fixer.replaceText(node, remainingImports),
                  fixer.insertTextAfter(node, `\n${specificImport}`),
                ];
              }

              return fixer.replaceText(
                node,
                `import { ${hookName} } from "@jobber/hooks/${hookName}";`,
              );
            },
          });
        });
      },
    };
  },
};
