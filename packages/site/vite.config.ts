import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeAddClasses from "rehype-add-classes";
import rehypeRewrite from "rehype-rewrite";

const rewriteLink = item => {
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
        [rehypeAddClasses, { pre: "root-pre", code: "root-code" }],
        [
          rehypeRewrite,
          {
            rewrite: node => {
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
    include: ["@jobber/formatters", "@jobber/hooks"],
  },
  resolve: {
    alias: {
      "@jobber/hooks": path.resolve(__dirname, "../hooks/src"),
      "@storybook/addon-docs": path.resolve(
        __dirname,
        "./src/components/StorybookOverrides",
      ),
      mdxUtils: path.resolve(__dirname, "../../.storybook/components"),
      "@jobber/docx": path.resolve(__dirname, "./src/components/docx"),
      "@atlantis/docs": path.resolve(__dirname, "../../docs"),
    },
  },
  server: {
    open: true,
  },
  define: {
    "process.env": {},
  },
});
