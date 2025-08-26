export const AtlantisBreakpoints = {
  xs: 0,
  sm: 490,
  md: 768,
  lg: 1080,
  xl: 1440,
};

export const getMappedBreakpointWidth = (
  maxWidth: keyof typeof AtlantisBreakpoints | string | number,
) => {
  if (typeof maxWidth === "number") {
    return `${maxWidth}px`;
  }

  if (AtlantisBreakpoints[maxWidth as keyof typeof AtlantisBreakpoints]) {
    return (
      AtlantisBreakpoints[maxWidth as keyof typeof AtlantisBreakpoints] + "px"
    );
  }

  return maxWidth;
};
