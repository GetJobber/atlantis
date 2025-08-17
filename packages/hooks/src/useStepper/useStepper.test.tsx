import { act, renderHook } from "@testing-library/react";
import { useStepper } from ".";

const steps = ["step1", "step2", "step3"] as const;

describe("useStepper", () => {
  it("initializes with first step when no initial step provided", () => {
    const { result } = renderHook(() => useStepper(steps));

    expect(result.current.currentStep).toBe("step1");
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
  });

  it("initializes with provided initial step", () => {
    const { result } = renderHook(() =>
      useStepper(["step1", "step2", "step3"], {
        defaultStep: "step2",
      }),
    );

    expect(result.current.currentStep).toBe("step2");
    expect(result.current.isFirst).toBe(false);
    expect(result.current.isLast).toBe(false);
  });

  it("moves to next step when nextStep is called", () => {
    const { result } = renderHook(() => useStepper(steps));

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe("step2");
    expect(result.current.isLast).toBe(false);
    expect(result.current.isFirst).toBe(false);
  });

  it("moves to previous step when previousStep is called", () => {
    const { result } = renderHook(() =>
      useStepper(steps, {
        defaultStep: "step2",
      }),
    );

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStep).toBe("step1");
    expect(result.current.isLast).toBe(false);
    expect(result.current.isFirst).toBe(true);
  });

  it("does not move past the last step", () => {
    const { result } = renderHook(() =>
      useStepper(steps, {
        defaultStep: "step3",
      }),
    );

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe("step3");
    expect(result.current.isLast).toBe(true);
    expect(result.current.isFirst).toBe(false);
  });

  it("does not move before the first step", () => {
    const { result } = renderHook(() =>
      useStepper(steps, {
        defaultStep: "step1",
      }),
    );

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStep).toBe("step1");
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
  });

  it("moves to specific step when goToStep is called", () => {
    const { result } = renderHook(() => useStepper(steps));

    act(() => {
      result.current.goToStep("step3");
    });

    expect(result.current.currentStep).toBe("step3");
    expect(result.current.isLast).toBe(true);
    expect(result.current.isFirst).toBe(false);
  });

  describe("error handling", () => {
    it("throws error when steps array is empty", () => {
      expect(() => {
        renderHook(() => useStepper([]));
      }).toThrow(new Error("Invariant failed: Steps array cannot be empty"));
    });
  });
});
