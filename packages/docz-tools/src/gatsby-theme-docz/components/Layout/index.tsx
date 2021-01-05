/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment } from "react";
import { Global } from "@emotion/react";
import * as styles from "./styles";
import { global } from "../../theme/global";

export function Layout({ children }) {
  return (
    <Fragment>
      <Global styles={global} />
      <Box sx={styles.layout}>
        <Box></Box>
        <Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Fragment>
  );
}
