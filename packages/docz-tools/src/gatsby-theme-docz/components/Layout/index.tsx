/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, PropsWithChildren } from "react";
import { useConfig } from "docz";
import * as styles from "./styles";
import { Sidebar } from "../Sidebar";
import { Actions } from "../Actions";

// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";

export function Layout({ children }: PropsWithChildren<{}>) {
  const {
    themeConfig: { sideBarWidth, containerWidth },
  } = useConfig();

  return (
    <Fragment>
      <Box sx={styles.layout}>
        <Box sx={styles.sidebar(sideBarWidth)}>
          <Sidebar />
        </Box>
        <Actions />
        <Box sx={styles.content}>
          <Box sx={styles.container(containerWidth)}>{children}</Box>
        </Box>
      </Box>
    </Fragment>
  );
}
