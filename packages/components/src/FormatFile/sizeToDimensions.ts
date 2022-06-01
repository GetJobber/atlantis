export const sizeToDimensions = {
  default: {
    width: 56,
    height: 56,
  },
  large: {
    width: 168,
    height: 168,
  },
};

export type DisplaySize = keyof typeof sizeToDimensions;
