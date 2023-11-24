import React, { PropsWithChildren, useState } from "react";
import { DocsContainer, DocsContainerProps, Unstyled } from "@storybook/addon-docs";
import { Button } from "@jobber/components/Button";
import { Banner } from "@jobber/components/Banner";
import styles from "./DocsWithSidebar.css";
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

  const [navigationOpen, setNavigationOpen] = useState(false);
  const sidebarClassNames = [
    styles.sidebar,
    navigationOpen && styles.visible,
  ].join(" ");
  return (
    <Unstyled>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <DocsContainer context={context} {...rest}>
          {context.parameters?.alpha && (
            <Banner type="warning" dismissible={false}>
              This component is a work in progress. Breaking changes are
              expected on a minor version release.
            </Banner>
          )}
          {children}
        </DocsContainer>
      </div>
      <aside className={sidebarClassNames}>
        <div className={styles.sidebarToggle}>
          <Button
            icon={navigationOpen ? "remove" : "menu"}
            onClick={toggleMenu}
            ariaLabel={"toggle sidebar"}
          />
        </div>
        <div className={styles.sidebarContent}>
          <TableOfContents githubInfo={githubInfo} />
        </div>
      </aside>
    </div>
    </Unstyled>
  );

  function toggleMenu() {
    setNavigationOpen(!navigationOpen);
  }
}

function generateFilePath(githubRepo: string, file?: string, type = "tree") {
  const cleanFileName = file?.slice(1) || "";
  return `${githubRepo}/${type}/master${cleanFileName}`;
}
