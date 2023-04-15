import { getIcon } from "./getIcon";
import { iconMap } from "./iconMap";

it("returns dashboard icon", () => {
  const name = "dashboard";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
  });
  expect(svgClassNames).toBe("icon base");
  expect(pathClassNames).toBe("");
  expect(paths).toEqual(iconMap.icons[name]);
  expect(viewBox).toBe("0 0 720 720");
});

it("returns apple icon", () => {
  const name = "apple";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
  });
  expect(svgClassNames).toBe("icon base");
  expect(pathClassNames).toBe("");
  expect(paths).toEqual(iconMap.icons[name]);
  expect(viewBox).toBe("0 0 720 720");
});

it("returns large arrowDown icon", () => {
  const name = "arrowDown";
  const size = "large";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
    size,
  });
  expect(svgClassNames).toBe(`icon ${size}`);
  expect(pathClassNames).toBe("");
  expect(paths).toEqual(iconMap.icons[name]);
  expect(viewBox).toBe("0 0 720 720");
});

it("returns thumbsDown icon", () => {
  const name = "thumbsDown";
  const mappedName = "thumbsUp";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
  });
  expect(svgClassNames).toBe("icon base thumbsDown");
  expect(pathClassNames).toBe("");
  expect(paths).toEqual(iconMap.icons[mappedName]);
  expect(viewBox).toBe("0 0 720 720");
});

it("returns small more icon", () => {
  const name = "more";
  const size = "small";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
    size,
  });
  expect(svgClassNames).toBe(`icon ${size}`);
  expect(pathClassNames).toBe("");
  expect(paths).toEqual(iconMap.icons[name]);
  expect(viewBox).toBe("0 0 720 720");
});

it("returns truck icon properties", () => {
  const name = "truck";
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
  });
  expect(svgClassNames).toBe("icon base");
  expect(pathClassNames).toBe("");
  expect(paths).toEqual([]);
  expect(viewBox).toBe("0 0 1024 1024");
});
