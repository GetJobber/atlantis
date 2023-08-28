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
const testDate = new Date("2020-01-01T07:00:00.000Z");

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
      spy.mockReturnValueOnce({ ...context.defaultValues, locale: "es" });
      const { result } = renderHook(useAtlantisI18n);

      expect(result.current.t("cancel")).toBe("Cancelar");
    });
  });

  describe("Unsupported language", () => {
    it("should return the english translation", () => {
      spy.mockReturnValueOnce({ ...context.defaultValues, locale: "fr" });
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
      spy.mockReturnValueOnce({ ...context.defaultValues, locale: "es" });

      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatDate(testDate)).toBe("1 ene 2020");
    });
  });

  describe("formatTime", () => {
    it("should return the formatted time", () => {
      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatTime(testDate)).toBe("7:00 AM");
    });

    it("should return the date formatted for es", () => {
      spy.mockReturnValueOnce({ ...context.defaultValues, locale: "es" });

      const { result } = renderHook(useAtlantisI18n);
      expect(result.current.formatTime(testDate)).toBe("07:00");
    });
  });
});
