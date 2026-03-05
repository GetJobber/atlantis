import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { EmptyState } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/EmptyState/Mobile",
  component: EmptyState,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof EmptyState>;

const BasicTemplate: StoryFn<typeof EmptyState> = args => (
  <EmptyState {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    icon: "home",
    title: "Title",
    description: "Description",
    primaryAction: {
      label: "Click Me",
      onPress: () => {
        console.log("👋");
      },
    },
    secondaryAction: {
      label: "Don't Forget About Me",
      onPress: () => {
        console.log("👋");
      },
    },
  },
};
