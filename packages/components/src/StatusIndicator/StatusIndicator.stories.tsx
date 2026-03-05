import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { StatusIndicator } from "@jobber/components/StatusIndicator";

export default {
  title: "Components/Status and Feedback/StatusIndicator/Web",
  component: StatusIndicator,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as Meta<typeof StatusIndicator>;

const BasicTemplate: StoryFn<typeof StatusIndicator> = args => {
  return <StatusIndicator {...args} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    status: "success",
  },
};
