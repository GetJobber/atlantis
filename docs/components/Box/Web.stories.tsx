import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Box/Web",
  component: Box,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Box>;

const BasicTemplate: ComponentStory<typeof Box> = args => (
  <Box {...args}>Box Content</Box>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
