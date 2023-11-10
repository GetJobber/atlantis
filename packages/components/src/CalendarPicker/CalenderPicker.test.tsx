import { CalendarPickerPOM, HumanReadablePOM } from "./CalendarPicker.pom";

describe("CalenderPicker", () => {
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

  it("should be able to change daily interval to 2", async () => {
    const interval = 2;
    const { changeIntervalTo, getCurrentInterval, changeCurrentFrequencyTo } =
      CalendarPickerPOM();
    await changeCurrentFrequencyTo("Daily");
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

  it("should generate a default statement for the weekly summary", async () => {
    const { lastRange } = CalendarPickerPOM();

    const { getHumanReadable } = HumanReadablePOM(lastRange());
    expect(getHumanReadable()).toBe("Summary: Weekly");
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
});
