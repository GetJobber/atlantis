import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CalendarPicker,
  PickedCalendarRange,
  useHumanReadableRRule,
  usePickedCalendarRangeFromRRule,
  useRRuleFromPickedCalendarRange,
} from "@jobber/components/CalendarPicker";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Selections/Calendar/Web",
  component: CalendarPicker,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/CalendarPicker": ["CalendarPicker"],
        },
      },
    },
  },
} as ComponentMeta<typeof CalendarPicker>;

interface BasicProps {
  range?: string;
  enableRangeInteraction?: boolean;
}

const CalendarPicker1 = ({ range }: { readonly range: string }) => {
  return <div>{range}</div>;
};

const BasicTemplate: ComponentStory<typeof CalendarPicker1> = (
  args: BasicProps,
) => {
  const [range, setRange] = useState<PickedCalendarRange>();
  const { rule } = useRRuleFromPickedCalendarRange(range);

  const pickedRange = usePickedCalendarRangeFromRRule(args.range || "");

  return (
    <Content>
      <CalendarPicker
        restrict
        enableRangeInteraction={args.enableRangeInteraction}
        defaultPickedCalendarRange={pickedRange}
        onUpdate={update => {
          setRange(update);
        }}
      />
      {rule}
    </Content>
  );
};

const HookTemplate: ComponentStory<typeof CalendarPicker1> = ({
  range = "",
}: {
  readonly range: string;
}) => {
  const humanRange = useHumanReadableRRule(range);

  return <div>{humanRange}</div>;
};
export const Hook = HookTemplate.bind({});
Hook.args = {
  range: "RRULE:FREQ=DAILY;INTERVAL=15;",
};
export const Hook1 = HookTemplate.bind({});
Hook1.args = {
  range: "RRULE:FREQ=MONTHLY;INTERVAL=2;BYDAY=+2TH",
};
export const Hook2 = HookTemplate.bind({});
Hook2.args = {
  range: "RRULE:FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=2,3",
};

export const Base = BasicTemplate.bind({});
Base.args = {
  range: "",
};
