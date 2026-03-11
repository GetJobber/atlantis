import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Text } from "@jobber/components/Text";
import { Icon } from "@jobber/components/Icon";
import { Emphasis } from "@jobber/components/Emphasis";
import { StatusLabel } from "@jobber/components/StatusLabel";

const meta = {
  title: "Components/Layouts and Structure/Flex",
  component: Flex,
} satisfies Meta<typeof Flex>;
export default meta;
type FlexStoryArgs = Pick<
  React.ComponentProps<typeof Flex>,
  "template" | "align" | "gap" | "direction"
>;
type Story = StoryObj<FlexStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Flex
    template={args?.template ?? ["grow", "shrink"]}
    align={args?.align}
    gap={args?.gap}
    direction={args?.direction}
  >
    <Flex align="start" template={["shrink", "grow"]}>
      <Icon name="quote" />
      <Content spacing="small">
        <Flex template={["grow", "shrink"]}>
          <Emphasis variation="bold">Dylan Tec</Emphasis>
          <StatusLabel label="Success" status="success" />
        </Flex>
        <Text>Sep 03 | $100 | Quote #93</Text>
      </Content>
    </Flex>
    <Icon name="arrowRight" />
  </Flex>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    template: ["grow", "shrink"],
  },
};
