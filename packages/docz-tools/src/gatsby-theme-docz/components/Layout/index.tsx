/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, PropsWithChildren } from "react";
import { useConfig, useCurrentDoc } from "docz";
import { Page } from "@jobber/components/Page";
import { SectionProps } from "@jobber/components/Menu";
import * as styles from "./styles";
import { Sidebar } from "../Sidebar";

// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";

export function Layout({ children }: PropsWithChildren<{}>) {
  const { name, link, showDirectoryLink } = useCurrentDoc();
  const {
    title,
    repository,
    themeConfig: { sideBarWidth, showActions = true },
  } = useConfig();
  return (
    <Fragment>
      <Box sx={styles.layout}>
        <Box sx={styles.sidebar(sideBarWidth)}>
          <Sidebar />
        </Box>
        <Box sx={styles.content}>
          <Page
            title={name}
            width="narrow"
            primaryAction={getPrimaryAction()}
            moreActionsMenu={getMoreActionsMenu()}
          >
            {children}
          </Page>
        </Box>
      </Box>
    </Fragment>
  );

  function getPrimaryAction() {
    if (!showActions) {
      return undefined;
    }

    if (!link) {
      return undefined;
    }

    return {
      label: "Edit Page",
      icon: "edit",
      external: true,
      url: link,
    };
  }

  function getMoreActionsMenu() {
    let actions: SectionProps = [];

    if (!showActions) {
      return actions;
    }

    if (repository) {
      actions = [
        ...actions,
        {
          actions: [
            {
              label: `${title} on Github`,
              onClick: () => {
                window.open(repository);
              },
            },
          ],
        },
      ];
    }

    if (showDirectoryLink) {
      const directoryLink = link
        .substring(0, link.lastIndexOf("/"))
        .replace("/edit/", "/tree/");

      actions = [
        ...actions,
        {
          actions: [
            {
              label: `${name} on Github`,
              icon: "embed",
              onClick: () => {
                window.open(directoryLink);
              },
            },
          ],
        },
      ];
    }

    return actions;
  }
}
