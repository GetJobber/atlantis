import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputTime } from "@jobber/components/InputTime";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Flex } from "@jobber/components/Flex";
import type { InputTimeLegacyProps } from "./InputTime.types";

const meta = {
  title: "Components/Forms and Inputs/InputTime",
  component: InputTime,
} satisfies Meta<typeof InputTime>;
export default meta;
type Story = StoryObj<Partial<InputTimeLegacyProps>>;

const newDate = new Date();
newDate.setHours(2, 35, 0, 0);

const BasicTemplate = (args: Story["args"]) => <InputTime {...args} />;

const ControlledTemplate = (args: Story["args"]) => {
  const [time, setTime] = useState<Date>();

  const handleChange = (newTime: Date) => {
    setTime(newTime);
  };

  return (
    <Content>
      <Flex template={["grow", "shrink"]}>
        <InputTime {...args} value={time} onChange={handleChange} />
        <Button label="Reset" size="large" onClick={() => setTime(undefined)} />
      </Flex>
      <pre>{time && time.toString()}</pre>
    </Content>
  );
};

export const Uncontrolled: Story = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    placeholder: "Start time",
    clearable: "always",
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    readonly: true,
  },
};

export const Invalid: Story = {
  render: BasicTemplate,
  args: {
    defaultValue: newDate,
    invalid: true,
  },
};
