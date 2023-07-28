import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { ProgressBar } from "@jobber/components-native";

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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  total: 5,
  current: 1,
  inProgress: 2,
};
