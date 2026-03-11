import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputDate } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputDate",
  component: InputDate,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputDate>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputDate>>>;

const BasicTemplate = (args: Story["args"]) => {
  const [date, setDate] = useState(new Date("11/11/2011"));

  return <InputDate {...args} value={date} onChange={setDate} />;
};

export const Basic: Story = {
  render: BasicTemplate,
};

export const EmptyValueLabel: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Start date",
    emptyValueLabel: "Unscheduled",
  },
};

export const Invalid: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Start date",
    invalid: "Start Date is required",
  },
};
