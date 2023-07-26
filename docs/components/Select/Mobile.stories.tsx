import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Option, Select } from "@jobber/components-native";

export default {
  title: "Components/Selections/Select/Mobile",
  component: Select,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components-native": ["Select", "Option"],
        },
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Select>;

const BasicTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Option value={"1"}>1</Option>
    <Option value={"2"}>2</Option>
  </Select>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "Favorite number",
};
