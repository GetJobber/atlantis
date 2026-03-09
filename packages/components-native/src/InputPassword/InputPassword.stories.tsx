import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPassword } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputPassword/Mobile",
  component: InputPassword,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof InputPassword>;

const BasicTemplate: ComponentStory<typeof InputPassword> = args => (
  <InputPassword {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Password",
};
