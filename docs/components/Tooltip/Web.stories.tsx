import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Tooltip>;

const BasicTemplate: ComponentStory<typeof Tooltip> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  message: "'tis a button",
};
