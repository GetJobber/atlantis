import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Text } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/Text/Mobile",
  component: Text,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Text>;

const BasicTemplate: StoryFn<typeof Text> = args => {
  return <Text {...args}>{args.children}</Text>;
};
export const Basic = {
  render: BasicTemplate,
  args: {
    children:
      '"640K is more memory than anyone will ever need on a computer" - Not Bill Gates',
  },
};
export const SupportingText = {
  render: BasicTemplate,
  args: {
    children:
      "Supporting Text should be used to supplement additional, more important content",
    level: "textSupporting",
  },
};
export const ReverseTheme = {
  render: BasicTemplate,
  args: {
    children: "Changes Text color for display on a dark background",
    reverseTheme: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const NestedBold = () => (
  <Text>
    This is <Text emphasis="strong">bold</Text> inside a sentence.
  </Text>
);

export const NestedMixedStyles = () => (
  <Text>
    Start, <Text italic>italic segment</Text>, and a
    <Text emphasis="strong"> bold segment</Text>.
  </Text>
);

export const MultiLevelNesting = () => (
  <Text>
    Level 1{" "}
    <Text>
      contains <Text emphasis="strong">Level 2</Text>
    </Text>{" "}
    done.
  </Text>
);
