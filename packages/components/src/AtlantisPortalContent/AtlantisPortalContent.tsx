import React from "react";
import type { AtlantisPortalContentProps } from "./AtlantisPortalContent.types";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "../AtlantisThemeContext";

export function AtlantisPortalContent({
  children,
}: AtlantisPortalContentProps) {
  const { theme } = useAtlantisTheme();

  return (
    <AtlantisThemeContextProvider dangerouslyOverrideTheme={theme}>
      {children}
    </AtlantisThemeContextProvider>
  );
}
