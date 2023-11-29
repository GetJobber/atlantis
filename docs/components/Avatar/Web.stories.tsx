import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Avatar } from "@jobber/components/Avatar";
import { Tooltip } from "@jobber/components/Tooltip";

export default {
  title: "Components/Images and Icons/Avatar/Web",
  component: Avatar,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Avatar>;

const BasicTemplate: ComponentStory<typeof Avatar> = args => (
  <Avatar {...args} />
);

const TooltipTemplate: ComponentStory<typeof Avatar> = args => (
  <Tooltip message="The Jobbler">
    <Avatar {...args} />
  </Tooltip>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  color: "var(--color-indigo)",
  imageUrl:
    "https://images.unsplash.com/photo-1533858539156-90ea20bafd17?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  initials: "JBLR",
  name: "The Jobbler",
  size: "large",
};

export const WithTooltip = TooltipTemplate.bind({});
WithTooltip.args = {
  size: "large",
  initials: "JBLR",
};
