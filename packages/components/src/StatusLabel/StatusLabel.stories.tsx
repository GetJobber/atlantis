import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusLabel } from "@jobber/components/StatusLabel";

const meta = {
  title: "Components/Status and Feedback/StatusLabel",
  component: StatusLabel,
} satisfies Meta<typeof StatusLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Success",
    alignment: "start",
    status: "success",
  },
};
