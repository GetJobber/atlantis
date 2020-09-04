/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, useConfig } from "docz";
import * as styles from "./styles";

export function Logo() {
  const {
    themeConfig: { logo },
    title,
  } = useConfig();
  return (
    <div sx={styles.logo}>
      <Link to="/" sx={styles.link}>
        {!logo ? title : <img src={logo} alt={title} sx={styles.image} />}
      </Link>
    </div>
  );
}
