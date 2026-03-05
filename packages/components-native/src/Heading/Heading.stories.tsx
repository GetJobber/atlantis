import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { Content, Divider } from "@jobber/components-native";
import { Heading } from "./Heading";

const meta = {
  title: "Components/Text and Typography/Heading/Mobile",
  component: Heading,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Heading>;

export default meta;

const LevelsTemplate = (args: unknown) => {
  const headingArgs = (
    typeof args === "object" && args ? args : {}
  ) as Parameters<typeof Heading>[0];

  return (
    <Content>
      <Heading {...headingArgs}>New client</Heading>
      <Divider size="base" />
      <Heading level="subtitle">Client details</Heading>
      <Divider size="base" />
      <Heading level="heading">Additional details</Heading>
      <Divider size="base" />
      <Heading level="subHeading">Receives SMS</Heading>
    </Content>
  );
};

export const Levels = {
  render: LevelsTemplate,
  args: { level: "title" },
};
