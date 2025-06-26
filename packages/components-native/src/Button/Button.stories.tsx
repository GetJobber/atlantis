import type { Meta, StoryObj } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Actions/Button/Mobile",
  component: Button,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    label: "New Job",
    onPress: action("Button Pressed: New Job"),
  },
};

export const Cancel: Story = {
  args: {
    label: "Cancel",
    variation: "cancel",
    onPress: action("Button Pressed: Cancel"),
  },
};
