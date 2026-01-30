import React from "react";
import ReactDOM from "react-dom/client";
import "@jobber/design/dist/foundation.css";
import "@jobber/design/dist/dark.mode.css";
import "@jobber/components/styles";
import "./main.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router"; // Loads router + global type registration (declare module)
import { initAtlantisTheme } from "./utils/theme";
import { handleStorybookRedirect } from "./utils/storybook";

handleStorybookRedirect();

const urlParams = new URLSearchParams(window.location.search);
initAtlantisTheme(urlParams.get("theme"));

function renderApp() {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <RouterProvider router={router} />
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
