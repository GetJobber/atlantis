import { getIcon, iconMap } from "../index";

describe("Hello!", () => {
  it("returns dashboard icon", () => {
    const name = "dashboard";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 24,
      verticalAlign: "middle",
      width: 24,
    });
    expect(paths).toEqual(iconMap.icons[name]);
    expect(viewBox).toBe("0 0 24 24");
  });

  it("returns apple icon", () => {
    const name = "apple";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 24,
      verticalAlign: "middle",
      width: 24,
    });
    expect(paths).toEqual(iconMap.icons[name]);
    expect(viewBox).toBe("0 0 24 24");
  });

  it("returns large arrowDown icon", () => {
    const name = "arrowDown";
    const size = "large";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
      size,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 32,
      verticalAlign: "middle",
      width: 32,
    });
    expect(paths).toEqual(iconMap.icons[name]);
    expect(viewBox).toBe("0 0 24 24");
  });

  it("returns thumbsDown icon", () => {
    const name = "thumbsDown";
    const mappedName = "thumbsUp";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 24,
      transform: "scaleY(-1)",
      verticalAlign: "middle",
      width: 24,
    });
    expect(paths).toEqual(iconMap.icons[mappedName]);
    expect(viewBox).toBe("0 0 24 24");
  });

  it("returns small more icon", () => {
    const name = "more";
    const size = "small";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
      size,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 16,
      verticalAlign: "middle",
      width: 16,
    });
    expect(paths).toEqual(iconMap.icons[name]);
    expect(viewBox).toBe("0 0 24 24");
  });

  it("returns truck icon properties", () => {
    const name = "truck";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
    });
    expect(svgStyle).toStrictEqual({
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 24,
      verticalAlign: "middle",
      width: 24,
    });
    expect(paths).toEqual([]);
    expect(viewBox).toBe("0 0 1024 1024");
  });

  it("returns runningTimer icon properties", () => {
    const name = "runningTimer";
    const { svgStyle } = getIcon({
      name,
    });
    expect(svgStyle).toStrictEqual({
      animationDuration: "5s",
      animationIterationCount: "infinite",
      animationName: "spinning",
      animationTimingFunction: "linear",
      display: "inline-block",
      fill: "var(--color-icon)",
      height: 24,
      verticalAlign: "middle",
      width: 24,
    });
  });
});
