import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import omit from "lodash/omit";
import { InputDate } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputDate/Mobile",
  component: InputDate,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof InputDate>;

const BasicTemplate: ComponentStory<typeof InputDate> = args => {
  const [date, setDate] = useState<Date | undefined>(new Date("11/11/2011"));
  const props = omit({ ...args }, "name", "validations", "defaultValue");
  return <InputDate {...props} value={date} onChange={setDate} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {};

const EmptyValueLabelTemplate: ComponentStory<typeof InputDate> = args => {
  return <InputDate {...args} />;
};

export const EmptyValueLabel = EmptyValueLabelTemplate.bind({});
EmptyValueLabel.args = {
  placeholder: "Start date",
  emptyValueLabel: "Unscheduled",
};

const InvalidTemplate: ComponentStory<typeof InputDate> = args => {
  return <InputDate {...args} />;
};
export const Invalid = InvalidTemplate.bind({});
Invalid.args = {
  placeholder: "Start date",
  invalid: "Start Date is required",
};
