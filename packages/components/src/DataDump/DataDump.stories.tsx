import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataDump } from "@jobber/components/DataDump";

const meta = {
  title: "Components/Utilities/DataDump",
  component: DataDump,
} satisfies Meta<typeof DataDump>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => <DataDump {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    data: {
      name: "Bob",
    },
  },
};
