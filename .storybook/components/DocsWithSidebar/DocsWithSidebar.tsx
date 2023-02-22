import React, { PropsWithChildren } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";

export function DocsWithSidebar({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <DocsContainer context={context} {...rest}>
          {children}
        </DocsContainer>
      </div>
      <div style={{ flex: 0 }}></div>
    </div>
  );
}
