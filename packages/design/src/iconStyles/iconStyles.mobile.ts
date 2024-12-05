import { webIconStyles } from "./iconStyles.web";

export const mobileIconStyles: Record<string, object> = {
  ...webIconStyles,
  longArrowUp: {
    transform: [
      {
        rotate: "90deg",
      },
    ],
  },
  longArrowDown: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  longArrowRight: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  longArrowLeft: {
    transform: [
      {
        rotate: "0deg",
      },
    ],
  },
  thumbsDown: {
    transform: [
      {
        scaleY: -1,
      },
    ],
  },
};
