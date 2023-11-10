import { CalendarPickerPOM, HumanReadablePOM } from "./CalendarPicker.pom";

describe("CalenderPicker Base Functions", () => {
  it("should be able to change frequency to Daily", async () => {
    const frequency = "Daily";
    const { changeCurrentFrequencyTo, getCurrentFrequency } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo(frequency);
    const currentFrequency = await getCurrentFrequency();
    expect(currentFrequency).toEqual(frequency);
  });

  it("should be able to change frequency to Weekly", async () => {
    const frequency = "Weekly";
    const { changeCurrentFrequencyTo, getCurrentFrequency } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo(frequency);
    const currentFrequency = await getCurrentFrequency();
    expect(currentFrequency).toEqual(frequency);
  });

  it("should be able to change frequency to Monthly", async () => {
    const frequency = "Monthly";
    const { changeCurrentFrequencyTo, getCurrentFrequency } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo(frequency);
    const currentFrequency = await getCurrentFrequency();
    expect(currentFrequency).toEqual(frequency);
  });

  it("should be able to change frequency to Yearly", async () => {
    const frequency = "Yearly";
    const { changeCurrentFrequencyTo, getCurrentFrequency } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo(frequency);
    const currentFrequency = await getCurrentFrequency();
    expect(currentFrequency).toEqual(frequency);
  });

  it("should be able to change daily interval to 2", async () => {
    const interval = 2;
    const { changeIntervalTo, getCurrentInterval, changeCurrentFrequencyTo } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo("Daily");
    await changeIntervalTo(interval);
    const currentInterval = await getCurrentInterval();
    expect(currentInterval).toEqual(interval);
  });

  it("should be able to change weekly interval to 2", async () => {
    const interval = 2;
    const { changeIntervalTo, getCurrentInterval } = CalendarPickerPOM();
    await changeIntervalTo(interval);
    const currentInterval = await getCurrentInterval();
    expect(currentInterval).toEqual(interval);
  });

  it("should be able to change monthly interval to 2", async () => {
    const interval = 2;
    const { changeIntervalTo, getCurrentInterval, changeCurrentFrequencyTo } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo("Monthly");
    await changeIntervalTo(interval);
    const currentInterval = await getCurrentInterval();
    expect(currentInterval).toEqual(interval);
  });

  it("should be able to change yearly interval to 2", async () => {
    const interval = 2;
    const { changeIntervalTo, getCurrentInterval, changeCurrentFrequencyTo } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo("Yearly");
    await changeIntervalTo(interval);
    const currentInterval = await getCurrentInterval();
    expect(currentInterval).toEqual(interval);
  });
});
describe("Calender Picker Human Readable", () => {
  it("should generate a default statement for the daily summary", async () => {
    const { lastRange, changeCurrentFrequencyTo } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Daily");
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Summary: Daily");
  });

  it("should generate a default statement for the weekly summary", async () => {
    const { lastRange } = CalendarPickerPOM();

    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Summary: Weekly");
  });

  it("should generate a default statement for the monthly summary", async () => {
    const { lastRange, changeCurrentFrequencyTo } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Monthly");
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Summary: Monthly");
  });

  it("should generate a default statement for the yearly summary", async () => {
    const { lastRange, changeCurrentFrequencyTo } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Yearly");
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Summary: Yearly");
  });

  it("should generate a coherant statement for a yearly interval of more than one", async () => {
    const { lastRange, changeIntervalTo, changeCurrentFrequencyTo } =
      CalendarPickerPOM();

    await changeCurrentFrequencyTo("Yearly");
    await changeIntervalTo(2);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Every 2 years");
  });

  it("should generate a coherant statement for a weekly interval of more than one", async () => {
    const { lastRange, changeIntervalTo, changeCurrentFrequencyTo } =
      CalendarPickerPOM();

    await changeCurrentFrequencyTo("Weekly");
    await changeIntervalTo(2);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Every 2 weeks ");
  });

  it("should generate a coherant statement for a weekly interval of more than one with two days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Weekly");
    await changeIntervalTo(2);
    await clickButtonsByIndex([2, 4]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Every 2 weeks  on Tuesday,  and Thursday");
  });

  it("should generate a coherant statement for a weekly interval with all days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Weekly");
    await changeIntervalTo(2);
    await clickButtonsByIndex([0, 1, 2, 3, 4, 5, 6]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe(
      "Every 2 weeks  on Sunday, Monday, Tuesday, Wednesday, Thursday, Friday,  and Saturday",
    );
  });
});

describe("Calender Picker Human Readable Monthly", () => {
  it("should generate a coherant statement for a monthly interval with some days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Monthly");
    await changeIntervalTo(2);
    await clickButtonsByIndex([2, 3, 4, 5, 6]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe(
      "Every 2 months  on the 3rd, 4th, 5th, 6th, and 7th days of the month",
    );
  });

  it("should generate a coherant statement for a monthly interval with all days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Monthly");
    await changeIntervalTo(2);
    await clickButtonsByIndex([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe(
      "Every 2 months  on the 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th, 17th, 18th, 19th, 20th, 21st, 22nd, 23rd, 24th, 25th, 26th, 27th, 28th, 29th, 30th, 31st, and last days of the month",
    );
  });

  it("should generate a coherant statement for a monthly interval with some week days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
      toggleMonthRadio,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Monthly");
    await toggleMonthRadio();
    await changeIntervalTo(2);
    await clickButtonsByIndex([2, 3, 4, 5, 6]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe(
      "Every 2 months on the 1st Tuesday  and 1st Wednesday  and 1st Thursday  and 1st Friday  and 1st Saturday",
    );
  });
  it("should generate a coherant statement for a monthly interval with all week days picked", async () => {
    const {
      lastRange,
      changeIntervalTo,
      changeCurrentFrequencyTo,
      clickButtonsByIndex,
      toggleMonthRadio,
    } = CalendarPickerPOM();

    await changeCurrentFrequencyTo("Monthly");
    await toggleMonthRadio();
    await changeIntervalTo(2);
    await clickButtonsByIndex([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27,
    ]);
    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe(
      "Every 2 months on the 1st Sunday  and 1st Monday  and 1st Tuesday  and 1st Wednesday  and 1st Thursday  and 1st Friday  and 1st Saturday  and 2nd Sunday  and 2nd Monday  and 2nd Tuesday  and 2nd Wednesday  and 2nd Thursday  and 2nd Friday  and 2nd Saturday  and 3rd Sunday  and 3rd Monday  and 3rd Tuesday  and 3rd Wednesday  and 3rd Thursday  and 3rd Friday  and 3rd Saturday  and 4th Sunday  and 4th Monday  and 4th Tuesday  and 4th Wednesday  and 4th Thursday  and 4th Friday  and 4th Saturday",
    );
  });
});
