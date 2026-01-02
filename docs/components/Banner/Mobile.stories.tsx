import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner, Content, Text, TextList } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/Banner/Mobile",
  component: Banner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Banner>;

const BasicTemplate: ComponentStory<typeof Banner> = () => (
  <Content>
    <Banner type="success">
      <Text>Your import is complete</Text>
    </Banner>
    <Banner type="notice">
      <Text>Your import is in progress</Text>
    </Banner>
    <Banner type="warning">
      <Text>Your trial is about to end</Text>
    </Banner>
    <Banner type="error">
      <Text>There was an error with your import</Text>
    </Banner>
  </Content>
);

const ActionsTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>
    <Text>Your trial has been extended!</Text>
  </Banner>
);

const ErrorTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>
    <Text>Currently offline. Functionality is limited.</Text>
  </Banner>
);

const ErrorDetailsTemplate: ComponentStory<typeof Banner> = args => {
  const listItems = [
    "This client already exists",
    "This phone number doesn't receive SMS",
  ];

  return (
    <Banner {...args}>
      <Text level="text">There was an error submitting your form:</Text>
      <TextList level="text" items={listItems} />
    </Banner>
  );
};

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
  icon: "alert",
};
