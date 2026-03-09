import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputEmail } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputEmail",
  component: InputEmail,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputEmail>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputEmail>>>;

const BasicTemplate = (args: Story["args"]) => {
  return <InputEmail {...args} />;
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter your email",
  },
};
