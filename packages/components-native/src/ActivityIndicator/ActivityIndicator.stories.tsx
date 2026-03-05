import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import {
  ActivityIndicator,
  Content,
  Divider,
  Heading,
} from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/ActivityIndicator/Mobile",
  component: ActivityIndicator,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof ActivityIndicator>;

const BasicTemplate: StoryFn<typeof ActivityIndicator> = args => (
  <Content>
    <Heading level="subtitle">Small</Heading>
    <ActivityIndicator size="small" />
    <Divider size="base" />
    <Heading level="subtitle">Large</Heading>
    <ActivityIndicator {...args} />
  </Content>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    size: "large",
  },
};
