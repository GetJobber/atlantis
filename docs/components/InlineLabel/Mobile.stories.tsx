import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InlineLabel } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/InlineLabel/Mobile",
  component: InlineLabel,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InlineLabel>;

const BasicTemplate: ComponentStory<typeof InlineLabel> = args => (
  <InlineLabel {...args}>Draft</InlineLabel>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
