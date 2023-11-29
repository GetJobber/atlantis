import { isQueryMatching } from "./mockViewportWidth";

describe("isQueryMatching", () => {
  it("should return false on max-width", () => {
    const result = isQueryMatching(`max-width: ${window.innerWidth - 1}`);
    expect(result).toBe(false);
  });

  it("should return true on min-width", () => {
    const result = isQueryMatching(`min-width: ${window.innerWidth}`);
    expect(result).toBe(true);
  });

  it("should return false when the width is not a number", () => {
    const result = isQueryMatching(`width = not-a-number`);
    expect(result).toBe(false);
  });
});
