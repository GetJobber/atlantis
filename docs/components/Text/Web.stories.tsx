import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Text/Web",
  component: Text,
  parameters: {
    viewMode: "story",
    previewTabs: { docs: { hidden: true } },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => (
  <Text {...args}>{args.children}</Text>
);

export const Default = Template.bind({});
Default.args = {
  children: "Ask the information you need upfront from clients and new leads",
};

export const Sizes = Template.bind({});
Sizes.args = {
  children: "Job note linked to related invoice",
  size: "large",
};
