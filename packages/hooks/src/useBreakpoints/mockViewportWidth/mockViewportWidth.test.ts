import { isQueryMatching } from "./mockViewportWidth";

describe("isQueryMatching", () => {
  it.each([["<"], [">"]])("should return false on %s", operator => {
    const result = isQueryMatching(`width ${operator} ${window.innerWidth}`);
    expect(result).toBe(false);
  });

  it.each([["<="], [">="], ["="]])("should return true on %s", operator => {
    const result = isQueryMatching(`width ${operator} ${window.innerWidth}`);
    expect(result).toBe(true);
  });

  it("should return false when the width is not a number", () => {
    const result = isQueryMatching(`width = not-a-number`);
    expect(result).toBe(false);
  });
});
