import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card, Content, Text } from "@jobber/components-native";

export default {
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
} as ComponentMeta<typeof Card>;

const BasicTemplate: ComponentStory<typeof Card> = args => (
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  header: { title: "Client" },
};

const ElevationTemplate: ComponentStory<typeof Card> = args => (
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

export const Elevation = ElevationTemplate.bind({});
Elevation.args = {
  elevation: "base",
};

export const Pressable = BasicTemplate.bind({});
Pressable.args = {
  header: {
    title: "Your address",
    actionItem: { iconName: "plus2" },
    onPress: () => alert("🏡"),
  },
  footer: {
    title: "View All",
    onPress: () => alert("View all"),
  },
};
