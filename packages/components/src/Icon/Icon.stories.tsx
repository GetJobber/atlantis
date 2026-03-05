import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Images and Icons/Icon/Web",
  component: Icon,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Icon>;

const BasicTemplate: StoryFn<typeof Icon> = args => <Icon {...args} />;

export const Basic = {
  render: BasicTemplate,
  args: {
    name: "gift",
  },
};
