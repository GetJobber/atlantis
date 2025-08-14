import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

export default {
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  typescript: {
    // Correctly parses our prop types and generates controls for stories
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@jobber/components": path.resolve(__dirname, "../../components/src"),
          "@jobber/design": path.resolve(__dirname, "../../design/src"),
          "@jobber/hooks": path.resolve(__dirname, "../../hooks/src"),
        },
      },
    });
  },
} satisfies StorybookConfig;
