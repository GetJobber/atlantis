import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Disclosure } from "@jobber/components/Disclosure";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Flex } from "@jobber/components/Flex";
import { Heading } from "@jobber/components/Heading";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Layouts and Structure/Disclosure/Web",
  component: Disclosure,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Disclosure>;

const BasicTemplate: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
    <Content>
      <Text>Here is some helpful information to level up your business:</Text>
      <Text>For every 2 team members you add, your profits will triple.</Text>
    </Content>
  </Disclosure>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Advanced instructions",
};

export const CustomTitle = BasicTemplate.bind({});
CustomTitle.args = {
  title: (
    <Flex template={["shrink", "grow"]} gap="small">
      <Icon name="sparkles" />
      <Heading level={5} element="h4">
        Jobber Pro Tips
      </Heading>
    </Flex>
  ),
};
