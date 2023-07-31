import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Divider, Heading } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/Heading/Mobile",
  component: Heading,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Heading>;

const LevelsTemplate: ComponentStory<typeof Heading> = args => {
  return (
    <>
      <Heading {...args}>New client</Heading>
      <Divider size="base" />
      <Heading level="subtitle">Client details</Heading>
      <Divider size="base" />
      <Heading level="heading">Additional details</Heading>
      <Divider size="base" />
      <Heading level="subHeading">Receives SMS</Heading>
    </>
  );
};

export const Levels = LevelsTemplate.bind({});
Levels.args = { level: "title" };
