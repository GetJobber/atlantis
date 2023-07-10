import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ActionLabel } from "@jobber/components-native";

export default {
  title: "Components/Actions/ActionLabel/Mobile",
  parameters: {
    viewMode: "story",
  },
  component: ActionLabel,
} as ComponentMeta<typeof ActionLabel>;

const BasicTemplate: ComponentStory<typeof ActionLabel> = args => (
  <ActionLabel {...args}>{args.children}</ActionLabel>
);

export const Basic = BasicTemplate.bind({});
Basic.args = { children: "I am a label text" };

export const ColorVariation = BasicTemplate.bind({});
ColorVariation.args = { variation: "learning", children: "Learning" };

export const Disabled = BasicTemplate.bind({});
Disabled.args = { disabled: true, children: "Disabled" };
