import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "@jobber/components/Banner";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";

const meta = {
  title: "Components/Status and Feedback/Banner",
  component: Banner,
  args: {
    type: "notice",
    children: "Your import is in progress",
  },
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = () => (
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

const ActionsTemplate = (args: Story["args"]) => (
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
      type={args?.type ?? "error"}
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

const SuccessTemplate = (args: Story["args"]) => (
  <Banner
    {...args}
    type={args?.type ?? "success"}
    primaryAction={{
      label: "View clients",
      onClick: () => alert("🎉 Woo hoo"),
    }}
  >
    Your client import is complete
  </Banner>
);

const ControlledTemplate = (args: Story["args"]) => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <div>
        <Banner
          {...args}
          type={args?.type ?? "notice"}
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

const ComposedTemplate = () => {
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

export const Basic: Story = {
  render: BasicTemplate,
};

export const ActionsInBanners: Story = {
  render: ActionsTemplate,
  args: {
    type: "error",
    children: "Network is unavailable. Please check your internet connection.",
  },
};

export const Success: Story = {
  render: SuccessTemplate,
  args: {
    type: "success",
    dismissible: false,
    children: "Your client import is complete",
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    type: "notice",
    children: "Your import is in progress",
  },
};

export const Composed: Story = {
  render: ComposedTemplate,
};
