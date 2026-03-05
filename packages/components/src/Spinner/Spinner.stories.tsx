import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Spinner } from "@jobber/components/Spinner";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Status and Feedback/Spinner/Web",
  component: Spinner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Spinner>;

const BasicTemplate: StoryFn<typeof Spinner> = args => <Spinner {...args} />;

const InlineTemplate: StoryFn<typeof Spinner> = args => (
  <Text>
    Uploading... <Spinner {...args} />
  </Text>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    size: "base",
  },
};
export const Inline = {
  render: InlineTemplate,
  args: {
    size: "small",
    inline: true,
  },
};
