import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Banner } from "@jobber/components/Banner";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";

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
      <Heading level={2}>Default banner styling</Heading>

      <Banner.Provider type="success">
        <Banner.Content>Your account was upgraded successfully</Banner.Content>
      </Banner.Provider>

      <Banner.Provider type="notice">
        <Banner.Content>
          Jobber will be performing scheduled maintenance on Feb. 21
        </Banner.Content>
      </Banner.Provider>

      <Banner.Provider type="warning">
        <Banner.Content>
          Changes to this visit will not be applied to future visits
        </Banner.Content>
      </Banner.Provider>

      <Banner.Provider type="error">
        <Banner.Content>
          Payment could not be processed because of a network error
        </Banner.Content>
      </Banner.Provider>

      <Heading level={2}>Custom styling and content</Heading>

      <Banner.Provider type="success" icon={false} dismissButton={false}>
        <Banner.Content>Disabled icon and dismiss button</Banner.Content>
      </Banner.Provider>

      <Banner.Provider
        type="notice"
        icon={
          <Banner.Icon
            name="sparkles"
            customColor="var(--color-base-purple--700)"
            backgroundColor="base-purple--300"
          />
        }
        dismissButton={
          <Button size="small" label="Remind me later" variation="subtle" />
        }
      >
        <Banner.Content>Custom icon and dismiss button</Banner.Content>
      </Banner.Provider>

      <Banner.Provider type="warning">
        <Banner.Content>With a primary action button</Banner.Content>
        <Banner.Action
          label="More info"
          onClick={() => alert("More info...")}
        />
      </Banner.Provider>

      <Banner.Provider type="error">
        <Banner.Content>
          Payment could not be processed because of a network error
        </Banner.Content>
      </Banner.Provider>
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
