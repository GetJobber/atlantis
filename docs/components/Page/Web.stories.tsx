import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Page } from "@jobber/components/Page";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Layouts and Structure/Page/Web",
  component: Page,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Page>;

const BasicTemplate: ComponentStory<typeof Page> = args => (
  <Page {...args}>
    <Content>
      <Text>Page content here</Text>
    </Content>
  </Page>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Notifications",
  intro:
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
};

export const WithActions = BasicTemplate.bind({});
WithActions.args = {
  title: "Notification Settings",
  intro: "This isn't just talk. Get into action with some buttons and menus.",
  primaryAction: { label: "Send Food Alert", onClick: () => alert("🥨") },
  secondaryAction: { label: "Send Drink Alert", onClick: () => alert("🍹") },
  moreActionsMenu: [
    {
      actions: [
        {
          label: "Edit",
          icon: "edit",
          onClick: () => {
            alert("✏️");
          },
        },
      ],
    },
    {
      header: "Send as...",
      actions: [
        {
          label: "Text Message",
          icon: "sms",
          onClick: () => {
            alert("📱");
          },
        },
        {
          label: "Email",
          icon: "email",
          onClick: () => {
            alert("📨");
          },
        },
      ],
    },
  ],
};

export const WithSubtitle = BasicTemplate.bind({});
WithSubtitle.args = {
  title: "Notifications",
  subtitle: "Notify me of all the work",
  intro:
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
};
