import { create } from "@storybook/theming";
import { tokens } from "@jobber/design/foundation.js";

// eslint-disable-next-line import/no-default-export
export const lightTheme = create({
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

export const darkTheme = create({
   base: "dark",

  /**
   * Fonts
   */
  fontBase: tokens["typography--fontFamily-normal"],

  /**
   * Inputs, buttons etc within the controls
   */
  inputBg: tokens["color-base-blue--900"],
  inputBorder: tokens["color-base-blue--700"],
  inputBorderRadius: tokens["radius-base"],

  /**
   * Toolbar default and active colors
   */
  barBg: tokens["color-base-blue--1000"],
  barTextColor: tokens["color-base-blue--200"],
  barSelectedColor: tokens["color-base-blue--100"],

 // UI
  appBg: tokens["color-base-blue--1000"],
  appContentBg: tokens["color-base-blue--900"],
  appPreviewBg: tokens["color-base-blue--900"],
  appBorderColor: tokens["color-base-blue--700"],
  appBorderRadius: tokens["radius-base"],


  /**
   * Brand Identity
   */
  brandTitle: "🔱 Atlantis",
})
