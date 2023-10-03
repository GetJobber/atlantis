import { create } from "@storybook/theming";
import { tokens } from "@jobber/design/foundation.js";

// eslint-disable-next-line import/no-default-export
export default create({
  base: "light",

  /**
   * Fonts
   */
  fontBase: tokens["typography--fontFamily-normal"],

  /**
   * Inputs, buttons etc within the controls
   */
  inputBg: tokens["color-surface"],
  inputBorder: tokens["color-border"],
  inputBorderRadius: tokens["radius-base"],

  /**
   * Toolbar default and active colors
   */
  barBg: tokens["color-surface--background"],
  barTextColor: tokens["color-text"],
  barSelectedColor: tokens["color-text--secondary"],

  /**
   * Brand Identity
   */
  brandTitle: "🔱 Atlantis",
});
