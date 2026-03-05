import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
/* eslint-disable import/no-deprecated */
import type { RecurrenceRule } from "@jobber/components/RecurringSelect";
import {
  DurationPeriod,
  RecurringSelect,
} from "@jobber/components/RecurringSelect";

export default {
  title: "Components/Deprecated/RecurringSelect/Web",
  component: RecurringSelect,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/RecurringSelect": [
            "DurationPeriod",
            "RecurrenceRule",
            "RecurringSelect",
          ],
        },
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof RecurringSelect>;

const BasicTemplate: StoryFn<typeof RecurringSelect> = args => {
  const [rule, setRule] = useState<RecurrenceRule>({
    interval: 1,
    type: DurationPeriod.DayOfMonth,
    date: new Set([2, 4, 6, 10, 12, 18, 25, "LAST"]),
  });

  return <RecurringSelect {...args} value={rule} onChange={setRule} />;
};

export const Basic = {
  render: BasicTemplate,
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    disabled: true,
  },
};
