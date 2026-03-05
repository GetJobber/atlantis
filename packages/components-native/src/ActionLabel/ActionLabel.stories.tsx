import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { ActionLabel } from "./ActionLabel";

export default {
  title: "Components/Actions/ActionLabel/Mobile",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
  component: ActionLabel,
} satisfies Meta<typeof ActionLabel>;

interface ActionLabelStoryArgs {
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly variation?:
    | "interactive"
    | "destructive"
    | "learning"
    | "subtle"
    | "onPrimary";
}

const BasicTemplate = (args: ActionLabelStoryArgs) => (
  <ActionLabel {...args}>{args.children}</ActionLabel>
);

export const Basic = {
  render: BasicTemplate,
  args: { children: "I am a label text" },
};
export const Color = {
  render: BasicTemplate,
  args: { variation: "learning", children: "Learning" },
};
export const DarkBackground = {
  render: BasicTemplate,
  args: { variation: "onPrimary", children: "Light Me Up" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled = {
  render: BasicTemplate,
  args: { disabled: true, children: "Disabled" },
};
