import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import {
  Button,
  Content,
  Heading,
  ProgressBar,
} from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/ProgressBar/Mobile",
  component: ProgressBar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

const BasicTemplate: StoryFn<typeof ProgressBar> = args => (
  <ProgressBar {...args} />
);

const WithHeaderTemplate: StoryFn<typeof ProgressBar> = args => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  return (
    <ProgressBar
      {...args}
      current={step}
      total={totalSteps}
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
};

export const Basic = {
  render: BasicTemplate,
  args: {
    total: 5,
    current: 1,
    inProgress: 2,
  },
};
export const WithHeader = {
  render: WithHeaderTemplate,
  args: {},
};
