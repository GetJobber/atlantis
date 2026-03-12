import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "@jobber/components/ProgressBar";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";

type ProgressBarStoryArgs = Partial<
  Pick<
    React.ComponentProps<typeof ProgressBar>,
    "currentStep" | "totalSteps" | "size" | "variation"
  >
>;

const meta = {
  title: "Components/Status and Feedback/ProgressBar",
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<ProgressBarStoryArgs>;

export const Basic: Story = {
  render: args => (
    <ProgressBar
      currentStep={args?.currentStep ?? 3}
      size={args?.size}
      totalSteps={args?.totalSteps ?? 4}
      variation={args?.variation}
    />
  ),
  args: {
    currentStep: 3,
    totalSteps: 4,
  },
};

export const WithState: Story = {
  render: args => {
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
        <ProgressBar
          currentStep={step}
          size={args?.size}
          totalSteps={totalSteps}
          variation={args?.variation}
        />
        Step: <strong>{step}</strong> of <strong>{totalSteps}</strong>
      </Content>
    );
  },
  args: {
    currentStep: 3,
    totalSteps: 4,
  },
};

export const WithSteppedVariation: Story = {
  render: WithState.render,
  args: {
    variation: "stepped",
  },
};
