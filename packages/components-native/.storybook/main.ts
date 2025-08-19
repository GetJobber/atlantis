import type { StorybookConfig } from "@storybook/react-native-web-vite";
import type { Plugin } from "vite";
import path from "path";

export default {
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {}
  },
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  typescript: {
    // Correctly parses our prop types and generates controls for stories
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    // Remove unnecessary plugin which parses all tsconfig.json files within the project.
    config.plugins = (config.plugins || []).filter(
      (plugin: any) => plugin?.name !== "vite-tsconfig-paths"
    );

    config.plugins.push(injectReactNativeWebShims());
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: "@jobber/components-native",
            replacement: path.resolve(__dirname, "../../components-native/src"),
          },
          {
            find: "@jobber/design",
            replacement: path.resolve(__dirname, "../../design/src"),
          },
          {
            find: "@jobber/formatters",
            replacement: path.resolve(__dirname, "../../formatters/src"),
          },
          {
            find: "@jobber/hooks",
            replacement: path.resolve(__dirname, "../../hooks/src"),
          },
        ],
      },
    });
  },
} satisfies StorybookConfig;

/**
 * We're using storybook's RNW framework (@storybook/react-native-web-vite).
 * That framework injects an alias for `react-native` that points to `react-native-web`.
 * However, we need to inject some shims on top of that to fill in missing APIs
 * such as PlatformColor for example.
 *
 * This plugin overrides the alias for `react-native` to point to our shim instead.
 */
function injectReactNativeWebShims(): Plugin {
  return {
    name: "override-react-native-web-alias",
    config(config) {
      const aliases = Array.isArray(config.resolve?.alias) ? config.resolve.alias : [];
      for (const alias of aliases) {
        if (alias.find === "react-native") {
          alias.replacement = path.resolve(__dirname, "./reactNativeWebShim.ts");
        }
      }
    },
  }
}
