import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AtlantisThemeContextProvider } from "@jobber/components";
import { Layout } from "./layout/Layout";
import { AtlantisPreviewProvider } from "./preview/AtlantisPreviewProvider";
import { AtlantisSiteProvider } from "./providers/AtlantisSiteProvider";
import { initAtlantisTheme } from "./utils/theme";
import { Analytics } from "./components/Analytics";
import { handleStorybookRedirect } from "./utils/storybook";
import { TritonProvider } from "./providers/TritonProvider";

import "@jobber/design/dist/foundation.css";
import "@jobber/design/dist/dark.mode.css";
import "@jobber/component/styles/styles.css";
import "./main.css";

handleStorybookRedirect();

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
              <AtlantisPreviewProvider>
                <TritonProvider>
                  <Layout />
                </TritonProvider>
              </AtlantisPreviewProvider>
            </AtlantisSiteProvider>
          </AtlantisThemeContextProvider>
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
