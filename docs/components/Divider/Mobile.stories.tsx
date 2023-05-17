import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components-native";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Components/Divider/Mobile",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { docs: { hidden: true } },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => (
  <Content>
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </Content>
);

export const Mobile = Template.bind({});
Mobile.args = { size: "base" };
