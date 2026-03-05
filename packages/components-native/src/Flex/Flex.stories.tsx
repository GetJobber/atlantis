import React from "react";
import { View } from "react-native";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import {
  Card,
  Content,
  Flex,
  Icon,
  StatusLabel,
  Text,
} from "@jobber/components-native";

export default {
  title: "Components/Layouts and Structure/Flex/Mobile",
  component: Flex,
  parameters: {
    viewMode: "story",
    backgrounds: {
      default: "surface background",
    },
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Flex>;

const NestedTemplate: StoryFn<typeof Flex> = args => (
  <Flex {...args}>
    <Flex align={"flex-start"} template={["shrink", "grow"]}>
      <Icon name="quote" />
      <View>
        <Flex template={["grow", "shrink"]}>
          <Text emphasis="strong">Dylan Tec</Text>
          <StatusLabel text="Success" status="success" />
        </Flex>
        <Text>Sep 03 | $100 | Quote #93</Text>
      </View>
    </Flex>
    <Icon name="arrowRight" />
  </Flex>
);

const MultiRowTemplate: StoryFn<typeof Flex> = args => (
  <Flex {...args}>
    {[
      "Cash",
      "Cheque",
      "Credit card",
      "Bank transfer",
      "Money order",
      "Pigeon Mail",
      "Other",
    ].map(name => (
      <Card key={name}>
        <Content>
          <Text emphasis="strong">{name}</Text>
        </Content>
      </Card>
    ))}
  </Flex>
);

export const Nested = {
  render: NestedTemplate,
  args: {
    template: ["grow", "shrink"],
    align: "center",
  },
};
export const MultiRow = {
  render: MultiRowTemplate,
  args: {
    template: ["grow", "grow"],
    gap: "small",
  },
};
