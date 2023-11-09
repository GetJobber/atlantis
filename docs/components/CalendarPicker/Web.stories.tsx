import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CalendarPicker,
  PickedCalendarRange,
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

const BasicTemplate: ComponentStory<typeof CalendarPicker> = () => {
  const [range, setRange] = useState<PickedCalendarRange>();
  const { rule } = useRRuleFromPickedCalendarRange(range);
  useEffect(() => {
    localStorage.setItem("rule", rule);
  }, [rule]);

  const pickedRange = usePickedCalendarRangeFromRRule(
    localStorage.getItem("rule") || "",
  );
  console.log("RULE", rule);

  return (
    <Content>
      <CalendarPicker
        restrict
        defaultPickedCalendarRange={pickedRange}
        onUpdate={update => {
          setRange(update);
        }}
      />
    </Content>
  );
};

export const Base = BasicTemplate.bind({});
