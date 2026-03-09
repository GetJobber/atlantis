import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
/* eslint-disable import/no-deprecated */
import type { RecurrenceRule } from "@jobber/components/RecurringSelect";
import {
  DurationPeriod,
  RecurringSelect,
} from "@jobber/components/RecurringSelect";

type RecurringSelectStoryArgs = Pick<
  React.ComponentProps<typeof RecurringSelect>,
  "disabled"
>;

const meta = {
  title: "Components/Deprecated/RecurringSelect",
  component: RecurringSelect,
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecurringSelect>;

export default meta;

type Story = StoryObj<RecurringSelectStoryArgs>;

export const Basic: Story = {
  render: args => {
    const [rule, setRule] = useState<RecurrenceRule>({
      interval: 1,
      type: DurationPeriod.DayOfMonth,
      date: new Set([2, 4, 6, 10, 12, 18, 25, "LAST"]),
    });

    return (
      <RecurringSelect
        disabled={args?.disabled}
        value={rule}
        onChange={setRule}
      />
    );
  },
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  render: Basic.render,
  args: {
    disabled: true,
  },
};
