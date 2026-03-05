import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Text } from "@jobber/components/Text";
import { Icon } from "@jobber/components/Icon";
import { Emphasis } from "@jobber/components/Emphasis";
import { StatusLabel } from "@jobber/components/StatusLabel";

export default {
  title: "Components/Layouts and Structure/Flex/Web",
  component: Flex,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Flex>;

const BasicTemplate: StoryFn<typeof Flex> = args => (
  <Flex {...args}>
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

export const Basic = {
  render: BasicTemplate,
  args: {
    template: ["grow", "shrink"],
  },
};
