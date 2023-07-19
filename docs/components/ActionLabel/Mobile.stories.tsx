import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ActionLabel } from "@jobber/components-native";

export default {
  title: "Components/Actions/ActionLabel/Mobile",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
  component: ActionLabel,
} as ComponentMeta<typeof ActionLabel>;

const BasicTemplate: ComponentStory<typeof ActionLabel> = args => (
  <ActionLabel {...args}>{args.children}</ActionLabel>
);

export const Basic = BasicTemplate.bind({});
Basic.args = { children: "I am a label text" };

export const Color = BasicTemplate.bind({});
Color.args = { variation: "learning", children: "Learning" };

export const DarkBackground = BasicTemplate.bind({});
DarkBackground.args = { variation: "onPrimary", children: "Light Me Up" };
DarkBackground.parameters = {
  backgrounds: { default: "dark" },
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = { disabled: true, children: "Disabled" };
