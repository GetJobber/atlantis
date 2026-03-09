import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "@jobber/components/DatePicker";
import { Content } from "@jobber/components/Content";
import { DataDump } from "@jobber/components/DataDump";
import { Button } from "@jobber/components/Button";
import {
  AtlantisContext,
  atlantisContextDefaultValues,
} from "@jobber/components/AtlantisContext";

const meta = {
  title: "Components/Selections/DatePicker",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof DatePicker>>>;

const BasicTemplate = (args: Story["args"]) => {
  const [date, setDate] = useState(new Date("01/01/2021"));

  return (
    <Content>
      <DatePicker {...args} selected={date} onChange={setDate} />
      {date && <DataDump defaultOpen data={date} />}
    </Content>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
};

export const Inline: Story = {
  render: BasicTemplate,
  args: {
    inline: true,
  },
};

const MinMaxTemplate = (args: Story["args"]) => {
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

export const MinDateMaxDate: Story = {
  render: MinMaxTemplate,
};

const CustomActivatorTemplate = (args: Story["args"]) => {
  const [date, setDate] = useState(args?.selected);

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

export const CustomActivator: Story = {
  render: CustomActivatorTemplate,
};

const RestrictedDateRateTemplate = (args: Story["args"]) => {
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

export const RestrictedDateRange: Story = {
  render: RestrictedDateRateTemplate,
};

const WeekStartTemplate = () => {
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

export const WeekStart: Story = {
  render: WeekStartTemplate,
};

const OverflowHiddenTemplate = (args: Story["args"]) => {
  const [date, setDate] = useState(new Date("01/01/2021"));

  return (
    <div
      style={{
        overflow: "hidden",
        border: "2px dashed red",
        padding: "16px",
        height: "80px",
      }}
    >
      <DatePicker {...args} selected={date} onChange={setDate} />
    </div>
  );
};

export const InsideOverflowHidden: Story = {
  render: OverflowHiddenTemplate,
};
