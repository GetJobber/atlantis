import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DatePicker } from "@jobber/components/DatePicker";
import { Content } from "@jobber/components/Content";
import { DataDump } from "@jobber/components/DataDump";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Selections/DatePicker/Web",
  component: DatePicker,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof DatePicker>;

const BasicTemplate: ComponentStory<typeof DatePicker> = args => {
  const [date, setDate] = useState(new Date("01/01/2021"));
  return (
    <Content>
      <DatePicker {...args} selected={date} onChange={setDate} />
      {date && <DataDump defaultOpen data={date} />}
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const Inline = BasicTemplate.bind({});
Inline.args = {
  inline: true,
};

const MinMaxTemplate: ComponentStory<typeof DatePicker> = args => {
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

export const MinDateMaxDate = MinMaxTemplate.bind({});

const CustomActivatorTemplate: ComponentStory<typeof DatePicker> = args => {
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

export const CustomActivator = CustomActivatorTemplate.bind({});

const RestrictedDateRateTemplate: ComponentStory<typeof DatePicker> = args => {
  const [date, setDate] = useState(new Date("01/02/2023"));
  const highlightDates = [
    new Date("01/01/2023"),
    new Date("02/20/2023"),
    new Date("04/07/2023"),
    new Date("05/22/2023"),
    new Date("07/01/2023"),
    new Date("08/07/2023"),
    new Date("09/04/2023"),
    new Date("10/09/2023"),
    new Date("11/13/2023"),
    new Date("12/25/2023"),
    new Date("12/26/2023"),
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

export const RestrictedDateRange = RestrictedDateRateTemplate.bind({});

RestrictedDateRange.args = {};
