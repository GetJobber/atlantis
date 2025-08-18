import type { StorybookConfig } from "@storybook/react-native-web-vite";
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
      (plugin: any) => plugin?.name !== 'vite-tsconfig-paths'
    );

    return mergeConfig(config, {
      resolve: {
        alias: {
          "@jobber/components-native": path.resolve(__dirname, "../../components-native/src"),
          "@jobber/design": path.resolve(__dirname, "../../design/src"),
          "@jobber/formatters": path.resolve(__dirname, "../../formatters/src"),
          "@jobber/hooks": path.resolve(__dirname, "../../hooks/src"),
        },
      },
    });
  },
} satisfies StorybookConfig;
