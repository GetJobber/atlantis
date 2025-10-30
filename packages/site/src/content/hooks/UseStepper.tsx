import { useStepper } from "@jobber/hooks/useStepper";
import { Button, Flex } from "@jobber/components";

export function UseStepper() {
  const steps = ["step1", "step2", "step3"] as const;

  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    isFirst,
    isLast,
    goToStep,
  } = useStepper(steps, {
    defaultStep: "step1", // optional
  });

  return (
    <div>
      {currentStep === "step1" && <div>Step 1</div>}
      {currentStep === "step2" && <div>Step 2</div>}
      {currentStep === "step3" && <div>Step 3</div>}
      <Flex gap="base" direction="row" align="end" template={["grow", "grow"]}>
        <Button
          label="Previous"
          onClick={goToPreviousStep}
          disabled={isFirst}
          type="primary"
        />
        {!isLast && (
          <Button label="Next" onClick={goToNextStep} type="primary" />
        )}
        {isLast && (
          <Button
            label="Go To Start"
            onClick={() => goToStep("step1")}
            type="primary"
          />
        )}
      </Flex>
    </div>
  );
}
