import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components/Banner";

export default {
  title: "Components/Status and Feedback/Banner/Web",
  component: Banner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Banner>;

const BasicTemplate: ComponentStory<typeof Banner> = args => (
  <Banner {...args}>Your splines are being reticulated</Banner>
);

const ActionsTemplate: ComponentStory<typeof Banner> = args => (
  <>
    <Banner
      type="notice"
      primaryAction={{
        label: "View Plans",
        onClick: () => alert("Plans"),
      }}
      dismissible={false}
    >
      Your trial has been extended!
    </Banner>
    <Banner
      {...args}
      primaryAction={{
        label: "Refresh",
        onClick: () => alert("Refreshing"),
      }}
      icon="offline"
    >
      Network is unavailable. Please check your internet connection.
    </Banner>
  </>
);

const SuccessTemplate: ComponentStory<typeof Banner> = args => (
  <Banner
    primaryAction={{
      label: "View clients",
      onClick: () => alert("🎉 Woo hoo"),
    }}
    {...args}
  >
    Your client import is complete
  </Banner>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "notice",
};

export const ActionsInBanners = ActionsTemplate.bind({});
ActionsInBanners.args = {
  type: "error",
};

export const Success = SuccessTemplate.bind({});
Success.args = {
  type: "success",
  dismissible: false,
};
