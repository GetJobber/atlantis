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
  <Banner {...args} />
);

const ActionsTemplate: ComponentStory<typeof Banner> = args => (
  <Banner
    {...args}
    type="notice"
    action={{
      label: "View Plans",
      onPress: () => alert("Plans"),
    }}
  />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "notice",
  text: "Your import is in progress",
};

export const ActionsInBanners = ActionsTemplate.bind({});
ActionsInBanners.args = {
  text: "Your trial has been extended!",
};

export const Error = BasicTemplate.bind({});
Error.args = {
  type: "error",
  text: "Something has gone wrong. Please retry in a few minutes.",
};

export const ErrorDetails = BasicTemplate.bind({});
ErrorDetails.args = {
  type: "error",
  text: "There was an error submitting your form",
  details: [
    "This client already exists",
    "This phone number doesn't receive SMS",
  ],
};
