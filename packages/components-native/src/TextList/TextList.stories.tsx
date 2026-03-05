import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { TextList } from "./TextList";

export default {
  title: "Components/Lists and Tables/TextList/Mobile",
  component: TextList,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof TextList>;

const BasicTemplate = (args: unknown) => {
  const textListArgs = (
    typeof args === "object" && args ? args : {}
  ) as Parameters<typeof TextList>[0];

  return <TextList {...textListArgs} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    items: ["Item uno", "Item dos", "Item tres"],
  },
};
export const Levels = {
  render: BasicTemplate,
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    level: "textSupporting",
  },
};
export const Emphasis = {
  render: BasicTemplate,
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    emphasis: "strong",
  },
};
export const Spacing = {
  render: BasicTemplate,
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    spacing: "large",
  },
};
export const ChildSpacing = {
  render: BasicTemplate,
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    childSpacing: "large",
  },
};
