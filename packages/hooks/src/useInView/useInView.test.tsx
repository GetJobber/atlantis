import React from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import { useInView } from "./useInView";

configMocks({ act });
const observer = mockIntersectionObserver();

describe("useInView", () => {
  it("should return true when the target element is in view", () => {
    const { result, rerender } = renderHook(() =>
      useInView<HTMLButtonElement>(),
    );

    const [ref, isInView] = result.current;
    render(<button ref={ref} />);
    rerender();

    expect(result.current[0].current).toBeInstanceOf(HTMLButtonElement);

    observer.leaveNode(screen.getByRole("button"));
    expect(isInView).toBe(false);
  });

  it("should return false when the target element is in view", () => {
    const { result, rerender } = renderHook(() =>
      useInView<HTMLButtonElement>(),
    );

    render(<button ref={result.current[0]} />);
    rerender();

    observer.enterNode(screen.getByRole("button"));
    expect(result.current[1]).toBe(true);
  });
});
