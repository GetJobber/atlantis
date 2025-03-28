import React from "react";
import ReactDOM from "react-dom";
import { AtlantisThemedPortalProps } from "./types";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "../AtlantisThemeContext";

export function AtlantisThemedPortal({
  children,
  container,
}: AtlantisThemedPortalProps) {
  const { theme } = useAtlantisTheme();
  const portalTarget = container ?? document.body;

  const content = (
    <AtlantisThemeContextProvider dangerouslyOverrideTheme={theme}>
      {children}
    </AtlantisThemeContextProvider>
  );

  return ReactDOM.createPortal(content, portalTarget);
}
