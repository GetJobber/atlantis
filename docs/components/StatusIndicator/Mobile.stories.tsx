import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StatusIndicator } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/StatusIndicator/Mobile",
  component: StatusIndicator,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof StatusIndicator>;

const BasicTemplate: ComponentStory<typeof StatusIndicator> = args => (
  <StatusIndicator {...args} />
);

export const Basic = BasicTemplate.bind({});

Basic.args = {
  status: "success",
};
