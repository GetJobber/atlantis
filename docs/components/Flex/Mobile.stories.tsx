import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
import { Card, Content, Flex, Icon, Text } from "@jobber/components-native";
import { StatusLabel } from "@jobber/components/StatusLabel";

export default {
  title: "Components/Layouts and Structure/Flex/Mobile",
  component: Flex,
  parameters: {
    viewMode: "story",
    backgrounds: {
      default: "surface background",
    },
  },
} as ComponentMeta<typeof Flex>;

const NestedTemplate: ComponentStory<typeof Flex> = args => (
  <Flex {...args}>
    <Flex align={"flex-start"} template={["shrink", "grow"]}>
      <Icon name="quote" />
      <View>
        <Flex template={["grow", "shrink"]}>
          <Text emphasis="strong">Dylan Tec</Text>
          <StatusLabel label="Success" status="success" />
        </Flex>
        <Text>Sep 03 | $100 | Quote #93</Text>
      </View>
    </Flex>
    <Icon name="arrowRight" />
  </Flex>
);

const MultiRowTemplate: ComponentStory<typeof Flex> = args => (
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

export const Nested = NestedTemplate.bind({});
Nested.args = {
  template: ["grow", "shrink"],
  align: "center",
};

export const MultiRow = MultiRowTemplate.bind({});
MultiRow.args = {
  template: ["grow", "grow", "grow", "grow"],
};
