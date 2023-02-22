import React, { PropsWithChildren } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";
import { TableOfContents } from "../TableOfContents";

export function DocsWithSidebar({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) {
  const githubRepo = "https://github.com/GetJobber/atlantis";
  const githubInfo = {
    repo: githubRepo,
    name: context?.story || "",
    viewFile: generateFilePath(githubRepo, context?.parameters?.fileName),
    editFile: generateFilePath(
      githubRepo,
      context?.parameters?.fileName,
      "edit",
    ),
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <DocsContainer context={context} {...rest}>
          {children}
        </DocsContainer>
      </div>
      <div style={{ flex: "0 1 auto", width: 250, overflow: "auto" }}>
        <TableOfContents githubInfo={githubInfo} />
      </div>
    </div>
  );
}

function generateFilePath(githubRepo: string, file?: string, type = "tree") {
  const cleanFileName = file?.slice(1) || "";
  return `${githubRepo}/${type}/master${cleanFileName}`;
}
