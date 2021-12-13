import { computeTimeUnit } from "./computeTimeUnit";

describe("computeTimeUnit", () => {
  describe("when remainder time is not equal to one", () => {
    it("should return a plural unit", () => {
      expect(computeTimeUnit("0123", "day")).toEqual("days");
      expect(computeTimeUnit("0", "minute")).toEqual("minutes");
      expect(computeTimeUnit("0123", "second")).toEqual("seconds");
      expect(computeTimeUnit("0123", "hour")).toEqual("hours");
    });
  });

  describe("when remainder time is equal to one", () => {
    it("should return a singular unit", () => {
      expect(computeTimeUnit("01", "day")).toEqual("day");
      expect(computeTimeUnit("01", "hour")).toEqual("hour");
      expect(computeTimeUnit("01", "minute")).toEqual("minute");
      expect(computeTimeUnit("01", "second")).toEqual("second");
    });
  });
});
