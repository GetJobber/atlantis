import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
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
} as Meta<typeof InputGroup>;

const BasicTemplate: StoryFn<typeof InputGroup> = args => {
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

const NestedTemplate: StoryFn<typeof InputGroup> = args => {
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

const DateRangeTemplate: StoryFn<typeof InputGroup> = args => {
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

export const Basic = {
  render: BasicTemplate,
  args: {
    flowDirection: "vertical",
  },
};
export const Nested = {
  render: NestedTemplate,
  args: {
    flowDirection: "vertical",
  },
};
export const DateRange = {
  render: DateRangeTemplate,
  args: {
    flowDirection: "horizontal",
  },
};

const VerticalWithHorizontalRowsTemplate: StoryFn<typeof InputGroup> = args => {
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

export const VerticalWithHorizontalRows = {
  render: VerticalWithHorizontalRowsTemplate,
  args: {
    flowDirection: "vertical",
  },
};
