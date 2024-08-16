import { getIcon, iconMap } from "../index";

describe("Hello!", () => {
  it("returns dashboard icon", () => {
    const name = "dashboard";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
      platform: "web",
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
      platform: "web",
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
      platform: "web",
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

  it("returns small more icon", () => {
    const name = "more";
    const size = "small";
    const { svgStyle, paths, viewBox } = getIcon({
      name,
      size,
      platform: "web",
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
      platform: "web",
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
      platform: "web",
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

  describe("thumbsDown", () => {
    it("returns thumbsDown icon for web", () => {
      const name = "thumbsDown";
      const mappedName = "thumbsUp";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        platform: "web",
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

    it("returns thumbsDown icon for mobile", () => {
      const name = "thumbsDown";
      const mappedName = "thumbsUp";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        platform: "mobile",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 24,
        transform: [
          {
            scaleY: -1,
          },
        ],
        verticalAlign: "middle",
        width: 24,
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });
  });

  describe("longArrowUp", () => {
    it("returns longArrowUp icon for web", () => {
      const name = "longArrowUp";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "web",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: "rotate(90deg)",
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });

    it("returns longArrowUp icon for mobile", () => {
      const name = "longArrowUp";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "mobile",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: [
          {
            rotate: "90deg",
          },
        ],
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });
  });

  describe("longArrowDown", () => {
    it("returns longArrowDown icon for web", () => {
      const name = "longArrowDown";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "web",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: "rotate(-90deg)",
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });

    it("returns longArrowDown icon for mobile", () => {
      const name = "longArrowDown";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "mobile",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: [
          {
            rotate: "-90deg",
          },
        ],
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });
  });

  describe("longArrowLeft", () => {
    it("returns longArrowLeft icon for web", () => {
      const name = "longArrowLeft";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "web",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: "rotate(0deg)",
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });

    it("returns longArrowLeft icon for mobile", () => {
      const name = "longArrowLeft";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "mobile",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: [
          {
            rotate: "0deg",
          },
        ],
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });
  });

  describe("longArrowRight", () => {
    it("returns longArrowRight icon for web", () => {
      const name = "longArrowRight";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "web",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: "rotate(180deg)",
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });

    it("returns longArrowRight icon for mobile", () => {
      const name = "longArrowRight";
      const mappedName = "backArrow";
      const size = "large";
      const { svgStyle, paths, viewBox } = getIcon({
        name,
        size,
        platform: "mobile",
      });
      expect(svgStyle).toStrictEqual({
        display: "inline-block",
        fill: "var(--color-icon)",
        height: 32,
        verticalAlign: "middle",
        width: 32,
        transform: [
          {
            rotate: "180deg",
          },
        ],
      });
      expect(paths).toEqual(iconMap.icons[mappedName]);
      expect(viewBox).toBe("0 0 24 24");
    });
  });
});
