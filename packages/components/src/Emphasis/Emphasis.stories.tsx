import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";

export default {
  title: "Components/Text and Typography/Emphasis/Web",
  component: Emphasis,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Emphasis>;

const BasicTemplate: StoryFn<typeof Emphasis> = args => (
  <Text>
    To <Emphasis {...args}>boldly</Emphasis> go…
  </Text>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    variation: "bold",
  },
};
