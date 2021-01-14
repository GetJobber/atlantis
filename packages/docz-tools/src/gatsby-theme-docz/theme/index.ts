import * as colors from "./colors";
import { space } from "./space";
import { fontSizes, fonts, lineHeights } from "./typography";
import { radii } from "./radii";
import { styles } from "./styles";
import { prism } from "./prism";

export default {
  showLiveError: true,
  showLivePreview: true,
  showPlaygroundEditor: true,
  showDarkModeSwitch: false,
  showMarkdownEditButton: true,
  useScopingInPlayground: false,
  sideBarWidth: 275,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  space,
  sizes: space,
  radii,
  prism: {
    default: prism,
    light: prism,
  },
  styles,
};
