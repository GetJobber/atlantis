import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/Banner/Mobile",
  component: Banner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Banner>;

const BasicTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>Your import is in progress</Banner>
);

const ActionsTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>Your trial has been extended!</Banner>
);

const ErrorTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>Currently offline. Functionality is limited.</Banner>
);

const ErrorDetailsTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>There was an error submitting your form:</Banner>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "notice",
};

export const ActionsInBanners = ActionsTemplate.bind({});
ActionsInBanners.args = {
  type: "notice",
  action: { label: "View Plans", onPress: () => alert("Plans") },
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  type: "error",
  icon: "offline",
};

export const ErrorDetails = ErrorDetailsTemplate.bind({});
ErrorDetails.args = {
  type: "error",
  details: [
    "This client already exists",
    "This phone number doesn't receive SMS",
  ],
  icon: "alert",
};
