import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeRewrite from "rehype-rewrite";

const rewriteLink = (item: string) => {
  let newItem = item;

  if (newItem.includes("../?path=/story")) {
    newItem = newItem.replace("../", "https://atlantis.getjobber.com");
  }

  return newItem;
};
export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
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
              if (
                node.type === "element" &&
                node.tagName === "a" &&
                node.properties &&
                node.properties.href
              ) {
                node.properties.href = rewriteLink(node.properties.href);
              }

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
      "@jobber/components": path.resolve(__dirname, "../components/src"),
      "@jobber/design-system": path.resolve(__dirname, "../design/src"),
      "@storybook/addon-docs": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      "@storybook/addon-designs/blocks": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      mdxUtils: path.resolve(__dirname, "../../.storybook/components"),
      "@jobber/docx": path.resolve(__dirname, "../docx/src"),
      "@atlantis/docs": path.resolve(__dirname, "../../docs"),
      "@atlantis/packages": path.resolve(__dirname, "../../packages"),
    },
  },
  define: {
    "process.env": {},
  },
});
