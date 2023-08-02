import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
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
} as ComponentMeta<typeof AutoLink>;

const BasicTemplate: ComponentStory<typeof AutoLink> = args => {
  return <AutoLink {...args} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  children:
    "I am a test with a link to getjobber.com! Call me at 902-555-5555 or email me at test@example.com",
};

export const SkipPhoneNumber = BasicTemplate.bind({});

SkipPhoneNumber.args = {
  phone: false,
  children:
    "Ignoring phone numbers like 902-555-5555 but still linking getjobber.com!",
};
