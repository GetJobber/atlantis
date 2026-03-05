import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { StatusLabel } from "@jobber/components/StatusLabel";

export default {
  title: "Components/Status and Feedback/StatusLabel/Web",
  component: StatusLabel,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as Meta<typeof StatusLabel>;

const BasicTemplate: StoryFn<typeof StatusLabel> = args => {
  return <StatusLabel {...args} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    label: "Success",
    alignment: "start",
    status: "success",
  },
};
