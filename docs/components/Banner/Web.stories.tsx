import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components/Banner";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Banner as Banner1 } from "@jobber/components/Banner/Banner1";

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
      Changes to this visit will not be applied to future visits
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

const ComposedTemplate: ComponentStory<typeof Banner> = () => {
  return (
    <Content>
      <Banner1 type="success">
        <Banner1.Icon />
        <Banner1.Content>
          <Text>Default banner style</Text>
        </Banner1.Content>
        <Banner1.DismissButton onDismiss={() => alert("Dismissed")} />
      </Banner1>

      <Banner1 type="notice">
        <Banner1.Icon
          name="job"
          color="blue"
          backgroundColor="base-purple--400"
        />
        <Banner1.Content>
          <Text>Custom icon and color, override dismiss button onClick</Text>
        </Banner1.Content>
        <Banner1.DismissButton onClick={() => alert("Run custom behaviour")} />
      </Banner1>

      <Banner1 type="warning">
        <Banner1.Icon />
        <Banner1.Content>
          <Text>Action button</Text>
        </Banner1.Content>
        <Banner1.Action
          label="More info"
          onClick={() => alert("More info...")}
        />
      </Banner1>

      <Banner1 type="error">
        <Banner1.Icon />
        <Banner1.Content>
          <Text>Custom button</Text>
        </Banner1.Content>
        <Button onClick={() => alert("Custom button...")}>
          <Button.Label>Custom button</Button.Label>
        </Button>
      </Banner1>
    </Content>
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

export const Composed = ComposedTemplate.bind({});
Composed.args = {
  type: "notice",
};
