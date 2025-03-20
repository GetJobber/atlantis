import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components/Banner";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Status and Feedback/Banner/Web",
  component: Banner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Banner>;

const BasicTemplate: ComponentStory<typeof Banner> = () => (
  <Content>
    <Banner type="success">Your account was upgraded successfully</Banner>
    <Banner type="notice">
      Jobber will be performing scheduled maintenance on Feb. 21
    </Banner>
    <Banner type="warning">
      Changes to this visit will not be applied to past visits
    </Banner>
    <Banner type="error">
      Payment could not be processed because of a network error
    </Banner>
  </Content>
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

const ControlledTemplate: ComponentStory<typeof Banner> = args => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <div>
        <Banner
          {...args}
          onDismiss={() => setShowBanner(_val => !_val)}
          controlledVisiblity={showBanner}
        >
          Your import is in progress
        </Banner>
      </div>
      <Button
        onClick={() => setShowBanner(_val => !_val)}
        label="Toggle Banner"
      ></Button>
    </>
  );
};

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

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  type: "notice",
};
