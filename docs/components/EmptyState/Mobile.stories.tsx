import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyState } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/EmptyState/Mobile",
  component: EmptyState,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof EmptyState>;

const BasicTemplate: ComponentStory<typeof EmptyState> = args => (
  <EmptyState {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  icon: "home",
  title: "Title",
  description: "Description",
  primaryAction: {
    label: "Click Me",
    onPress: () => {
      alert("👋");
    },
  },
  secondaryAction: {
    label: "Don't Forget About Me",
    onPress: () => {
      alert("👋");
    },
  },
};
