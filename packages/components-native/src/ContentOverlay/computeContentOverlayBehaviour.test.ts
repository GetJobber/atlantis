import type {
  ContentOverlayConfig,
  ContentOverlayState,
} from "./computeContentOverlayBehaviour";
import { computeContentOverlayBehaviour } from "./computeContentOverlayBehaviour";

const defaultConfig: ContentOverlayConfig = {
  fullScreen: false,
  adjustToContentHeight: false,
  isDraggable: true,
  hasOnBeforeExit: false,
  showDismiss: false,
};

const defaultState: ContentOverlayState = {
  isScreenReaderEnabled: false,
  position: "initial",
};

function aConfig(
  overrides: Partial<ContentOverlayConfig> = {},
): ContentOverlayConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}

function aState(
  overrides: Partial<ContentOverlayState> = {},
): ContentOverlayState {
  return {
    ...defaultState,
    ...overrides,
  };
}

describe("computeContentOverlayBehaviour", () => {
  describe("initialHeight", () => {
    it("returns fullScreen when fullScreen=true", () => {
      const config = aConfig({ fullScreen: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.initialHeight).toBe("fullScreen");
    });

    it("returns contentHeight when adjustToContentHeight=true", () => {
      const config = aConfig({ adjustToContentHeight: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.initialHeight).toBe("contentHeight");
    });

    it("returns contentHeight for default props (legacy case)", () => {
      const config = aConfig();
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.initialHeight).toBe("contentHeight");
    });

    it("returns fullScreen when fullScreen=true even if adjustToContentHeight is also true", () => {
      const config = aConfig({ fullScreen: true, adjustToContentHeight: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.initialHeight).toBe("fullScreen");
    });
  });

  describe("isDraggable", () => {
    it("returns false when onBeforeExit is present regardless of isDraggable prop", () => {
      const config = aConfig({ isDraggable: true, hasOnBeforeExit: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.isDraggable).toBe(false);
    });

    it("returns false when onBeforeExit is present and isDraggable is false", () => {
      const config = aConfig({ isDraggable: false, hasOnBeforeExit: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.isDraggable).toBe(false);
    });

    it("respects isDraggable=true when no onBeforeExit", () => {
      const config = aConfig({ isDraggable: true, hasOnBeforeExit: false });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.isDraggable).toBe(true);
    });

    it("respects isDraggable=false when no onBeforeExit", () => {
      const config = aConfig({ isDraggable: false, hasOnBeforeExit: false });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.isDraggable).toBe(false);
    });
  });

  describe("showDismiss", () => {
    it("returns true when showDismiss prop is true", () => {
      const config = aConfig({ showDismiss: true });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(true);
    });

    it("returns true when screen reader is enabled", () => {
      const config = aConfig({ showDismiss: false });
      const state = aState({ isScreenReaderEnabled: true });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(true);
    });

    it("returns true when fullScreen is true", () => {
      const config = aConfig({ fullScreen: true, showDismiss: false });
      const state = aState({ isScreenReaderEnabled: false });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(true);
    });

    it("returns true when dragged to top and not adjustToContentHeight (legacy behavior)", () => {
      const config = aConfig({
        adjustToContentHeight: false,
        showDismiss: false,
      });
      const state = aState({ position: "top", isScreenReaderEnabled: false });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(true);
    });

    it("returns false when position is top but adjustToContentHeight is true", () => {
      const config = aConfig({
        adjustToContentHeight: true,
        showDismiss: false,
      });
      const state = aState({ position: "top", isScreenReaderEnabled: false });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(false);
    });

    it("returns false when position is initial and no other conditions met", () => {
      const config = aConfig({
        showDismiss: false,
        fullScreen: false,
        adjustToContentHeight: false,
      });
      const state = aState({
        position: "initial",
        isScreenReaderEnabled: false,
      });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(false);
    });

    it("returns false for default props with default state", () => {
      const config = aConfig();
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result.showDismiss).toBe(false);
    });
  });

  describe("combined behaviors", () => {
    it("returns expected behavior for fullScreen overlay", () => {
      const config = aConfig({
        fullScreen: true,
        isDraggable: false,
        showDismiss: true,
      });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result).toEqual({
        initialHeight: "fullScreen",
        isDraggable: false,
        showDismiss: true,
      });
    });

    it("returns expected behavior for content-height overlay with adjustToContentHeight", () => {
      const config = aConfig({
        adjustToContentHeight: true,
        showDismiss: true,
      });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result).toEqual({
        initialHeight: "contentHeight",
        isDraggable: true,
        showDismiss: true,
      });
    });

    it("returns expected behavior for overlay with onBeforeExit (confirmation flow)", () => {
      const config = aConfig({
        adjustToContentHeight: true,
        hasOnBeforeExit: true,
        isDraggable: true,
        showDismiss: true,
      });
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result).toEqual({
        initialHeight: "contentHeight",
        isDraggable: false,
        showDismiss: true,
      });
    });

    it("returns expected behavior for default props (legacy behavior)", () => {
      const config = aConfig();
      const state = aState();

      const result = computeContentOverlayBehaviour(config, state);

      expect(result).toEqual({
        initialHeight: "contentHeight",
        isDraggable: true,
        showDismiss: false,
      });
    });

    it("returns expected behavior for accessibility case where screen reader forces dismiss button", () => {
      const config = aConfig({
        adjustToContentHeight: true,
        showDismiss: false,
      });
      const state = aState({ isScreenReaderEnabled: true });

      const result = computeContentOverlayBehaviour(config, state);

      expect(result).toEqual({
        initialHeight: "contentHeight",
        isDraggable: true,
        showDismiss: true,
      });
    });
  });
});
