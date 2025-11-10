import path from "path";
import type { StorybookConfig } from "@storybook/react-native-web-vite";
import type { Plugin, PluginOption, UserConfig } from "vite";

export default {
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      modulesToTranspile: ["@gorhom/bottom-sheet"],
      pluginReactOptions: {
        babel: {
          plugins: [
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin",
          ],
        },
      },
    },
  },
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  typescript: {
    // Correctly parses our prop types and generates controls for stories
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    logViteConfig(config);

    config.plugins = removeUnnecessaryPlugins(config.plugins || []);

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
      const aliases = Array.isArray(config.resolve?.alias)
        ? config.resolve.alias
        : [];

      for (const alias of aliases) {
        if (alias.find === "react-native") {
          alias.replacement = path.resolve(
            __dirname,
            "./reactNativeWebShim.ts",
          );
        }
      }
    },
  };
}

/**
 * Debug logging to compare local vs Cloudflare build configurations.
 */
function logViteConfig(config: UserConfig) {
  console.log("=== Storybook Vite Config Debug ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Mode:", config.mode);

  checkPackageResolvable("react-native-reanimated");
  checkPackageResolvable("@gorhom/bottom-sheet");

  console.log("Plugins count:", config.plugins?.length || 0);
  const pluginNames = config.plugins
    ?.map(p =>
      typeof p === "object" && p !== null && "name" in p ? p.name : String(p),
    )
    .slice(0, 10);
  console.log("Plugin names:", pluginNames);
  console.log("Resolve conditions:", config.resolve?.conditions);
  console.log("Resolve extensions:", config.resolve?.extensions?.slice(0, 5));
  console.log("=== End Vite Config Debug ===");
}

function checkPackageResolvable(packageName: string) {
  try {
    const packagePath = require.resolve(packageName, {
      paths: [path.resolve(__dirname, "../..")],
    });
    console.log(`✓ ${packageName} found at:`, packagePath);
  } catch (error) {
    const err = error as Error;
    console.error(`✗ ${packageName} NOT found:`, err.message);
  }
}

/**
 * Remove any unnecessary plugins.
 */
function removeUnnecessaryPlugins(plugins: PluginOption[]) {
  return plugins.filter((plugin: PluginOption) => {
    if (plugin && typeof plugin === "object") {
      // This plugin parses all tsconfig.json files within the project, which is not needed.
      if ("name" in plugin && plugin.name === "vite-tsconfig-paths") {
        return false;
      }
    }

    return true;
  });
}
