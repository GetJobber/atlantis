import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import { Flex } from "@jobber/components/Flex";

type TooltipStoryArgs = Pick<React.ComponentProps<typeof Tooltip>, "message">;

const meta = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<TooltipStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  return (
    <Flex gap="large" template={["shrink", "shrink"]}>
      <Tooltip message={args?.message ?? "'tis a button"}>
        <Button label="Hover on Me" />
      </Tooltip>
      <Tooltip message={args?.message ?? "'tis a button"}>
        <Button label="Hover on Me Too" />
      </Tooltip>
    </Flex>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    message: "'tis a button",
  },
};
