import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";

export default {
  title: "Components/Text and Typography/Heading/Web",
  component: Heading,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Heading>;

const LevelsTemplate: ComponentStory<typeof Heading> = args => {
  return (
    <Content>
      <Heading {...args}>New client</Heading>
      <Divider size="base" />
      <Heading level={2}>Client details</Heading>
      <Divider size="base" />
      <Heading level={3}>Contact details</Heading>
      <Divider size="base" />
      <Heading level={4}>Phone numbers</Heading>
      <Divider size="base" />
      <Heading level={5}>Receives SMS</Heading>
      <Divider size="base" />
      <Heading level={6}>Business settings</Heading>
    </Content>
  );
};

export const Levels = LevelsTemplate.bind({});
Levels.args = { level: 1 };
