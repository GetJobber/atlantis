import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Text } from "@jobber/components-native";

type TextStoryArgs = Pick<
  React.ComponentProps<typeof Text>,
  "children" | "level" | "reverseTheme"
>;

const meta = {
  title: "Components/Text and Typography/Text",
  component: Text,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<TextStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  return (
    <Text level={args?.level} reverseTheme={args?.reverseTheme}>
      {args?.children}
    </Text>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    children:
      '"640K is more memory than anyone will ever need on a computer" - Not Bill Gates',
  },
};

export const SupportingText: Story = {
  render: BasicTemplate,
  args: {
    children:
      "Supporting Text should be used to supplement additional, more important content",
    level: "textSupporting",
  },
};

export const ReverseTheme: Story = {
  render: BasicTemplate,
  args: {
    children: "Changes Text color for display on a dark background",
    reverseTheme: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const NestedBold: Story = {
  render: () => (
    <Text>
      This is <Text emphasis="strong">bold</Text> inside a sentence.
    </Text>
  ),
};

export const NestedMixedStyles: Story = {
  render: () => (
    <Text>
      Start, <Text italic>italic segment</Text>, and a
      <Text emphasis="strong"> bold segment</Text>.
    </Text>
  ),
};

export const MultiLevelNesting: Story = {
  render: () => (
    <Text>
      Level 1{" "}
      <Text>
        contains <Text emphasis="strong">Level 2</Text>
      </Text>{" "}
      done.
    </Text>
  ),
};
