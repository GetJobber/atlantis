import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Text and Typography/Text/Web",
  component: Text,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof Text>;

const BasicTemplate: ComponentStory<typeof Text> = args => {
  return <Text {...args}>{args.children}</Text>;
};
export const Basic = BasicTemplate.bind({});

Basic.args = {
  children:
    '"640K is more memory than anyone will ever need on a computer" - Not Bill Gates',
};

export const Sizes = BasicTemplate.bind({});
Sizes.args = {
  children:
    '"The only good thing about rails is trains run on them" - Michael Paradis',
  size: "small",
};
