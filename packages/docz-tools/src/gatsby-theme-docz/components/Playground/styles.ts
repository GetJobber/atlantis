import { space } from "~theme/space";
/**
 * This variable is imported into the styles for `Layout` as a hacky way
 * to style the  playground wrapper without having to shadow the entire
 * playground component.
 */
export const playground = {
  "[data-testid='playground']": {
    bg: "white",
    position: "relative",

    /**
     * Draggable handle on the Playground
     */
    "> div:last-of-type": {
      "> div": {
        right: "0 !important",
        transform: "translateX(calc(100% + 1px))",
        width: `${space.small} !important`,
        bg: "greyLighter",
        borderRadius: "base",

        "&::after": {
          content: `""`,
          display: "block",
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          height: "extravagant",
          width: "smallest",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "white",
        },
      },
    },
  },
};

export const previewWrapper = {
  position: "relative",
};

export const editor = () => ({
  border: "1px solid",
  borderColor: "greyLighter",
  p: "small",
  bg: "greyLightest",
  borderBottomLeftRadius: "base",
  borderBottomRightRadius: "base",

  textarea: {
    outline: "none",
  },
});

export const error = {
  bg: "red",
  my: "smallest",
  p: "large",
  borderRadius: "base",
  color: "white",
  fontSize: "small",
  whiteSpace: "pre-wrap",
};

export const preview = {
  p: "large",
  border: "1px solid",
  borderColor: "greyLighter",
  borderBottom: "none",
  borderTopLeftRadius: "base",
  borderTopRightRadius: "base",
};

export const buttons = {
  display: "none",
};

export const button = {
  bg: "white",
  border: "1px solid",
  borderColor: "greyLighter",
};

/**
 * These must be left in as `gatsby-theme-docz` expects
 * these functionsto exist.
 */
export const wrapper = () => ({});
export const wrapperBorder = () => ({});
