import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Icon, IconSprite } from "@jobber/components/Icon";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Images and Icons/Icon/Web",
  component: Icon,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Icon>;

const BasicTemplate: ComponentStory<typeof Icon> = args => (
  <Box gap="small">
    <Icon {...args} />
    <IconSprite {...args} />
  </Box>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "gift",
};
