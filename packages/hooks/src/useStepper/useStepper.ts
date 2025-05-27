import { useMemo, useState } from "react";
import invariant from "tiny-invariant";

interface UseStepOptions<StepName extends string> {
  defaultStep?: StepName;
}

export function useStepper<StepName extends string>(
  steps: readonly StepName[],
  options: UseStepOptions<StepName> = {},
) {
  const firstStep = options?.defaultStep ?? steps[0];

  invariant(firstStep, "Steps array cannot be empty");

  const [currentStep, setCurrentStep] = useState(firstStep);

  const currentActiveStep = useMemo(
    () => ({
      currentStep,
      isFirst: currentStep === steps[0],
      isLast: currentStep === steps[steps.length - 1],
    }),
    [currentStep, steps],
  );

  const handlers = useMemo(
    () => ({
      goToStep: (step: StepName) => {
        setCurrentStep(step);
      },

      goToNextStep: () => {
        setCurrentStep(prevCurrentStep => {
          const currentIndex = steps.indexOf(prevCurrentStep);
          const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)];

          invariant(nextStep, `Index out of bounds: ${currentIndex + 1}`);

          return nextStep;
        });
      },

      goToPreviousStep: () => {
        setCurrentStep(prevCurrentStep => {
          const currentIndex = steps.indexOf(prevCurrentStep);
          const previousStep = steps[Math.max(currentIndex - 1, 0)];

          invariant(previousStep, `Index out of bounds: ${currentIndex - 1}`);

          return previousStep;
        });
      },
    }),
    [steps, setCurrentStep],
  );

  return { ...currentActiveStep, ...handlers };
}
