import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
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
} as Meta<typeof InputTime>;

const newDate = new Date();
newDate.setHours(2, 35, 0, 0);

const BasicTemplate: StoryFn<typeof InputTime> = args => (
  <InputTime {...args} />
);

const ControlledTemplate: StoryFn<typeof InputTime> = args => {
  const [time, setTime] = useState<Date>();

  const handleChange = (newTime: Date) => {
    setTime(newTime);
  };

  return (
    <Content>
      <Flex template={["grow", "shrink"]}>
        <InputTime {...args} value={time} onChange={handleChange} />
        <Button
          label="Reset"
          size="large"
          onClick={() => setTime(new Date())}
        />
      </Flex>
      <pre>{time && time.toString()}</pre>
    </Content>
  );
};

export const Uncontrolled = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
  },
};
export const Controlled = {
  render: ControlledTemplate,
  args: {
    placeholder: "Start time",
    clearable: "always",
  },
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    disabled: true,
  },
};
export const ReadOnly = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    readonly: true,
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    invalid: true,
  },
};
