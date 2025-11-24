import * as jobberHooks from "@jobber/hooks";

export const mockContainerWidth = (exactWidth?: number) => {
  jest.spyOn(jobberHooks, "useResizeObserver").mockReturnValue([
    // @ts-expect-error - TODO: fix this mock ref value
    { current: null },
    {
      width: 1200,
      height: 800,
      exactWidth: exactWidth || 1200,
      exactHeight: 800,
    },
  ]);
};
