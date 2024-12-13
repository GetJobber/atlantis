import React from "react";
import ReactDOM from "react-dom/client";
import "@jobber/design/foundation.css";
import "@jobber/design/dist/dark.mode.css";
import "@jobber/components/dist/styles.css";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { AtlantisThemeContextProvider } from "@jobber/components";
import { Layout } from "./layout/Layout";
import { AtlantisPreviewEditorProvider } from "./providers/AtlantisPreviewEditorProvider";
import { AtlantisSiteProvider } from "./providers/AtlantisSiteProvider";
import { initAtlantisTheme } from "./utils/theme";
import { Analytics } from "./components/Analytics";

// STODO: Wrap this up in a function associated to 'minimal' mode.
// We may eventually want more modes.
const urlParams = new URLSearchParams(window.location.search);
const minimalMode = urlParams.has("minimal");

initAtlantisTheme(urlParams.get("theme"));

function renderApp() {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <AtlantisThemeContextProvider>
            <AtlantisSiteProvider
              minimal={{ requested: minimalMode, enabled: false }}
            >
              <Analytics />
              <AtlantisPreviewEditorProvider>
                <Layout />
              </AtlantisPreviewEditorProvider>
            </AtlantisSiteProvider>
          </AtlantisThemeContextProvider>
        </BrowserRouter>
      </React.StrictMode>,
    );
  }
}

// STODO: Do this the right way. Pre-load the fonts, css setup the shell as raw html, so there isn't a snap of content, etc.
// Hacky way around flash of unstyled content. We should properly pre-load the fonts instead when we get a chance.
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    renderApp();
  }, 200);
});
