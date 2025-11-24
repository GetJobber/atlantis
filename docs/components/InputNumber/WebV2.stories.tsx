import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "@jobber/components/InputNumber";

const meta = {
  title: "Components/Forms and Inputs/InputNumber/Web (v2)",
  component: InputNumber,
  args: {
    version: 2,
    placeholder: "Quantity",
    defaultValue: 3,
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
