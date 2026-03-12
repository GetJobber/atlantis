import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";

type TextStoryArgs = Pick<
  React.ComponentProps<typeof Text>,
  "children" | "size"
>;

const meta = {
  title: "Components/Text and Typography/Text",
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<TextStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  return <Text size={args?.size}>{args?.children}</Text>;
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    children:
      '"640K is more memory than anyone will ever need on a computer" - Not Bill Gates',
  },
};

const SizesTemplate = (args: Story["args"]) => {
  return (
    <Content>
      <Text size={args?.size}>{args?.children}</Text>
      <Text size="small">Sometimes they are small</Text>
      <Text size="large">Other times they are large</Text>
    </Content>
  );
};

export const Sizes: Story = {
  render: SizesTemplate,
  args: {
    children: "Both Trains and Text come in all different kinds of sizes",
    size: "base",
  },
};
