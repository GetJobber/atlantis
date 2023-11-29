import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonDismiss } from "@jobber/components/ButtonDismiss";

export default {
  title: "Components/Private/ButtonDismiss/Web",
  component: ButtonDismiss,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof ButtonDismiss>;

const BasicTemplate: ComponentStory<typeof ButtonDismiss> = args => (
  <ButtonDismiss {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  onClick: () => {
    alert("🎃");
  },
};
