import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { AutoLink } from "@jobber/components-native";

export default {
  title: "Components/Text and Typography/AutoLink/Mobile",
  component: AutoLink,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof AutoLink>;

const BasicTemplate: StoryFn<typeof AutoLink> = args => {
  return <AutoLink {...args} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    children:
      "I am a test with a link to getjobber.com! Call me at 902-555-5555 or email me at test@example.com",
  },
};
export const SkipPhoneNumber = {
  render: BasicTemplate,
  args: {
    phone: false,
    children:
      "Ignoring phone numbers like 902-555-5555 but still linking getjobber.com!",
  },
};
