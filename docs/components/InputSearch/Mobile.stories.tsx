import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputSearch } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputSearch/Mobile",
  component: InputSearch,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof InputSearch>;

const BasicTemplate: ComponentStory<typeof InputSearch> = args => (
  <InputSearch {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Search",
  prefix: {
    icon: "search",
  },
};
