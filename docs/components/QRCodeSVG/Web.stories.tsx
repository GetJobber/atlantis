import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QRCodeSVG } from "@jobber/components/QRCodeSVG";

export default {
  title: "Components/Images and Icons/QRCodeSVG/Web",
  component: QRCodeSVG,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof QRCodeSVG>;

const BasicTemplate: ComponentStory<typeof QRCodeSVG> = args => (
  <QRCodeSVG {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  data: "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md",
};
