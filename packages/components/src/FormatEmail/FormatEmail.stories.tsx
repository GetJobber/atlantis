import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { FormatEmail } from "@jobber/components/FormatEmail";

export default {
  title: "Components/Utilities/FormatEmail/Web",
  component: FormatEmail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof FormatEmail>;

const BasicTemplate: StoryFn<typeof FormatEmail> = args => (
  <FormatEmail {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    email: "myemail@address.me",
  },
};
