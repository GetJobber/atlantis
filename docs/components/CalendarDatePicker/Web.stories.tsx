import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { add } from "date-fns";
import { Content } from "@jobber/components/Content";
import { CalendarDatePicker } from "@jobber/components/CalandarDatePicker";

export default {
  title: "Components/Selections/CalendarDatePicker/Web",
  component: CalendarDatePicker,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof CalendarDatePicker>;

const BasicTemplate: ComponentStory<typeof CalendarDatePicker> = args => {
  const [dates, setDates] = useState<Date[]>([]);

  const highlightDates = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) =>
        add(new Date(), { days: index }),
      ),
    [],
  );

  return (
    <Content>
      <CalendarDatePicker
        selected={dates}
        minDate={new Date()}
        maxDate={add(new Date(), { months: 2 })}
        hightlightedDates={highlightDates}
        onChange={setDates}
        weekStartsOnMonday
        range
        {...args}
      />
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
