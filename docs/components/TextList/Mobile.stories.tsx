import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextList } from "@jobber/components-native";

export default {
  title: "Components/Lists and Tables/TextList/Mobile",
  component: TextList,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof TextList>;

const BasicTemplate: ComponentStory<typeof TextList> = args => (
  <TextList {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  items: ["Item uno", "Item dos", "Item tres"],
};

export const Levels = BasicTemplate.bind({});
Levels.args = {
  items: [
    "This is the first item",
    "This is the second item",
    "This is the third item",
  ],
  level: "textSupporting",
};

export const Emphasis = BasicTemplate.bind({});
Emphasis.args = {
  items: [
    "This is the first item",
    "This is the second item",
    "This is the third item",
  ],
  emphasis: "strong",
};

export const Spacing = BasicTemplate.bind({});
Spacing.args = {
  items: [
    "This is the first item",
    "This is the second item",
    "This is the third item",
  ],
  spacing: "large",
};

export const ChildSpacing = BasicTemplate.bind({});
ChildSpacing.args = {
  items: [
    "This is the first item",
    "This is the second item",
    "This is the third item",
  ],
  childSpacing: "large",
};
