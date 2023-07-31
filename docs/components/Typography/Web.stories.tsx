import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Typography } from "@jobber/components/Typography";

export default {
  title: "Components/Text and Typography/Typography/Web",
  component: Typography,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Typography>;

const BasicTemplate: ComponentStory<typeof Typography> = args => (
  <div>
    <Typography {...args}>Some type here</Typography>
  </div>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const Element = BasicTemplate.bind({});
Element.args = {
  element: "h1",
};

export const TextCase = BasicTemplate.bind({});
TextCase.args = {
  textCase: "uppercase",
};

export const Emphasis = BasicTemplate.bind({});
Emphasis.args = {
  element: "span",
  emphasisType: "highlight",
};
