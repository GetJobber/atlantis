import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LoadMoreTrigger } from "@jobber/components/LoadMoreTrigger";

export default {
  title: "Components/Category/LoadMoreTrigger/Web",
  component: LoadMoreTrigger,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof LoadMoreTrigger>;

const BasicTemplate: ComponentStory<typeof LoadMoreTrigger> = args => (
  <LoadMoreTrigger {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
