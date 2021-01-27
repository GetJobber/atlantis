import { space } from "~theme/space";

export const playground = (containerWidth: number, sideBarWidth: number) => {
  const { large } = space;
  const scrollBarWidth = 16;
  const width = `calc(100vw - ${scrollBarWidth}px - ${large} - ${large} - ${sideBarWidth}px)`;
  const marginLeft = `calc(-50vw + ${scrollBarWidth /
    2}px + ${large} + ${sideBarWidth / 2}px)`;

  return {
    position: "relative",
    left: `50%`,
    right: `50%`,
    my: "larger",
    width,
    marginLeft,

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
};

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

// export const buttons = {
//   display: "none",
// };

// export const button = {
//   bg: "white",
//   border: "1px solid",
//   borderColor: "greyLighter",
// };
