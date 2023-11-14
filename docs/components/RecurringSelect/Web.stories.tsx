import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  DurationPeriod,
  RecurrenceRule,
  RecurringSelect,
} from "@jobber/components/RecurringSelect";

export default {
  title: "Components/Selections/RecurringSelect/Web",
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
} as ComponentMeta<typeof RecurringSelect>;

const BasicTemplate: ComponentStory<typeof RecurringSelect> = args => {
  const [rule, setRule] = useState<RecurrenceRule>({
    interval: 1,
    type: DurationPeriod.DayOfMonth,
    date: new Set([2, 4, 6, 10, 12, 18, 25, "LAST"]),
  });
  console.log("RULE?", rule);

  return (
    <RecurringSelect
      {...args}
      value={rule}
      onChange={x => {
        console.log("RULE!", x);

        setRule(x);
      }}
    />
  );
};

export const Basic = BasicTemplate.bind({});
export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  disabled: true,
};
