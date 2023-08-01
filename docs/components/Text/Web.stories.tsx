import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";

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

const SizesTemplate: ComponentStory<typeof Text> = args => {
  return (
    <Content>
      <Text {...args}>{args.children}</Text>
      <Text size="small">Sometimes they are small</Text>
      <Text size="large">Other times they are large</Text>
    </Content>
  );
};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  children: "Both Trains and Text come in all different kinds of sizes",
  size: "base",
};
