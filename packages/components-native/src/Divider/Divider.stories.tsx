import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Content, Divider, Heading, Text } from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/Divider",
  component: Divider,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Divider>>>;

const HorizontalTemplate = (args: Story["args"]) => (
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

const VerticalTemplate = (args: Story["args"]) => (
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
