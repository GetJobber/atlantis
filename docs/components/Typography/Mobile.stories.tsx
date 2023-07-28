import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Typography } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/Typography/Mobile",
  component: Typography,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Typography>;

const BasicTemplate: ComponentStory<typeof Typography> = args => (
  <Typography {...args}>Some type here</Typography>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const Transform = BasicTemplate.bind({});
Transform.args = {
  transform: "uppercase",
};
