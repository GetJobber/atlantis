import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@jobber/components-native";
import { tokens } from "@jobber/design/foundation";

export default {
  title: "Components/Text/Mobile",
  component: Text,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
      "playground-tab": { hidden: false },
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => (
  <Text {...args}>{args.children}</Text>
);

export const Default = Template.bind({});
Default.args = {
  children: "Ask the information you need upfront from clients and new leads",
};

export const ReverseTheme = Template.bind({});
ReverseTheme.parameters = {
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: tokens["color-surface--reverse"],
      },
      {
        name: "light",
        value: tokens["color-surface"],
      },
    ],
  },
};
ReverseTheme.args = {
  children: "Changes Text color for display on a dark background",
  reverseTheme: true,
};

export const TextSupporting = Template.bind({});
TextSupporting.args = {
  children:
    "Supporting Text should be used to supplement additional, more important content",
  level: "textSupporting",
};
