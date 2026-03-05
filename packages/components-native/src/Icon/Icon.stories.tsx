import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Icon } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/Icon/Mobile",
  component: Icon,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Icon>;

const BasicTemplate: StoryFn<typeof Icon> = args => <Icon {...args} />;

export const Basic = {
  render: BasicTemplate,
  args: {
    name: "gift",
  },
};
