import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { DatePicker } from "@jobber/components/DatePicker";
import { Content } from "@jobber/components/Content";
import { DataDump } from "@jobber/components/DataDump";
import { Button } from "@jobber/components/Button";
import {
  AtlantisContext,
  atlantisContextDefaultValues,
} from "@jobber/components/AtlantisContext";

export default {
  title: "Components/Selections/DatePicker/Web",
  component: DatePicker,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/AtlantisContext": [
            "atlantisContextDefaultValues",
          ],
        },
      },
    },
  },
} as Meta<typeof DatePicker>;

const BasicTemplate: StoryFn<typeof DatePicker> = args => {
  const [date, setDate] = useState(new Date("01/01/2021"));

  return (
    <Content>
      <DatePicker {...args} selected={date} onChange={setDate} />
      {date && <DataDump defaultOpen data={date} />}
    </Content>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
};
export const Inline = {
  render: BasicTemplate,
  args: {
    inline: true,
  },
};

const MinMaxTemplate: StoryFn<typeof DatePicker> = args => {
  const [date, setDate] = useState(new Date("01/01/2021"));

  return (
    <Content>
      <DatePicker
        {...args}
        minDate={new Date("02/07/2022")}
        maxDate={new Date("03/27/2022")}
        selected={date}
        onChange={setDate}
      />
      {date && <DataDump defaultOpen data={date} />}
    </Content>
  );
};

export const MinDateMaxDate = {
  render: MinMaxTemplate,
};

const CustomActivatorTemplate: StoryFn<typeof DatePicker> = args => {
  const [date, setDate] = useState(args.selected);

  return (
    <Content>
      <DatePicker
        {...args}
        inline={undefined}
        selected={date}
        onChange={setDate}
        activator={<Button label="My fancy activator" variation="learning" />}
      />
      {date && <DataDump defaultOpen data={date} />}
    </Content>
  );
};

export const CustomActivator = {
  render: CustomActivatorTemplate,
};

const RestrictedDateRateTemplate: StoryFn<typeof DatePicker> = args => {
  const [date, setDate] = useState(new Date("01/02/2023"));
  const highlightDates = [
    new Date("01/01/2023"),
    new Date("01/04/2023"),
    new Date("01/20/2023"),
    new Date("01/22/2023"),
    new Date("02/22/2023"),
  ];

  return (
    <Content>
      <DatePicker
        {...args}
        minDate={new Date("01/01/2023")}
        maxDate={new Date("12/31/2023")}
        selected={date}
        inline={undefined}
        onChange={setDate}
        highlightDates={highlightDates}
      />
      <DataDump defaultOpen label="highlightDates" data={highlightDates} />
    </Content>
  );
};

export const RestrictedDateRange = {
  render: RestrictedDateRateTemplate,
  args: {},
};

const WeekStartTemplate: StoryFn<typeof DatePicker> = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Content>
      <Content spacing="small">
        <p>Default (Sunday start):</p>
        <DatePicker selected={date} onChange={setDate} />
      </Content>

      <Content spacing="small">
        <p>Monday start using prop (firstDayOfWeek=1):</p>
        <DatePicker selected={date} onChange={setDate} firstDayOfWeek={1} />
      </Content>

      <Content spacing="small">
        <p>Monday start using AtlantisContext:</p>
        <AtlantisContext.Provider
          value={{
            ...atlantisContextDefaultValues,
            firstDayOfWeek: 1,
          }}
        >
          <DatePicker selected={date} onChange={setDate} />
        </AtlantisContext.Provider>
      </Content>
    </Content>
  );
};

export const WeekStart = {
  render: WeekStartTemplate,
  args: {},
};
