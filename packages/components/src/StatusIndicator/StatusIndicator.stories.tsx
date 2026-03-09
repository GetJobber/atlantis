import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIndicator } from "@jobber/components/StatusIndicator";

const meta = {
  title: "Components/Status and Feedback/StatusIndicator",
  component: StatusIndicator,
} satisfies Meta<typeof StatusIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: "success",
  },
};
