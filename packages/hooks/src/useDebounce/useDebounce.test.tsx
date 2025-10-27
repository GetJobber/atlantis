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

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).toHaveBeenCalledWith("test");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should cancel pending debounced calls on unmount", async () => {
    const mockFn = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDebounce(mockFn, DEBOUNCE_WAIT),
    );

    result.current("test");
    unmount();

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should handle multiple calls within the debounce period", async () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, DEBOUNCE_WAIT));

    result.current("first");

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT / 2);
    });

    result.current("second");

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second");
  });

  it("should not recreate debounced function when options object reference changes", () => {
    const mockFn = jest.fn();
    const debounceEgdesOption: Array<"leading" | "trailing"> = ["trailing"];

    // Use a function that returns a new options object each time
    const { result, rerender } = renderHook(
      ({ options }) => useDebounce(mockFn, DEBOUNCE_WAIT, options),
      { initialProps: { options: { edges: debounceEgdesOption } } },
    );
    const debounceRef = result.current;

    rerender({ options: { edges: debounceEgdesOption } });

    expect(debounceRef).toBe(result.current);
  });

  it("should not recreate debounced function when options config changes", async () => {
    const mockFn = jest.fn();
    // Largely arbitrary, this value x 2 must simply be less than the debounce wait
    const TIME_INCREMENT_LESSER_THAN_DEBOUNCE_WAIT = 1;
    // Start with trailing edge
    const debounceEgdesOption: Array<"leading" | "trailing"> = ["trailing"];

    // Use a function that returns a new options object each time
    const { result, rerender } = renderHook(
      ({ options }) => useDebounce(mockFn, DEBOUNCE_WAIT, options),
      { initialProps: { options: { edges: debounceEgdesOption } } },
    );

    result.current("first");

    await act(async () => {
      jest.advanceTimersByTime(TIME_INCREMENT_LESSER_THAN_DEBOUNCE_WAIT);
    });

    expect(mockFn).not.toHaveBeenCalled();

    // This means it calls immediately at the leading edge of the timeout.
    rerender({ options: { edges: ["leading"] } });

    result.current("second");

    await act(async () => {
      jest.advanceTimersByTime(TIME_INCREMENT_LESSER_THAN_DEBOUNCE_WAIT);
    });

    // The config change should be ignored, options are hardcoded
    expect(mockFn).not.toHaveBeenCalled();
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

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT + 100);
    });

    expect(debouncedValue.textContent).toBe("test");
  }, 10_000);

  it("should properly handle options object", async () => {
    function DebouncedComponent() {
      const [count, setCount] = useState(0);
      const [debouncedCount, setDebouncedCount] = useState(0);

      const options: { edges: Array<"leading" | "trailing"> } = {
        edges: ["leading", "trailing"],
      };

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

    render(<DebouncedComponent />);

    const incrementButton = screen.getByTestId("increment");
    const debouncedCount = screen.getByTestId("debounced-count");

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    await user.click(incrementButton);

    // With leading edge, the value should be updated immediately
    expect(debouncedCount.textContent).toBe("1");

    await user.click(incrementButton);
    await user.click(incrementButton);

    // Additional clicks shouldn't update immediately (debounced)
    expect(debouncedCount.textContent).toBe("1");

    // After the debounce period, the trailing edge should update with the latest value
    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT);
    });

    expect(debouncedCount.textContent).toBe("3");
  });

  it("should abort debounced function when signal is aborted", async () => {
    const mockFn = jest.fn();
    const controller = new AbortController();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DEBOUNCE_WAIT, { signal: controller.signal }),
    );

    result.current("test");

    await act(async () => {
      controller.abort();
    });

    await act(async () => {
      jest.advanceTimersByTime(DEBOUNCE_WAIT + 100);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });
});
