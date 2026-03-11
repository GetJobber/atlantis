import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatRelativeDateTime } from "@jobber/components/FormatRelativeDateTime";

const meta = {
  title: "Components/Utilities/FormatRelativeDateTime",
  component: FormatRelativeDateTime,
} satisfies Meta<typeof FormatRelativeDateTime>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof FormatRelativeDateTime>, "date">
>;

const BasicTemplate = (args: Story["args"]) => (
  <FormatRelativeDateTime
    date={
      args?.date ?? new Date(new Date().setMinutes(new Date().getMinutes() - 5))
    }
  />
);

export const Basic: Story = {
  render: BasicTemplate,
};
