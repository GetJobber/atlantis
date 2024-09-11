import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [react(), mdx()],
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
      "mdxUtils/ColorSwatches": path.resolve(
        __dirname,
        "./src/components/docx/ColorSwatches",
      ),
      "@jobber/docx": path.resolve(
        __dirname,
        "./src/components/docx/ColorSwatches",
      ),
    },
  },
  server: {
    open: true,
  },
  define: {
    "process.env": {},
  },
});
