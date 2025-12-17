import React, { useState } from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { InputTime } from "@jobber/components/InputTime";
import { Content } from "@jobber/components/Content";

const meta = {
  title: "Components/Forms and Inputs/InputTime/Web (v2)",
  component: InputTime,
  args: {
    version: 2,
    placeholder: "Select a time",
    disabled: false,
    invalid: false,
    value: new Date(),
    onChange: fn(),
  },
} satisfies Meta<typeof InputTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<Date>();

    return (
      <Content>
        <form>
          <Content>
            <InputTime
              onChange={date => {
                setValue(date);
              }}
              placeholder="Select a time time"
              value={value}
              version={2}
            />
            <input type="time" />

            <button type="submit">Submit</button>
          </Content>
        </form>
      </Content>
    );
  },
};
