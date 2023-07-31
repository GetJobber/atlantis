import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Text } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/Text/Mobile",
  component: Text,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Text>;

const BasicTemplate: ComponentStory<typeof Text> = args => {
  return <Text {...args}>{args.children}</Text>;
};
export const Basic = BasicTemplate.bind({});

Basic.args = {
  children:
    '"640K is more memory than anyone will ever need on a computer" - Not Bill Gates',
  //  children:  '"You gotta crack a few eggs to make a mess" - Michael Paradis'
};

export const SupportingText = BasicTemplate.bind({});
SupportingText.args = {
  children:
    "Supporting Text should be used to supplement additional, more important content",
  level: "textSupporting",
};

export const ReverseTheme = BasicTemplate.bind({});

ReverseTheme.args = {
  children: "Changes Text color for display on a dark background",
  reverseTheme: true,
};
ReverseTheme.parameters = {
  backgrounds: { default: "dark" },
};
