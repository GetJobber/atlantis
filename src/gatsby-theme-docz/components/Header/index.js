/** @jsx jsx */
import { jsx } from "theme-ui";
import * as styles from "./styles";
import { HeaderButtons } from "../HeaderButtons";

export const Header = () => (
  <div sx={styles.buttons}>
    <HeaderButtons />
  </div>
);
