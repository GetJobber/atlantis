import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InlineLabel } from "@jobber/components/InlineLabel";

export default {
  title: "Components/Status and Feedback/InlineLabel/Web",
  component: InlineLabel,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InlineLabel>;

const BasicTemplate: ComponentStory<typeof InlineLabel> = args => (
  <InlineLabel {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  children: "draft",
};
