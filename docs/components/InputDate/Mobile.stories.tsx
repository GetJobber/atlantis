import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputDate } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputDate/Mobile",
  component: InputDate,
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
} as ComponentMeta<typeof InputDate>;

const BasicTemplate: ComponentStory<any> = args => {
  const [date, setDate] = useState(new Date("11/11/2011"));
  return <InputDate {...args} value={date} onChange={setDate} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {};

export const EmptyValueLabel = BasicTemplate.bind({});
EmptyValueLabel.args = {
  placeholder: "Start date",
  emptyValueLabel: "Unscheduled",
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "Start date",
  invalid: "Start Date is required",
};
