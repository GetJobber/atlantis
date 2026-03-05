import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { InputEmail } from "./InputEmail";

const meta: Meta = {
  title: "Components/Forms and Inputs/InputEmail/Mobile",
  component: InputEmail,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
};

export default meta;

interface InputEmailStoryArgs {
  readonly placeholder?: string;
}

const BasicTemplate = (args: InputEmailStoryArgs) => <InputEmail {...args} />;

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter your email",
  },
};
