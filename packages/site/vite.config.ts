import path from "path";
import { IncomingMessage, ServerResponse } from "http";
import { readFileSync, writeFileSync } from "fs";
import { Plugin, defineConfig } from "vite";
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

// Custom plugin to add API endpoints during development
const callbackPlugin = (): Plugin => {
  const handleCallbackPost = (req: IncomingMessage, res: ServerResponse) => {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        console.log("Received callback data:", data);
        writeFileSync(
          "../../docs/components/Button/Button.stories.mdx",
          data.content,
        );
        // Your callback logic here
        // Example: process the data, trigger actions, etc.

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            message: "Callback received successfully",
            receivedData: data,
          }),
        );
      } catch (error) {
        console.error("Error parsing callback data:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: "Invalid JSON data",
          }),
        );
      }
    });
  };

  const handleCallbackGet = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url && req.headers.host) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const params = Object.fromEntries(url.searchParams);

      console.log("Received callback GET request with params:", params);
      const component = params.component;
      const content = readFileSync(
        `../../docs/components/${component}/${component}.stories.mdx`,
        "utf8",
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          content,
          message: "GET callback received",
          params,
        }),
      );
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid request" }));
    }
  };

  return {
    name: "callback-api",
    configureServer(server) {
      // Add your callback endpoints here
      server.middlewares.use(
        "/api/callback",
        (req: IncomingMessage, res: ServerResponse) => {
          if (req.method === "POST") {
            handleCallbackPost(req, res);
          } else if (req.method === "GET") {
            handleCallbackGet(req, res);
          } else {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Method not allowed" }));
          }
        },
      );
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    callbackPlugin(), // Add our custom callback plugin
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
