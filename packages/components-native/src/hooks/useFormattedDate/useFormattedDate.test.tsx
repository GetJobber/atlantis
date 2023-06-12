import { renderHook } from "@testing-library/react-hooks";
import { useFormattedDate } from "./useFormattedDate";

describe("useFormattedDate", () => {
  const date = new Date("2021-09-01T16:00:00-04:00");

  it("applies accountFormat correctly", () => {
    const accountFormattedDate = "Sep 01, 2021";
    const { result } = renderHook(() => {
      return useFormattedDate();
    });
    const formattedDate = result.current(date, "accountFormat");
    expect(formattedDate).toEqual(accountFormattedDate);
  });

  it("applies shorthand correctly", () => {
    const shortHandDate = "Sep 01";
    const { result } = renderHook(() => {
      return useFormattedDate();
    });
    const formattedDate = result.current(date, "shorthand");
    expect(formattedDate).toEqual(shortHandDate);
  });

  it("applies ISO8601 correctly", () => {
    const isoDate = "2021-09-01";
    const { result } = renderHook(() => {
      return useFormattedDate();
    });
    const formattedDate = result.current(date, "ISO8601");
    expect(formattedDate).toEqual(isoDate);
  });
});
