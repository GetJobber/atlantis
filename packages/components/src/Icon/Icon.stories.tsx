import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "@jobber/components/Icon";

const meta = {
  title: "Components/Images and Icons/Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<Pick<React.ComponentProps<typeof Icon>, "name">>;

const BasicTemplate = (args: Story["args"]) => (
  <Icon name={args?.name ?? "gift"} />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    name: "gift",
  },
};
