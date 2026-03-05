import React from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-native-web-vite";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/Actions/IconButton/Mobile",
  component: IconButton,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate: StoryFn<typeof IconButton> = args => (
  <IconButton {...args} />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    accessibilityLabel: "New Job",
    name: "remove",
    onPress: () => console.log("👍"),
  },
};
