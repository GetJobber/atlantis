import React from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-native-web-vite";
import { Content, Text } from "@jobber/components-native";
import { Card } from "./Card";

const meta = {
  title: "Components/Layouts and Structure/Card/Mobile",
  component: Card,
  parameters: {
    viewMode: "story",
    backgrounds: {
      default: "surface background",
    },
    viewport: { defaultViewport: "mobile1" },
    previewTabs: { code: { hidden: false } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate: StoryFn<typeof Card> = args => (
  <Card {...args}>
    <Content childSpacing={"small"}>
      <Content spacing={"none"} childSpacing={"none"}>
        <Text variation={"subdued"}>Address</Text>
        <Text>12345 Fake Street</Text>
      </Content>
      <Content spacing={"none"} childSpacing={"none"}>
        <Text variation={"subdued"}>Phone</Text>
        <Text>555-555-5555</Text>
      </Content>
    </Content>
  </Card>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    header: { title: "Client" },
  },
};
const ElevationTemplate: StoryFn<typeof Card> = args => (
  <Content spacing="none" direction="horizontal">
    <Card header={{ title: "Properties" }}>
      <Content>
        <Card {...args}>
          <Content childSpacing="none">
            <Text>10130 103 St NW</Text>
            <Text>Edmonton, Alberta</Text>
            <Text>T5J 3N9</Text>
          </Content>
        </Card>
        <Card {...args}>
          <Content childSpacing="none">
            <Text>10520 Jasper Ave NW</Text>
            <Text>Edmonton, Alberta</Text>
            <Text>T5J 3N9</Text>
          </Content>
        </Card>
      </Content>
    </Card>
  </Content>
);

export const Elevation: Story = {
  render: ElevationTemplate,
  args: {
    elevation: "base",
  },
};
export const Pressable: Story = {
  render: BasicTemplate,
  args: {
    header: {
      title: "Your address",
      actionItem: { iconName: "plus2" },
      onPress: () => console.log("🏡"),
    },
    footer: {
      title: "View All",
      onPress: () => console.log("View all"),
    },
  },
};
