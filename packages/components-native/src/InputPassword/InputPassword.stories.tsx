import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { InputPassword } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputPassword/Mobile",
  component: InputPassword,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof InputPassword>;

const BasicTemplate: StoryFn<typeof InputPassword> = args => (
  <InputPassword {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
  },
};
