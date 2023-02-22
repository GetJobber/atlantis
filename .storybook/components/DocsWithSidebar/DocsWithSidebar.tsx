import React, { PropsWithChildren } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";
import { TableOfContents } from "../TableOfContents";

export function DocsWithSidebar({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <DocsContainer context={context} {...rest}>
          {children}
        </DocsContainer>
      </div>
      <div style={{ flex: "0 1 auto", width: 250 }}>
        <TableOfContents />
      </div>
    </div>
  );
}
