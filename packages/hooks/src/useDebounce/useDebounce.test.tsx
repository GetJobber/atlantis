import React, { useEffect, useState } from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should handle multiple calls within the debounce period", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, DEBOUNCE_WAIT));

    result.current("first");

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT / 2);
    });

    result.current("second");

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second");
  });

  it("should not recreate debounced function when options object reference changes", () => {
    const mockFn = jest.fn();

    // Use a function that returns a new options object each time
    const { result, rerender } = renderHook(
      ({ options }) => useDebounce(mockFn, DEBOUNCE_WAIT, options),
      { initialProps: { options: { maxWait: 1000 } } },
    );

    result.current("first");

    // Change options reference but keep the same values
    rerender({ options: { maxWait: 1000 } });

    // Advance timer partially and verify the function hasn't been called yet
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT / 2);
    });
    expect(mockFn).not.toHaveBeenCalled();

    result.current("second");

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    // Should only be called once with the latest value
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

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.type(input, "test");

    expect(debouncedValue.textContent).toBe("");

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT + 100);
    });

    expect(debouncedValue.textContent).toBe("test");
  }, 10_000);

  it("should properly handle options object with maxWait in component", async () => {
    function DebouncedMaxWaitComponent() {
      const [count, setCount] = useState(0);
      const [debouncedCount, setDebouncedCount] = useState(0);

      const options = { maxWait: 1000 };

      const debouncedSetCount = useDebounce(
        (value: number) => {
          setDebouncedCount(value);
        },
        DEBOUNCE_WAIT,
        options,
      );

      return (
        <div>
          <button
            data-testid="increment"
            onClick={() => {
              const newCount = count + 1;
              setCount(newCount);
              debouncedSetCount(newCount);
            }}
            type="button"
          >
            Increment
          </button>
          <div data-testid="count">{count}</div>
          <div data-testid="debounced-count">{debouncedCount}</div>
        </div>
      );
    }

    render(<DebouncedMaxWaitComponent />);

    const incrementButton = screen.getByTestId("increment");
    const debouncedCount = screen.getByTestId("debounced-count");

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(debouncedCount.textContent).toBe("0");

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(debouncedCount.textContent).toBe("3");
  });
});
