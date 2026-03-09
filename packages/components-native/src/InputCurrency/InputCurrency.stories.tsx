import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputCurrency } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputCurrency",
  component: InputCurrency,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof InputCurrency>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Unit Price",
  },
};
