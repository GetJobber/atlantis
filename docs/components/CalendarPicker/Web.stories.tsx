import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CalendarPicker,
  PickedCalendarRange,
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
  console.log("Final String:", rule);

  return (
    <Content>
      <CalendarPicker
        restrict
        onUpdate={update => {
          console.log("got an update!", update);
          setRange(update);
        }}
      />
    </Content>
  );
};

export const Base = BasicTemplate.bind({});
