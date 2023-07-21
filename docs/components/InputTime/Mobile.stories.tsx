import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content, Form, InputTime } from "@jobber/components-native";

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

const BasicTemplate: ComponentStory<any> = args => {
  const [time, setTime] = useState(new Date("2023-07-21T16:36:34.873Z"));
  return <InputTime {...args} value={time} onChange={setTime} />;
};

const EmptyValueTemplate: ComponentStory<typeof InputTime> = args => {
  return <InputTime {...args} />;
};

const FormControlledTemplate: ComponentStory<any> = args => (
  <Form initialValues={{ startTime: new Date("2023-07-21T16:36:34.873Z") }}>
    <Content>
      <InputTime {...args} />
    </Content>
  </Form>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Start time",
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  placeholder: "Start time",
  disabled: true,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "Start time",
  invalid: "Start time is required",
};

export const FormControlled = FormControlledTemplate.bind({});
FormControlled.args = {
  name: "startTime",
  placeholder: "Created time",
};

export const EmptyValue = EmptyValueTemplate.bind({});
EmptyValue.args = {
  placeholder: "Start time",
  emptyValueLabel: "Unscheduled",
};
