import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import {
  Card,
  Content,
  Flex,
  Icon,
  StatusLabel,
  Text,
} from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/Flex",
  component: Flex,
  parameters: {
    backgrounds: {
      default: "surface background",
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Flex>;
export default meta;
type FlexStoryArgs = Pick<
  React.ComponentProps<typeof Flex>,
  "template" | "align" | "gap"
>;
type Story = StoryObj<FlexStoryArgs>;

const NestedTemplate = (args: Story["args"]) => (
  <Flex
    template={args?.template ?? ["grow", "shrink"]}
    align={args?.align}
    gap={args?.gap}
  >
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

const MultiRowTemplate = (args: Story["args"]) => (
  <Flex
    template={args?.template ?? ["grow", "grow"]}
    align={args?.align}
    gap={args?.gap}
  >
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

export const Nested: Story = {
  render: NestedTemplate,
  args: {
    template: ["grow", "shrink"],
    align: "center",
  },
};

export const MultiRow: Story = {
  render: MultiRowTemplate,
  args: {
    template: ["grow", "grow"],
    gap: "small",
  },
};
