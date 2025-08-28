/**
 * Test utility for mocking a large viewport using Jest spies
 * This is useful for testing components that use floating-ui and
 * have flip middleware.
 */

interface ViewportMock {
  restore: () => void;
}

/**
 * Mocks a large viewport (2000x2000) for testing tooltips and popovers
 * that need sufficient space for positioning.
 *
 * @returns Object with restore method for cleanup
 *
 * @example
 * ```typescript
 * describe("with a preferred placement", () => {
 *   let viewportMock: ReturnType<typeof mockLargeViewport>;
 *
 *   beforeEach(() => {
 *     viewportMock = mockLargeViewport();
 *   });
 *
 *   afterEach(() => {
 *     viewportMock.restore();
 *   });
 *
 *   // tests...
 * });
 * ```
 */
export function mockLargeViewport(): ViewportMock {
  const clientWidthSpy = jest
    .spyOn(document.documentElement, "clientWidth", "get")
    .mockReturnValue(2000);
  const clientHeightSpy = jest
    .spyOn(document.documentElement, "clientHeight", "get")
    .mockReturnValue(2000);

  return {
    restore: () => {
      clientWidthSpy.mockRestore();
      clientHeightSpy.mockRestore();
    },
  };
}
