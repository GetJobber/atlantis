import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatDate } from "@jobber/components/FormatDate";

const meta = {
  title: "Components/Utilities/FormatDate",
  component: FormatDate,
} satisfies Meta<typeof FormatDate>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => <FormatDate {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    date: new Date(),
  },
};
