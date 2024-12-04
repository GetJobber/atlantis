import React from "react";
import ReactDOM from "react-dom/client";
import "@jobber/design/foundation.css";
import "@jobber/components/dist/styles.css";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { AtlantisPreviewEditorProvider } from "./providers/AtlantisPreviewEditorProvider";
import { AtlantisSiteProvider } from "./providers/AtlantisSiteProvider";

const urlParams = new URLSearchParams(window.location.search);
const minimalMode = urlParams.has("minimal");

function renderApp() {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <AtlantisSiteProvider
            minimal={{ requested: minimalMode, enabled: false }}
          >
            <AtlantisPreviewEditorProvider>
              <Layout />
            </AtlantisPreviewEditorProvider>
          </AtlantisSiteProvider>
        </BrowserRouter>
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
