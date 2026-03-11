import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Banner, Content, Text, TextList } from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/Banner",
  component: Banner,
  args: {
    type: "notice",
    children: "Your import is in progress",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = () => (
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

const ActionsTemplate = (args: Story["args"]) => (
  <Banner {...args}>{args?.children}</Banner>
);

const ErrorTemplate = (args: Story["args"]) => (
  <Banner {...args}>{args?.children}</Banner>
);

const ErrorDetailsTemplate = (args: Story["args"]) => {
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

export const Basic: Story = {
  render: BasicTemplate,
};

export const ActionsInBanners: Story = {
  render: ActionsTemplate,
  args: {
    type: "notice",
    children: "Your trial has been extended!",
    action: { label: "View Plans", onPress: () => alert("Plans") },
  },
};

export const Error: Story = {
  render: ErrorTemplate,
  args: {
    type: "error",
    children: "Currently offline. Functionality is limited.",
    icon: "offline",
  },
};

export const ErrorDetails: Story = {
  render: ErrorDetailsTemplate,
  args: {
    type: "error",
    icon: "alert",
  },
};
