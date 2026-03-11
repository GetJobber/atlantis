import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputTime } from "@jobber/components/InputTime";
import { InputText } from "@jobber/components/InputText";
import { InputDate } from "@jobber/components/InputDate";
import { Button } from "@jobber/components/Button";

const meta = {
  title: "Components/Forms and Inputs/InputGroup",
  component: InputGroup,
} satisfies Meta<typeof InputGroup>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof InputGroup>, "flowDirection">
>;

const BasicTemplate = (args: Story["args"]) => {
  const startTime = new Date();
  startTime.setHours(8, 35, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 55, 0, 0);

  return (
    <InputGroup flowDirection={args?.flowDirection}>
      <InputTime defaultValue={startTime} />
      <InputTime defaultValue={endTime} />
    </InputGroup>
  );
};

const NestedTemplate = (args: Story["args"]) => {
  return (
    <InputGroup flowDirection={args?.flowDirection}>
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

const DateRangeTemplate = (args: Story["args"]) => {
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Button label="Button" />

      <InputGroup flowDirection={args?.flowDirection}>
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    flowDirection: "vertical",
  },
};

export const Nested: Story = {
  render: NestedTemplate,
  args: {
    flowDirection: "vertical",
  },
};

export const DateRange: Story = {
  render: DateRangeTemplate,
  args: {
    flowDirection: "horizontal",
  },
};

const VerticalWithHorizontalRowsTemplate = (args: Story["args"]) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <InputGroup flowDirection={args?.flowDirection}>
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

export const VerticalWithHorizontalRows: Story = {
  render: VerticalWithHorizontalRowsTemplate,
  args: {
    flowDirection: "vertical",
  },
};
