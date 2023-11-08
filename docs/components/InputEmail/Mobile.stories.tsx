import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputEmail } from "@jobber/components-native";

export default {
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
} as ComponentMeta<typeof InputEmail>;

const BasicTemplate: ComponentStory<typeof InputEmail> = args => {
  return <InputEmail {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  placeholder: "Enter your email",
};
