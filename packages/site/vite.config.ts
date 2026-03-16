import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeRewrite from "rehype-rewrite";
import { recmaInjectToc, remarkExtractToc } from "./scripts/mdx-extract-toc";

const localStorybookPorts = {
  "/storybook/web": 6007,
  "/storybook/mobile": 6008,
} as const;

export default defineConfig(() => ({
  plugins: [
    {
      name: "local-storybook-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const requestUrl = req.url;
          const requestHost = req.headers.host;

          if (!requestUrl || !requestHost) return next();

          const matchingPrefix = Object.keys(localStorybookPorts).find(
            prefix => {
              return (
                requestUrl === prefix ||
                requestUrl.startsWith(`${prefix}/`) ||
                requestUrl.startsWith(`${prefix}?`)
              );
            },
          );

          if (!matchingPrefix) return next();

          const sourceUrl = new URL(requestUrl, `http://${requestHost}`);
          const rewrittenPath = sourceUrl.pathname.replace(matchingPrefix, "");
          const targetUrl = new URL(
            rewrittenPath || "/",
            `http://${sourceUrl.hostname}:${
              localStorybookPorts[
                matchingPrefix as keyof typeof localStorybookPorts
              ]
            }`,
          );

          targetUrl.search = sourceUrl.search;

          // Redirect to the Storybook dev server so its assets load from the same origin.
          res.statusCode = 307;
          res.setHeader("Location", targetUrl.toString());
          res.end();
        });
      },
    },
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkExtractToc],
      recmaPlugins: [recmaInjectToc],
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [
        [
          rehypeRewrite,
          {
            rewrite: (node: {
              type: string;
              tagName: string;
              properties: Record<string, string>;
              children?: Array<{ value: string }>;
            }) => {
              // For any processed H2 Element, add an ID and a data-heading-link attribute
              // So we can link to it from the sidebar
              if (node.type === "element" && node.tagName === "h2") {
                node.properties.id =
                  "component-view-" +
                  node.children?.[0].value?.replace(/ /g, "-").toLowerCase();
                node.properties["data-heading-link"] = "";
              }
            },
          },
        ],
      ],
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    minify: false,
    rollupOptions: {
      external: ["react-native-keyboard-controller", "react-native-reanimated"],
    },
  },
  optimizeDeps: {
    include: ["@jobber/formatters", "@jobber/hooks", "@jobber/components"],
  },
  resolve: {
    alias: {
      "@jobber/formatters": path.resolve(__dirname, "../formatters/src"),
      "@jobber/hooks": path.resolve(__dirname, "../hooks/src"),
      "@storybook/addon-docs": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      "@storybook/addon-designs/blocks": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      "@storybook/blocks": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      mdxUtils: path.resolve(__dirname, "./src/mdxUtils"),
      "@jobber/docx": path.resolve(__dirname, "../docx/src"),
      "@atlantis/packages": path.resolve(__dirname, "../../packages"),
    },
  },
  define: {
    "process.env": {},
  },
}));
