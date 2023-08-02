import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof ActivityIndicator>;

const BasicTemplate: ComponentStory<typeof ActivityIndicator> = args => (
  <Content>
    <Heading level="subtitle">Small</Heading>
    <ActivityIndicator size="small" />
    <Divider size="base" />
    <Heading level="subtitle">Large</Heading>
    <ActivityIndicator {...args} />
  </Content>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  size: "large",
};
