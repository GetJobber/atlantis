export interface ViewportDimensions {
  readonly width?: number;
  readonly height?: number;
}

export function mockViewport({
  width,
  height,
}: ViewportDimensions): () => void {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  if (typeof width === "number") {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: width,
    });
  }

  if (typeof height === "number") {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: height,
    });
  }

  // Wrap resize in act to avoid warnings during tests
  try {
    const { act } = require("@testing-library/react");

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
  } catch {
    window.dispatchEvent(new Event("resize"));
  }

  return () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: originalInnerHeight,
    });

    try {
      const { act } = require("@testing-library/react");

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });
    } catch {
      window.dispatchEvent(new Event("resize"));
    }
  };
}

export async function withMockedViewport(
  dimensions: ViewportDimensions,
  run: () => Promise<void> | void,
): Promise<void> {
  const restore = mockViewport(dimensions);

  try {
    await run();
  } finally {
    restore();
  }
}
