import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Rectangle } from "@jobber/components/Rectangle";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Layouts and Structure/Rectangle/Web",
  component: Rectangle,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Rectangle>;

const BasicTemplate: ComponentStory<typeof Rectangle> = args => (
  <Rectangle {...args}>
    <Stack>
      <Heading level={2}>Rectangle Content</Heading>
      <Text>This is an example of content inside a Rectangle component.</Text>
    </Stack>
  </Rectangle>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  padding: "base",
  borderWidth: "0px",
  colorSurface: "color-surface",
  colorInverse: "color-text",
};

export const WithLargePadding = BasicTemplate.bind({});
WithLargePadding.args = {
  padding: "largest",
  borderWidth: "0px",
  colorSurface: "color-surface",
  colorInverse: "color-text",
};

export const WithBorder = BasicTemplate.bind({});
WithBorder.args = {
  padding: "base",
  borderWidth: "2px",
  colorSurface: "color-surface",
  colorInverse: "color-text",
};

export const Inverted = BasicTemplate.bind({});
Inverted.args = {
  padding: "base",
  borderWidth: "2px",
  colorSurface: "color-surface",
  colorInverse: "color-text",
  invert: true,
};

export const CustomBackground = BasicTemplate.bind({});
CustomBackground.args = {
  padding: "base",
  borderWidth: "0px",
  colorSurface: "color-surface--background",
  colorInverse: "color-text",
};
