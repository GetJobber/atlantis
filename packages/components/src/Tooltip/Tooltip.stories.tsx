import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Tooltip } from "@jobber/components/Tooltip";
import { Button } from "@jobber/components/Button";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Overlays/Tooltip/Web",
  component: Tooltip,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Tooltip>;

const BasicTemplate: StoryFn<typeof Tooltip> = args => {
  return (
    <Flex gap="large" template={["shrink", "shrink"]}>
      <Tooltip {...args}>
        <Button label="Hover on Me" />
      </Tooltip>
      <Tooltip {...args}>
        <Button label="Hover on Me Too" />
      </Tooltip>
    </Flex>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    message: "'tis a button",
  },
};
