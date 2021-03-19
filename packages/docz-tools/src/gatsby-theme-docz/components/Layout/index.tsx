/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, PropsWithChildren } from "react";
import { useConfig, useCurrentDoc } from "docz";
import { Page } from "@jobber/components/Page";
import * as styles from "./styles";
import { Sidebar } from "../Sidebar";
import { Actions } from "../Actions";

// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";

export function Layout({ children }: PropsWithChildren<{}>) {
  const { name } = useCurrentDoc();
  const {
    themeConfig: { sideBarWidth, containerWidth, hasActions = true },
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
            primaryAction={{ label: "Edit Page", icon: "edit" }}
            moreActionsMenu={[
              {
                actions: [
                  {
                    label: "Atlantis Github",
                    onClick: () => {
                      alert("✏️");
                    },
                  },
                  {
                    label: "Autocomplete Github",
                    onClick: () => {
                      alert("✏️");
                    },
                  },
                ],
              },
            ]}
          >
            {children}
          </Page>
          {/* <Box sx={styles.container(containerWidth)}>{children}</Box> */}
        </Box>
      </Box>
    </Fragment>
  );
}
