import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Disclosure } from "@jobber/components/Disclosure";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

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
