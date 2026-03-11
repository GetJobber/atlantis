import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputPassword } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputPassword",
  component: InputPassword,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputPassword>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputPassword>>>;

const BasicTemplate = (args: Story["args"]) => <InputPassword {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
  },
};
