import React from "react";
import { cleanup, render } from "@testing-library/react";
import { CivilDate } from "@std-proposal/temporal";
import { FormatDate, strFormatDate } from "./FormatDate";

afterEach(cleanup);

describe("Different date values", () => {
  const dates = {
    CivilDate: new CivilDate(2020, 2, 26),
    ISO8601DateString: "2019-03-30T00:45",
    Date: new Date("2020-03-30T00:45"),
  };

  const mockDateResult = [`Feb 26, 2020`, `Mar 30, 2019`, `Mar 30, 2020`];

  Object.entries(dates).forEach(([inputType, value], index) => {
    it(`renders a formatted date from ${inputType}`, async () => {
      const { findByText } = render(<FormatDate date={value} />);
      expect(
        await findByText(strFormatDate(new Date(mockDateResult[index]))),
      ).toBeDefined();
    });
  });
});

describe("strFormatDate", () => {
  const expectedDateString = "Jan 4, 1992";
  const expectedDate = new Date(expectedDateString);
  const mockLocale = undefined;
  const mockLocaleDateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const mockLocaleDateFormatWithYear: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  it("should return the right locale date format", () => {
    const mockDateSpy = jest.spyOn(Date.prototype, "toLocaleDateString");
    strFormatDate(expectedDate);
    expect(mockDateSpy).toHaveBeenCalledWith(
      mockLocale,
      mockLocaleDateFormatWithYear,
    );
  });

  it("should return the proper date format", () => {
    expect(strFormatDate(expectedDate)).toBe(
      new Date(expectedDateString).toLocaleDateString(
        mockLocale,
        mockLocaleDateFormatWithYear,
      ),
    );
  });

  it("should return the proper date format with year is hidden", () => {
    expect(strFormatDate(expectedDate, false)).toBe(
      new Date(expectedDateString).toLocaleDateString(
        mockLocale,
        mockLocaleDateFormat,
      ),
    );
  });
});
