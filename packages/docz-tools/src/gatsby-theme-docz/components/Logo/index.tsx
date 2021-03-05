/** @jsx jsx */
import { Box, Image, jsx } from "theme-ui";
import { Link, useConfig, useCurrentDoc } from "docz";
import * as styles from "./styles";

export function Logo() {
  const { route } = useCurrentDoc();

  if (route === "/") {
    return (
      <Box sx={styles.logo}>
        <LogoInternals />
      </Box>
    );
  }

  return (
    <Link sx={styles.logo} to="/">
      <LogoInternals />
    </Link>
  );
}

function LogoInternals() {
  const {
    themeConfig: { logoUrl },
    title,
  } = useConfig();

  return (
    <Box sx={styles.text}>
      {logoUrl ? <Image sx={styles.image} src={logoUrl} /> : title}
    </Box>
  );
}
