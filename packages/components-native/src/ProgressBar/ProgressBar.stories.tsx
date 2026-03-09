import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import {
  Button,
  Content,
  Heading,
  ProgressBar,
} from "@jobber/components-native";

type ProgressBarStoryArgs = Partial<
  Pick<
    React.ComponentProps<typeof ProgressBar>,
    "current" | "total" | "inProgress" | "variation" | "size"
  >
>;

const meta = {
  title: "Components/Status and Feedback/ProgressBar",
  component: ProgressBar,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<ProgressBarStoryArgs>;

export const Basic: Story = {
  render: args => (
    <ProgressBar
      current={args?.current ?? 1}
      inProgress={args?.inProgress}
      size={args?.size}
      total={args?.total ?? 5}
      variation={args?.variation}
    />
  ),
  args: {
    total: 5,
    current: 1,
    inProgress: 2,
  },
};

export const WithHeader: Story = {
  render: args => {
    const [step, setStep] = useState(1);
    const totalSteps = 6;

    return (
      <ProgressBar
        current={step}
        inProgress={args?.inProgress}
        size={args?.size}
        total={totalSteps}
        variation={args?.variation}
        header={
          <>
            <Content>
              <Heading level="heading">Upload progress</Heading>
            </Content>
            <Button
              label="Step Back"
              onPress={() => setStep(Math.max(0, step - 1))}
            />
            <Button
              label="Step Forward"
              onPress={() => setStep(Math.min(totalSteps, step + 1))}
            />
          </>
        }
      />
    );
  },
  args: {
    total: 6,
    current: 1,
  },
};
