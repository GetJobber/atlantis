import { renderHook } from "@testing-library/react-native";
import { useAtlantisI18n } from ".";
import en from "./locales/en.json";
import es from "./locales/es.json";
import * as context from "../../AtlantisContext";

jest.mock("../../AtlantisContext", () => ({
  // need to mark this as a module so that we can spy on it
  __esModule: true,
  ...jest.requireActual("../../AtlantisContext"),
}));

const spy = jest.spyOn(context, "useAtlantisContext");
const testDate = new Date("2020-01-01T00:00:00.000Z");
const dateAfterSpringForward = new Date("2020-04-10T00:00:00.000Z");

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(testDate);
});

describe("useAtlantisI18n", () => {
  it("should return english by default", () => {
    const { result } = renderHook(useAtlantisI18n);

    expect(result.current.t("cancel")).toBe("Cancel");
  });

  it("should interpolate the strings wrapped in {}", () => {
    const { result } = renderHook(useAtlantisI18n);

    expect(result.current.t("FormatFile.preview", { item: "🔱" })).toBe(
      "Preview 🔱",
    );
  });

  describe("Español", () => {
    it("should return español", () => {
      spy.mockReturnValueOnce({
        ...context.atlantisContextDefaultValues,
        locale: "es",
      });
      const { result } = renderHook(useAtlantisI18n);

      expect(result.current.t("cancel")).toBe("Cancelar");
    });
  });

  describe("Unsupported language", () => {
    it("should return the english translation", () => {
      spy.mockReturnValueOnce({
        ...context.atlantisContextDefaultValues,
        locale: "fr",
      });
      const { result } = renderHook(useAtlantisI18n);

      expect(result.current.t("cancel")).toBe("Cancel");
    });
  });

  describe("Translation files", () => {
    it("should have the same keys for en and es", () => {
      expect(Object.keys(en)).toEqual(Object.keys(es));
    });
  });

  describe("formatDate", () => {
    it("should return the formatted date", () => {
      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatDate(testDate)).toBe("Jan 1, 2020");
    });

    it("should return the date formatted for es", () => {
      spy.mockReturnValueOnce({
        ...context.atlantisContextDefaultValues,
        locale: "es",
      });

      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatDate(testDate)).toBe("1 ene 2020");
    });

    describe("Timezone", () => {
      it.each([
        ["America/New_York", "Dec 31, 2019"],
        ["America/Chicago", "Dec 31, 2019"],
        ["America/Denver", "Dec 31, 2019"],
        ["Europe/London", "Jan 1, 2020"],
        ["Australia/Sydney", "Jan 1, 2020"],
      ])("should return the %s time", (timeZone, expected) => {
        spy.mockReturnValueOnce({
          ...context.atlantisContextDefaultValues,
          timeZone,
        });

        const { result } = renderHook(useAtlantisI18n);
        expect(result.current.formatDate(testDate)).toBe(expected);
      });
    });
  });

  describe("formatTime", () => {
    it("should return the formatted time", () => {
      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatTime(testDate)).toBe("12:00 AM");
    });

    it("should return the date formatted for es", () => {
      spy.mockReturnValueOnce({
        ...context.atlantisContextDefaultValues,
        locale: "es",
      });

      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatTime(testDate)).toBe("00:00");
    });

    describe("Timezone", () => {
      it.each([
        ["America/New_York", "7:00 PM"],
        ["America/Chicago", "6:00 PM"],
        ["America/Denver", "5:00 PM"],
        ["Europe/London", "12:00 AM"],
        ["Australia/Sydney", "11:00 AM"],
      ])("should return the %s zoned time", (timeZone, expected) => {
        spy.mockReturnValueOnce({
          ...context.atlantisContextDefaultValues,
          timeZone,
        });

        const { result } = renderHook(useAtlantisI18n);
        expect(result.current.formatTime(testDate)).toBe(expected);
      });

      it.each([
        ["America/New_York", "8:00 PM"],
        ["America/Chicago", "7:00 PM"],
        ["America/Denver", "6:00 PM"],
        ["Europe/London", "1:00 AM"],
        ["Australia/Sydney", "10:00 AM"],
      ])("should return the %s spring zoned time", (timeZone, expected) => {
        spy.mockReturnValueOnce({
          ...context.atlantisContextDefaultValues,
          timeZone,
        });

        const { result } = renderHook(useAtlantisI18n);
        expect(result.current.formatTime(dateAfterSpringForward)).toBe(
          expected,
        );
      });
    });
  });
});
