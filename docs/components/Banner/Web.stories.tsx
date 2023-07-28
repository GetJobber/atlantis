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
export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "notice",
};

const ActionsTemplate: ComponentStory<typeof Banner> = () => (
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
      type="error"
      primaryAction={{
        label: "Refresh",
        onClick: () => alert("Refreshing"),
      }}
    >
      Network is unavailable. Please check your internet connection.
    </Banner>
  </>
);
export const ActionsInBanners = ActionsTemplate.bind({});

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
export const Success = SuccessTemplate.bind({});
Success.args = {
  type: "success",
  dismissible: false,
};
