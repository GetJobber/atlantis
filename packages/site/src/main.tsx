import React from "react";
import ReactDOM from "react-dom/client";
import "@jobber/design/foundation.css";
import "@jobber/components/dist/styles.css";
import "./index.css";
import { MDXProvider } from "@mdx-js/react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";

function renderApp() {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <MDXProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </MDXProvider>
      </React.StrictMode>,
    );
  }
}

// Hacky way around flash of unstyled content. We should properly pre-load the fonts instead when we get a chance.
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    renderApp();
  }, 200);
});
