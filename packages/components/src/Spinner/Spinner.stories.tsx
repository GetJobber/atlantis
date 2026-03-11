import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@jobber/components/Spinner";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Status and Feedback/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: "base",
  },
};

export const Inline: Story = {
  render: args => (
    <Text>
      Uploading... <Spinner {...args} />
    </Text>
  ),
  args: {
    size: "small",
    inline: true,
  },
};
