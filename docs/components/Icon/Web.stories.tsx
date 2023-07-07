import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Images and Icons/Icon/Web",
  component: Icon,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Icon>;

const BasicTemplate: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "gift",
};
