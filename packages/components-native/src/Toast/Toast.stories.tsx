import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Button, Toast, showToast } from "@jobber/components-native";

interface ToastStoryArgs {
  message: string;
}

const meta = {
  title: "Components/Status and Feedback/Toast",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  decorators: [
    Story => {
      return (
        // eslint-disable-next-line react/forbid-elements -- This is a storybook decorator so it doesn't affect react-native stuff
        <div style={{ height: "90vh" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<ToastStoryArgs>;

export default meta;

type Story = StoryObj<ToastStoryArgs>;

const Template = (args: Story["args"]) => (
  <>
    <Button
      label="Show toast"
      onPress={() =>
        showToast({
          message: args?.message ?? "Showed toast",
          bottomTabsVisible: false,
        })
      }
    />
    <Toast />
  </>
);

export const Basic: Story = {
  render: Template,
  args: {
    message: "Showed toast",
  },
};
