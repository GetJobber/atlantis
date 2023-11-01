import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Icon } from "@jobber/components/Icon";
import { IconAnimated } from "@jobber/components/IconAnimated";

export default {
  title: "Components/Images and Icons/Icon/Web",
  component: Icon,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Icon>;

const BasicTemplate: ComponentStory<typeof Icon> = args => <Icon {...args} />;

const AnimatedTemplate: ComponentStory<typeof IconAnimated> = args => (
  <IconAnimated {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "gift",
};

export const Animated = AnimatedTemplate.bind({});
Animated.args = {
  name: "gift",
};
