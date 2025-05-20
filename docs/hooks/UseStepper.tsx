import React from "react";
import { useStepper } from "@jobber/hooks/useStepper";
import { Button, Flex } from "@jobber/components";

export function UseStepper() {
  const steps = ["step1", "step2", "step3"] as const;

  const { currentStep, nextStep, previousStep, isFirst, isLast } = useStepper(
    steps,
    {
      defaultStep: "step1", // optional
    },
  );

  return (
    <div>
      {currentStep === "step1" && <div>Step 1</div>}
      {currentStep === "step2" && <div>Step 2</div>}
      {currentStep === "step3" && <div>Step 3</div>}
      <Flex gap="base" direction="row" align="end" template={["grow", "grow"]}>
        <Button
          label="Previous"
          onClick={previousStep}
          disabled={isFirst}
          type="primary"
        />
        <Button
          label="Next"
          onClick={nextStep}
          disabled={isLast}
          type="primary"
        />
      </Flex>
    </div>
  );
}
