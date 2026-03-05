import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { ProgressBar } from "@jobber/components/ProgressBar";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Status and Feedback/ProgressBar/Web",
  component: ProgressBar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof ProgressBar>;

const BasicTemplate: StoryFn<typeof ProgressBar> = args => (
  <ProgressBar {...args} />
);

const WithStateTemplate: StoryFn<typeof ProgressBar> = args => {
  const [step, setStep] = useState(2);
  const totalSteps = 4;

  return (
    <Content>
      <Button
        label="Step Back"
        onClick={() => setStep(Math.max(0, step - 1))}
      />{" "}
      <Button
        label="Step Forward"
        onClick={() => setStep(Math.min(totalSteps, step + 1))}
      />
      <ProgressBar {...args} currentStep={step} totalSteps={totalSteps} />
      Step: <strong>{step}</strong> of <strong>{totalSteps}</strong>
    </Content>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    currentStep: 3,
    totalSteps: 4,
  },
};
export const WithState = {
  render: WithStateTemplate,
  args: {},
};
export const WithSteppedVariation = {
  render: WithStateTemplate,
  args: { variation: "stepped" },
};
