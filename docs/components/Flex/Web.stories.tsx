import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Flex>;

const BasicTemplate: ComponentStory<typeof Flex> = args => (
  <Flex {...args}>
    <Flex alignItems="start" template={["shrink", "grow"]}>
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  template: ["grow", "shrink"],
};

export const JustifyContent: ComponentStory<typeof Flex> = args => (
  <Flex {...args}>
    <div style={{ height: 20 }}>Left</div>
    <div style={{ height: 30 }}>Center</div>
    <div style={{ height: 40 }}>Right</div>
  </Flex>
);
JustifyContent.args = {
  template: [],
};
