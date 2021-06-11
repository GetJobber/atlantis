import { renderHook } from "@testing-library/react-hooks";
import { useIsMounted } from "./useIsMounted";

it("should return true when the component is currently mounted", () => {
  const { result } = renderHook(() => useIsMounted());
  const isMounted = result.current;

  expect(isMounted.current).toBe(true);
});

it("should return false when the component is unmounted", () => {
  const { result, unmount } = renderHook(() => useIsMounted());
  const isMounted = result.current;

  unmount();

  expect(isMounted.current).toBe(false);
});
