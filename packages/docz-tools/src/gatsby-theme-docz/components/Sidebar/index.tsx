/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useConfig } from "docz";
import * as styles from "./styles";
import { Navigation } from "../Navigation";
import { Logo } from "../Logo";

export function Sidebar() {
  const {
    themeConfig: { sideBarWidth },
  } = useConfig();

  return (
    <Box sx={styles.sidebar(sideBarWidth)}>
      <Logo />
      <Navigation />
    </Box>
  );
}
