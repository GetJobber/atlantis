import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Typography } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/Typography/Mobile",
  component: Typography,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Typography>;

const BasicTemplate: StoryFn<typeof Typography> = args => (
  <Typography {...args}>Some type here</Typography>
);

export const Basic = {
  render: BasicTemplate,
  args: {},
};
export const Transform = {
  render: BasicTemplate,
  args: {
    transform: "uppercase",
  },
};
