import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components-native";

export default {
  title: "Components/Divider/Mobile",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { docs: { hidden: true } },
  },
} as ComponentMeta<typeof Divider>;

type Story = ComponentStory<typeof Divider>;

const Template: Story = args => (
  <Content>
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </Content>
);

export const Mobile: Story = Template.bind({});
