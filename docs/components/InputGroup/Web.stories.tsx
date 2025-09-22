import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputTime } from "@jobber/components/InputTime";
import { InputText } from "@jobber/components/InputText";
import { InputDate } from "@jobber/components/InputDate";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputGroup/Web",
  component: InputGroup,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof InputGroup>;

const BasicTemplate: ComponentStory<typeof InputGroup> = args => {
  const startTime = new Date();
  startTime.setHours(8, 35, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 55, 0, 0);

  return (
    <InputGroup {...args}>
      <InputTime defaultValue={startTime} />
      <InputTime defaultValue={endTime} />
    </InputGroup>
  );
};

const NestedTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputText placeholder="Street 1" />
      <InputText placeholder="Street 2" />
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="City" />
        <InputText placeholder="Province" />
      </InputGroup>
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="Postal Code" />
        <InputText placeholder="Country" />
      </InputGroup>
    </InputGroup>
  );
};

const DateRangeTemplate: ComponentStory<typeof InputGroup> = args => {
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Button label="Button" />

      <InputGroup {...args}>
        <InputDate
          value={startDate}
          onChange={setStartDate}
          placeholder="Start Date"
        />
        <InputDate
          value={endDate}
          onChange={setEndDate}
          placeholder="End Date"
          minDate={startDate}
        />
      </InputGroup>
    </div>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  flowDirection: "vertical",
};

export const Nested = NestedTemplate.bind({});
Nested.args = {
  flowDirection: "vertical",
};

export const DateRange = DateRangeTemplate.bind({});
DateRange.args = {
  flowDirection: "horizontal",
};

const VerticalWithHorizontalRowsTemplate: ComponentStory<
  typeof InputGroup
> = args => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <InputGroup {...args}>
        <InputText placeholder="Street 1" />
        <InputText placeholder="Street 2" />
        <InputGroup flowDirection="horizontal">
          <InputText placeholder="City" />
          <InputText placeholder="Province" />
        </InputGroup>
        <InputGroup flowDirection="horizontal">
          <InputText placeholder="Postal Code" />
          <InputText placeholder="Country" />
          <InputText placeholder="Planet" />
        </InputGroup>
      </InputGroup>
    </div>
  );
};

export const VerticalWithHorizontalRows =
  VerticalWithHorizontalRowsTemplate.bind({});
VerticalWithHorizontalRows.args = {
  flowDirection: "vertical",
};
