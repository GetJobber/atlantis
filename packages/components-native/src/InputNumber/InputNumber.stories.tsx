import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputNumber } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputNumber",
  component: InputNumber,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputNumber>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputNumber>>>;

const BasicTemplate = (args: Story["args"]) => <InputNumber {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Quantity",
    value: 12,
  },
};

export const Invalid: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Area",
    invalid: "Enter a number",
    suffix: { label: "meters" },
    clearable: "never",
  },
};
