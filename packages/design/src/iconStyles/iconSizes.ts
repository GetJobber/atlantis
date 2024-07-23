export const iconSizes = {
  tokens: {
    small: {
      width: "{base.unit}" as unknown as number,
      height: "{base.unit}" as unknown as number,
    },
    base: {
      width: "calc({base.unit} * 1.5)" as unknown as number,
      height: "calc({base.unit} * 1.5)" as unknown as number,
    },
    large: {
      width: "calc({base.unit} * 2)" as unknown as number,
      height: "calc({base.unit} * 2)" as unknown as number,
    },
  },
};
