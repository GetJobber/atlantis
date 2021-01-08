/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useConfig } from "docz";
import * as styles from "./styles";
import { Navigation } from "../Navigation";

export function Sidebar() {
  const {
    themeConfig: { sideBarWidth },
  } = useConfig();

  return (
    <Box sx={styles.sidebar(sideBarWidth)}>
      <Navigation />
    </Box>
  );
}
