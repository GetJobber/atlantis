import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Content, Divider, Heading } from "@jobber/components-native";

const meta = {
  title: "Components/Text and Typography/Heading",
  component: Heading,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<Pick<React.ComponentProps<typeof Heading>, "level">>;

const LevelsTemplate = (args: Story["args"]) => {
  return (
    <Content>
      <Heading level={args?.level ?? "title"}>New client</Heading>
      <Divider size="base" />
      <Heading level="subtitle">Client details</Heading>
      <Divider size="base" />
      <Heading level="heading">Additional details</Heading>
      <Divider size="base" />
      <Heading level="subHeading">Receives SMS</Heading>
    </Content>
  );
};

export const Levels: Story = {
  render: LevelsTemplate,
  args: { level: "title" },
};
