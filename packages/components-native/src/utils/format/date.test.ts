import {
  accountFormattedDate,
  convertDateToUTC,
  shortFormattedDate,
} from "./date";

describe("with a date having an offset close to the account's timezone", () => {
  let timeZoneName: string;
  let matchingOffsetDate: Date;

  beforeEach(() => {
    timeZoneName = "America/Edmonton";
    // -06 offset should always still be on the same day
    // even if DST kicks in and changes the timezone's offset by an hour
    matchingOffsetDate = new Date("2020-04-20T16:20:00.000-06:00");
  });

  describe("without a recognized accountFormat", () => {
    test("should format the date in the default MM DD, YYYY", () => {
      expect(
        accountFormattedDate(matchingOffsetDate, "", timeZoneName),
      ).toEqual("Apr 20, 2020");
    });
  });

  describe("with a %m/%d/%Y accountFormat", () => {
    test("should format the date correctly", () => {
      expect(
        accountFormattedDate(matchingOffsetDate, "%m/%d/%Y", timeZoneName),
      ).toEqual("04/20/2020");
    });
  });

  describe("with a %d/%m/%Y accountFormat", () => {
    test("should format the date correctly", () => {
      expect(
        accountFormattedDate(matchingOffsetDate, "%d/%m/%Y", timeZoneName),
      ).toEqual("20/04/2020");
    });
  });

  describe("with a %Y-%m-%d accountFormat", () => {
    test("should format the date correctly", () => {
      expect(
        accountFormattedDate(matchingOffsetDate, "%Y-%m-%d", timeZoneName),
      ).toEqual("2020-04-20");
    });
  });

  describe("Handle invalid date", () => {
    const date = new Date("");
    afterEach(() => {
      jest.clearAllMocks();
    });
    test("accountFormattedDate should return empty string", () => {
      expect(accountFormattedDate(date, "%Y-%m-%d", timeZoneName)).toEqual("");
    });
    test("shortFormattedDate should return empty string", () => {
      // @ts-expect-error tsc-ci
      expect(shortFormattedDate(date, "%Y-%m-%d", timeZoneName)).toEqual("");
    });
  });
});

describe("convertDateToUTC", () => {
  it("should return utc date with offest", () => {
    const tzDate = new Date("2020-04-20T16:20:00.000-06:00");
    const utcDate = convertDateToUTC(tzDate);

    expect(tzDate.toString()).toBe(utcDate.toString());
  });
});
