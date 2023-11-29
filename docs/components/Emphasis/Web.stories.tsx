import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";

export default {
  title: "Components/Text and Typography/Emphasis/Web",
  component: Emphasis,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Emphasis>;

const BasicTemplate: ComponentStory<typeof Emphasis> = args => (
  <Text>
    To <Emphasis {...args}>boldly</Emphasis> go…
  </Text>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  variation: "bold",
};
