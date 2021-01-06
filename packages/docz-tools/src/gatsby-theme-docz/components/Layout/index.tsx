/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, PropsWithChildren } from "react";
import { Global } from "@emotion/react";
import * as styles from "./styles";
import { global } from "~theme/global";

// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Global styles={global} />
      <Box sx={styles.layout}>
        <Box sx={styles.sidebar}></Box>
        <Box sx={styles.content}>
          <Box sx={styles.container}>{children}</Box>
        </Box>
      </Box>
    </Fragment>
  );
}
