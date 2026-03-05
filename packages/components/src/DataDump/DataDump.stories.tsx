import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { DataDump } from "@jobber/components/DataDump";

export default {
  title: "Components/Utilities/DataDump/Web",
  component: DataDump,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof DataDump>;

const BasicTemplate: StoryFn<typeof DataDump> = args => <DataDump {...args} />;

export const Basic = {
  render: BasicTemplate,
  args: {
    data: {
      name: "Bob",
    },
  },
};
