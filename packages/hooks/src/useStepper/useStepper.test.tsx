import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import React from "react";
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
      result.current.nextStep();
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
      result.current.previousStep();
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
      result.current.nextStep();
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
      result.current.previousStep();
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
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => undefined);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("throws error when steps array is empty", () => {
      expect(() => {
        renderHook(() => useStepper([]));
      }).toThrow("Steps array cannot be empty");
    });
  });
});

describe("useStepper implementation", () => {
  it("renders the current step", () => {
    render(<FakeStepperComponent />);

    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("renders the next step when the next step button is clicked", () => {
    render(<FakeStepperComponent />);

    fireEvent.click(screen.getByText("Next step"));

    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("renders the previous step when the previous step button is clicked", () => {
    render(<FakeStepperComponent />);

    fireEvent.click(screen.getByText("Previous step"));

    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });
});

function FakeStepperComponent() {
  const step1 = <div>Step 1</div>;
  const step2 = <div>Step 2</div>;
  const step3 = <div>Step 3</div>;

  const stepMap = {
    step1,
    step2,
    step3,
  };

  const { currentStep, goToStep, nextStep, previousStep } = useStepper(
    ["step1", "step2", "step3"],
    { defaultStep: "step2" },
  );

  return (
    <div>
      {stepMap[currentStep]}
      <button onClick={() => goToStep("step2")}>Go to step 2</button>
      <button onClick={() => nextStep()}>Next step</button>
      <button onClick={() => previousStep()}>Previous step</button>
    </div>
  );
}
