import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import {
  ActivityIndicator,
  Content,
  Divider,
  Heading,
} from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/ActivityIndicator",
  component: ActivityIndicator,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof ActivityIndicator>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
  <Content>
    <Heading level="subtitle">Small</Heading>
    <ActivityIndicator size="small" />
    <Divider size="base" />
    <Heading level="subtitle">Large</Heading>
    <ActivityIndicator {...args} />
  </Content>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    size: "large",
  },
};
