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
      const spy = jest.spyOn(context, "useAtlantisContext");
      spy.mockReturnValueOnce({ ...context.defaultValues, locale: "es" });
      const { result } = renderHook(useAtlantisI18n);

      expect(result.current.t("cancel")).toBe("Cancelar");
    });
  });

  describe("Unsupported language", () => {
    it("should return the english translation", () => {
      const spy = jest.spyOn(context, "useAtlantisContext");
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
});
