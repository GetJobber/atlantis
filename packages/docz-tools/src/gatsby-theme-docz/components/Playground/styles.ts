import { media } from "gatsby-theme-docz/src/theme/breakpoints";
import { space } from "~theme/space";

export const playground = (containerWidth: number, sideBarWidth: number) => {
  const { large } = space;
  const scrollBarWidth = 16;
  const width = `calc(100vw - ${scrollBarWidth}px - ${large} - ${large} - ${sideBarWidth}px)`;
  const marginLeft = `calc(-50vw + ${scrollBarWidth / 2}px + ${large} + ${
    sideBarWidth / 2
  }px)`;

  return {
    position: "relative",
    left: `50%`,
    right: `50%`,
    marginY: "larger",
    width,
    marginLeft,
    [media.desktop]: {
      position: "static",
      width: "100%",
      marginLeft: 0,
    },

    "[data-testid='playground']": {
      bg: "surface--background",
      position: "relative",
      marginX: "auto !important",
      width: "900px",

      /**
       * Draggable handle on the Playground
       */
      "> div:last-of-type": {
        "> div": {
          right: "0 !important",
          transform: "translateX(calc(100% + 1px))",
          width: `${space.small} !important`,
          bg: "surface--background",
          borderRadius: "base",
          [media.desktop]: {
            display: "none",
          },

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
            borderColor: "border",
          },
        },
      },
    },
  } as const;
};

export const previewWrapper = {
  position: "relative",
} as const;

export const editor = {
  border: "1px solid",
  borderColor: "border",
  padding: "small",
  bg: "surface--background",
  borderBottomLeftRadius: "base",
  borderBottomRightRadius: "base",

  textarea: {
    outline: "none",
  },
};

export const error = {
  bg: "critical",
  marginY: "smallest",
  padding: "large",
  borderRadius: "base",
  color: "text--reverse",
  fontSize: "small",
  whiteSpace: "pre-wrap",
} as const;

export const preview = {
  padding: "large",
  border: "1px solid",
  borderColor: "border",
  borderBottom: "none",
  borderTopLeftRadius: "base",
  borderTopRightRadius: "base",
};
