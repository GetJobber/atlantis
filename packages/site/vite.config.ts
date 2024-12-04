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
              properties: { href: string };
            }) => {
              if (
                node.type === "element" &&
                node.tagName === "a" &&
                node.properties &&
                node.properties.href
              ) {
                // Rewrite the link as needed
                node.properties.href = rewriteLink(node.properties.href);
              }
            },
          },
        ],
      ],
    }),
  ],
  optimizeDeps: {
    include: ["@jobber/hooks"],
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
      mdxUtils: path.resolve(__dirname, "../../.storybook/components"),
      "@jobber/docx": path.resolve(__dirname, "../docx/src"),
      "@atlantis/docs": path.resolve(__dirname, "../../docs"),
    },
  },
  define: {
    "process.env": {},
  },
});
