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

  window.dispatchEvent(new Event("resize"));

  return () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: originalInnerHeight,
    });
    window.dispatchEvent(new Event("resize"));
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
