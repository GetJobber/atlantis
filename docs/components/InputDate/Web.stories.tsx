import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputDate } from "@jobber/components/InputDate";

export default {
  title: "Components/Forms and Inputs/InputDate/Web",
  component: InputDate,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputDate>;

const BasicTemplate: ComponentStory<typeof InputDate> = args => {
  const [date, setDate] = useState<Date | undefined>(new Date("11/11/2011"));

  return <InputDate {...args} value={date} onChange={setDate} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Start Date",
};

const MinMaxTemplate: ComponentStory<typeof InputDate> = args => {
  const minDate = new Date("11/06/2011");
  const maxDate = new Date("11/25/2011");
  const [date, setDate] = useState<Date | undefined>(new Date("11/11/2011"));

  return (
    <InputDate
      {...args}
      minDate={minDate}
      maxDate={maxDate}
      value={date}
      onChange={setDate}
    />
  );
};

export const MinMax = MinMaxTemplate.bind({});
MinMax.args = {
  placeholder: "Start Date",
};
