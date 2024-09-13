import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

export default defineConfig({
  plugins: [react(), mdx({ remarkPlugins: [remarkGfm] })],
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
