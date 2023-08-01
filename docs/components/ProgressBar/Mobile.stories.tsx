import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import {
  Button,
  Content,
  Heading,
  ProgressBar,
} from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/ProgressBar/Mobile",
  component: ProgressBar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof ProgressBar>;

const BasicTemplate: ComponentStory<typeof ProgressBar> = args => (
  <ProgressBar {...args} />
);

const WithHeaderTemplate: ComponentStory<typeof ProgressBar> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  total: 5,
  current: 1,
  inProgress: 2,
};

export const WithHeader = WithHeaderTemplate.bind({});
WithHeader.args = {};
