import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { FormatDate } from "@jobber/components/FormatDate";

export default {
  title: "Components/Utilities/FormatDate/Web",
  component: FormatDate,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as Meta<typeof FormatDate>;

const BasicTemplate: StoryFn<typeof FormatDate> = args => (
  <FormatDate {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    date: new Date(),
  },
};
