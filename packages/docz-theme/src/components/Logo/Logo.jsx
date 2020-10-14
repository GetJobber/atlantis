/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link, useConfig, useCurrentDoc } from "docz";
import * as styles from "./styles";

export function Logo() {
  const {
    themeConfig: { logo },
    title,
  } = useConfig();

  const { route } = useCurrentDoc();
  const isHomePage = route === "/";

  if (isHomePage) {
    return (
      <Box sx={styles.logo}>
        {!logo ? title : <img src={logo} alt={title} sx={styles.image} />}
      </Box>
    );
  }

  return (
    <Box sx={styles.logo}>
      <Link to="/" sx={styles.link}>
        {!logo ? title : <img src={logo} alt={title} sx={styles.image} />}
      </Link>
    </Box>
  );
}
