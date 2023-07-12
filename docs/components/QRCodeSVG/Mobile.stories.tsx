import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QRCodeSVG } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/QRCodeSVG/Mobile",
  component: QRCodeSVG,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof QRCodeSVG>;

const BasicTemplate: ComponentStory<typeof QRCodeSVG> = args => (
  <QRCodeSVG {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  data: "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md",
};
