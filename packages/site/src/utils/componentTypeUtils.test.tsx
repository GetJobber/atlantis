import { resolveComponentTypeFromRoute } from "./componentTypeUtils";

describe("resolveComponentTypeFromRoute", () => {
  it("defaults to webSupported when no tab and no constraints", () => {
    const result = resolveComponentTypeFromRoute({
      tab: undefined,
      isLegacy: false,
    });

    expect(result).toBe("webSupported");
  });

  it("defaults to web when legacy and web is available", () => {
    const result = resolveComponentTypeFromRoute({
      tab: undefined,
      isLegacy: true,
      availableTypes: ["web", "webSupported"],
    });

    expect(result).toBe("web");
  });

  it("returns null when allowNullWhenNoTab is true and no tab is provided", () => {
    const result = resolveComponentTypeFromRoute({
      tab: undefined,
      isLegacy: false,
      allowNullWhenNoTab: true,
    });

    expect(result).toBeNull();
  });

  it("maps web tab to webSupported when not legacy and webSupported exists", () => {
    const result = resolveComponentTypeFromRoute({
      tab: "web",
      isLegacy: false,
      availableTypes: ["webSupported", "web"],
    });

    expect(result).toBe("webSupported");
  });

  it("maps web tab to web when legacy and web exists", () => {
    const result = resolveComponentTypeFromRoute({
      tab: "web",
      isLegacy: true,
      availableTypes: ["web", "webSupported"],
    });

    expect(result).toBe("web");
  });

  it("maps mobile tab to mobile when available", () => {
    const result = resolveComponentTypeFromRoute({
      tab: "mobile",
      isLegacy: false,
      availableTypes: ["mobile"],
    });

    expect(result).toBe("mobile");
  });

  it("falls back when mobile tab is unavailable", () => {
    const result = resolveComponentTypeFromRoute({
      tab: "mobile",
      isLegacy: false,
      availableTypes: ["webSupported"],
      defaultType: "webSupported",
    });

    expect(result).toBe("webSupported");
  });

  it("resolves implement tab using defaultType and legacy rules", () => {
    const result = resolveComponentTypeFromRoute({
      tab: "implement",
      isLegacy: true,
      availableTypes: ["web", "webSupported"],
      defaultType: "webSupported",
    });

    expect(result).toBe("web");
  });
});
