import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeRewrite from "rehype-rewrite";
import { recmaInjectToc, remarkExtractToc } from "./scripts/mdx-extract-toc";

export default defineConfig({
  plugins: [
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
    proxy: {
      "/storybook/web": {
        target: "http://localhost:6007",
        changeOrigin: true,
        rewrite: requestPath => requestPath.replace(/^\/storybook\/web/, ""),
      },
      "/storybook/mobile": {
        target: "http://localhost:6008",
        changeOrigin: true,
        rewrite: requestPath => requestPath.replace(/^\/storybook\/mobile/, ""),
      },
    },
  },
  build: {
    minify: false,
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
});
