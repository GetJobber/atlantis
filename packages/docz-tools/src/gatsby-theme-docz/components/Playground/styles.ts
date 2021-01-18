import { space } from "~theme/space";

export const playground = {
  position: "relative",
  left: `50%`,
  right: `50%`,
  width: `calc(100vw - 15px - var(--space-large) - var(--space-large) - 275px)`,
  marginLeft: `calc(-50vw + 7px + var(--space-large) + 138px)`,
  my: "larger",

  "[data-testid='playground']": {
    bg: "white",
    position: "relative",
    mx: "auto !important",
    width: "900px",

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
} as const;

export const previewWrapper = {
  position: "relative",
} as const;

export const editor = {
  border: "1px solid",
  borderColor: "greyLighter",
  p: "small",
  bg: "greyLightest",
  borderBottomLeftRadius: "base",
  borderBottomRightRadius: "base",

  textarea: {
    outline: "none",
  },
};

export const error = {
  bg: "red",
  my: "smallest",
  p: "large",
  borderRadius: "base",
  color: "white",
  fontSize: "small",
  whiteSpace: "pre-wrap",
} as const;

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
