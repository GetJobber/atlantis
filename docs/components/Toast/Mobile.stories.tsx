import React, { JSXElementConstructor } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button, Toast, showToast } from "@jobber/components-native";

type ToastElement = JSXElementConstructor<Parameters<typeof showToast>[0]>;

export default {
  title: "Components/Status and Feedback/Toast/Mobile",
  component: showToast as ToastElement,
  parameters: {
    viewMode: "story",
    viewport: { defaultViewport: "mobile1" },
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components-native": ["Toast", "showToast"],
        },
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ height: "90vh" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<ToastElement>;

const Template: ComponentStory<ToastElement> = args => (
  <>
    <Button label="Show toast" onPress={() => showToast(args)} />
    <Toast />
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  message: "Toast showed",
};
