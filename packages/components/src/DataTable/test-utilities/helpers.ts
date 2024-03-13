import * as jobberHooks from "../../hooks/useResizeObserver";

export const mockContainerWidth = (exactWidth?: number) => {
  jest.spyOn(jobberHooks, "useResizeObserver").mockReturnValue([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { current: null } as any,
    {
      width: 1200,
      height: 800,
      exactWidth: exactWidth || 1200,
      exactHeight: 800,
    },
  ]);
};
