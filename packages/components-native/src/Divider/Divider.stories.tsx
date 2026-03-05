import React from "react";
import { View } from "react-native";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-native-web-vite";
import { Content, Heading, Text } from "@jobber/components-native";
import { Divider } from "./Divider";

const meta = {
  title: "Components/Layouts and Structure/Divider/Mobile",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

const HorizontalTemplate: StoryFn<typeof Divider> = args => (
  <View
    style={{
      display: "flex",
      gap: 16,
    }}
  >
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </View>
);

const VerticalTemplate: StoryFn<typeof Divider> = args => (
  <View>
    <View style={{ marginBottom: 16 }}>
      <Heading>Summary</Heading>
    </View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: 40,
        gap: 16,
      }}
    >
      <Content spacing="small">
        <Heading level="subHeading">Today</Heading>
        <Text>{"\n"}$104.13</Text>
      </Content>
      <Divider {...args} direction="vertical" />
      <Content spacing="small">
        <Heading level="subHeading">Tomorrow</Heading>
        <Text>{"\n"}$262.42</Text>
      </Content>
      <Divider {...args} direction="vertical" />
      <Content spacing="small">
        <Heading level="subHeading">Next Week</Heading>
        <Text>{"\n"}$123.23</Text>
      </Content>
    </View>
  </View>
);

export const Horizontal: Story = {
  render: HorizontalTemplate,
  args: {
    size: "base",
    direction: "horizontal",
  },
};
export const Vertical: Story = {
  render: VerticalTemplate,
  args: {
    size: "base",
    direction: "vertical",
  },
};
