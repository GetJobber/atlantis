import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputTime } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputTime/Mobile",
  component: InputTime,
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
} as ComponentMeta<typeof InputTime>;

const BasicTemplate: ComponentStory<typeof InputTime> = args => (
  <InputTime {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Start time",
  value: new Date("11/11/2011 3:52 PM"),
};
