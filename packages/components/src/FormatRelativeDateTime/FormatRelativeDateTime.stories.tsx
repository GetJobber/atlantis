import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { FormatRelativeDateTime } from "@jobber/components/FormatRelativeDateTime";

export default {
  title: "Components/Utilities/FormatRelativeDateTime/Web",
  component: FormatRelativeDateTime,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof FormatRelativeDateTime>;

const BasicTemplate: StoryFn<typeof FormatRelativeDateTime> = args => (
  <FormatRelativeDateTime
    {...args}
    date={new Date(new Date().setMinutes(new Date().getMinutes() - 5))}
  />
);

export const Basic = {
  render: BasicTemplate,
  args: {},
};
