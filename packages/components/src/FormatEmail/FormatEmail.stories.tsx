import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatEmail } from "@jobber/components/FormatEmail";

const meta = {
  title: "Components/Utilities/FormatEmail",
  component: FormatEmail,
} satisfies Meta<typeof FormatEmail>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof FormatEmail>>>;

const BasicTemplate = (args: Story["args"]) => (
  <FormatEmail email={args?.email ?? "myemail@address.me"} />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    email: "myemail@address.me",
  },
};
