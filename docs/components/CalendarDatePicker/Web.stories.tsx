import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { add, startOfMonth } from "date-fns";
import { Content } from "@jobber/components/Content";
import { CalendarDatePicker } from "@jobber/components/CalendarDatePicker";

export default {
  title: "Components/Selections/CalendarDatePicker/Web",
  component: CalendarDatePicker,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof CalendarDatePicker>;

const SingleDateSelectionTemplate: ComponentStory<
  typeof CalendarDatePicker
> = args => {
  const [date, setDate] = useState<Date | undefined>();

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
        selected={date}
        minDate={startOfMonth(new Date())}
        maxDate={add(new Date(), { months: 2 })}
        hightlightedDates={highlightDates}
        onChange={setDate}
        weekStartsOnMonday={!!args.weekStartsOnMonday}
      />
    </Content>
  );
};

export const SingleDateSelection = SingleDateSelectionTemplate.bind({});
SingleDateSelection.args = {};
export const Basic = SingleDateSelectionTemplate.bind({});
Basic.args = {};

const MultiDateSelectionTemplate: ComponentStory<
  typeof CalendarDatePicker
> = args => {
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
        multi
        selected={dates}
        minDate={startOfMonth(new Date())}
        maxDate={add(new Date(), { months: 2 })}
        hightlightedDates={highlightDates}
        onChange={setDates}
        weekStartsOnMonday={!!args.weekStartsOnMonday}
      />
    </Content>
  );
};

export const MultiDateSelection = MultiDateSelectionTemplate.bind({});
MultiDateSelection.args = {};

const RangeDateSelectionTemplate: ComponentStory<
  typeof CalendarDatePicker
> = args => {
  const [dates, setDates] = useState<[] | [Date] | [Date, Date]>([]);

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
        range
        selected={dates}
        minDate={startOfMonth(new Date())}
        maxDate={add(new Date(), { months: 2 })}
        hightlightedDates={highlightDates}
        onChange={setDates}
        weekStartsOnMonday={!!args.weekStartsOnMonday}
      />
    </Content>
  );
};

export const RangeDateSelection = RangeDateSelectionTemplate.bind({});
RangeDateSelection.args = {};
