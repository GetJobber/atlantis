import React, { PropsWithChildren, useState } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/addon-docs";
import { Button } from "@jobber/components/Button";
import { Box } from "@jobber/components/Box";
import { Banner } from "@jobber/components/Banner";
import styles from "./DocsWithSidebar.css";
import { TableOfContents } from "../TableOfContents";

export function DocsWithSidebar({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) {
  const [hidden,setHidden] = useState(localStorage.getItem('toggleNewDocs') === 'true');

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
  const newDocs = () => {
    localStorage.removeItem('nolikeynewsite')
    window.parent.location.href = '/'
  }
  const toggleTab = () => {
    setHidden(!hidden)
    localStorage.setItem('toggleNewDocs', !hidden ? 'true' : 'false')
  }

  return (
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
      <div style={{
        position:'fixed',
        bottom:0,
        left: hidden ? -195 : 0,
        borderTopRightRadius:'var(--radius-base)',
        backgroundColor:'var(--color-surface)',
        border:'1px solid var(--color-border)',
        transition:'left 0.3s'
      }}>
        <Box direction="row">
          <Button label="View the new docs site" type='tertiary' onClick={newDocs} />
          <Button onClick={toggleTab} icon={hidden ? 'arrowRight' : "arrowLeft"} ariaLabel="hide" type='tertiary' variation="subtle" />
        </Box>
      </div>
    </div>
  );

  function toggleMenu() {
    setNavigationOpen(!navigationOpen);
  }
}

function generateFilePath(githubRepo: string, file?: string, type = "tree") {
  const cleanFileName = file?.slice(1) || "";
  return `${githubRepo}/${type}/master${cleanFileName}`;
}
