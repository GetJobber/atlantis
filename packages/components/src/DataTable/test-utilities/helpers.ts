import * as jobberHooks from "@jobber/hooks/useResizeObserver";

export const mockContainerWidth = (exactWidth?: number) => {
  jest.spyOn(jobberHooks, "useResizeObserver").mockReturnValue([
    { current: null },
    {
      width: 1200,
      height: 800,
      exactWidth: exactWidth || 1200,
      exactHeight: 800,
    },
  ]);
};
