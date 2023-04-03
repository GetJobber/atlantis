import { create } from "@storybook/theming";
import { JobberStyle } from "@jobber/design/foundation.js";

// eslint-disable-next-line import/no-default-export
export default create({
  base: "light",

  /**
   * Fonts
   */
  fontBase: JobberStyle["typography--fontFamily-normal"],

  /**
   * Inputs, buttons etc within the controls
   */
  inputBg: JobberStyle["color-surface"],
  inputBorder: JobberStyle["color-border"],
  inputBorderRadius: JobberStyle["radius-base"],

  /**
   * Toolbar default and active colors
   */
  barBg: JobberStyle["color-surface--background"],
  barTextColor: JobberStyle["color-text"],
  barSelectedColor: JobberStyle["color-text--secondary"],

  /**
   * Brand Identity
   */
  brandTitle: "🔱 Atlantis",
});
