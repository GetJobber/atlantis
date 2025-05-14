import React, { useEffect, useState } from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { useDebounce } from "./useDebounce";

const DEBOUNCE_WAIT = 300;

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should debounce the function call", async () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, DEBOUNCE_WAIT));

    result.current("test");
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).toHaveBeenCalledWith("test");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should cancel pending debounced calls on unmount", () => {
    const mockFn = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDebounce(mockFn, DEBOUNCE_WAIT),
    );

    result.current("test");
    unmount();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should handle multiple calls within the debounce period", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, DEBOUNCE_WAIT));

    result.current("first");

    // Fast-forward half the debounce time
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT / 2);
    });

    result.current("second");

    // Fast-forward remaining debounce time
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second");
  });

  it("should work with React components", async () => {
    function DebouncedComponent() {
      const [value, setValue] = useState("");
      const [debouncedValue, setDebouncedValue] = useState("");

      const debouncedSetValue = useDebounce((newValue: string) => {
        setDebouncedValue(newValue);
      }, DEBOUNCE_WAIT);

      useEffect(() => {
        debouncedSetValue(value);
      }, [value, debouncedSetValue]);

      return (
        <div>
          <input
            data-testid="input"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div data-testid="debounced-value">{debouncedValue}</div>
        </div>
      );
    }

    render(<DebouncedComponent />);

    const input = screen.getByTestId("input") as HTMLInputElement;
    const debouncedValue = screen.getByTestId("debounced-value");

    // Using fireEvent instead of userEvent
    fireEvent.change(input, { target: { value: "test" } });

    expect(debouncedValue.textContent).toBe("");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT + 100);
    });

    expect(debouncedValue.textContent).toBe("test");
  }, 10000); // 10 second timeout
});
