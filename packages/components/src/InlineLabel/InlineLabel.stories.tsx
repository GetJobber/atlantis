import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { InlineLabel } from "@jobber/components/InlineLabel";

export default {
  title: "Components/Status and Feedback/InlineLabel/Web",
  component: InlineLabel,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof InlineLabel>;

const BasicTemplate: StoryFn<typeof InlineLabel> = args => (
  <InlineLabel {...args}>Draft</InlineLabel>
);

export const Basic = {
  render: BasicTemplate,
  args: {},
};
