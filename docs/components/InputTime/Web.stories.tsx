import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputTime } from "@jobber/components/InputTime";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Forms and Inputs/InputTime/Web",
  component: InputTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof InputTime>;

const newDate = new Date();
newDate.setHours(2, 35, 0, 0);

const BasicTemplate: ComponentStory<typeof InputTime> = args => (
  <InputTime {...args} maxLength={2} />
);

const ControlledTemplate: ComponentStory<typeof InputTime> = args => {
  const [time, setTime] = useState<Date>();

  const handleChange = (newTime: Date) => {
    setTime(newTime);
  };

  return (
    <Content>
      <Flex template={["grow", "shrink"]}>
        <InputTime {...args} value={time} onChange={handleChange} />
        <Button label="Reset" size="large" onClick={() => setTime()} />
      </Flex>
      <pre>{time && time.toString()}</pre>
    </Content>
  );
};

export const Uncontrolled = BasicTemplate.bind({});

Uncontrolled.args = {
  defaultValue: newDate,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: "Start time",
  clearable: "always",
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  defaultValue: newDate,
  disabled: true,
};

export const ReadOnly = BasicTemplate.bind({});
ReadOnly.args = {
  defaultValue: newDate,
  readonly: true,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  defaultValue: newDate,
  invalid: true,
};
