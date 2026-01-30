import React from "react";
import ReactDOM from "react-dom/client";
import "@jobber/design/dist/foundation.css";
import "@jobber/design/dist/dark.mode.css";
import "@jobber/components/styles";
import "./main.css";
import { RouterProvider } from "@tanstack/react-router";
import { AtlantisThemeContextProvider } from "@jobber/components";
import { router } from "./router"; // Loads router + global type registration (declare module)
import { AtlantisPreviewProvider } from "./preview/AtlantisPreviewProvider";
import { AtlantisSiteProvider } from "./providers/AtlantisSiteProvider";
import { initAtlantisTheme } from "./utils/theme";
import { handleStorybookRedirect } from "./utils/storybook";
import { TritonProvider } from "./providers/TritonProvider";

handleStorybookRedirect();

const urlParams = new URLSearchParams(window.location.search);
const minimalMode = urlParams.has("minimal");

initAtlantisTheme(urlParams.get("theme"));

function renderApp() {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <AtlantisThemeContextProvider>
          <AtlantisSiteProvider
            minimal={{ requested: minimalMode, enabled: false }}
          >
            <AtlantisPreviewProvider>
              <TritonProvider>
                <RouterProvider router={router} />
              </TritonProvider>
            </AtlantisPreviewProvider>
          </AtlantisSiteProvider>
        </AtlantisThemeContextProvider>
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
