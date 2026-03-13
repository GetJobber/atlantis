import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { StatusLabel } from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/StatusLabel",
  component: StatusLabel,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof StatusLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Success",
    alignment: "start",
  },
};
