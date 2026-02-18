import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { action } from "storybook/actions";
import { Heading, StatusLabel, Tooltip } from "@jobber/components";
import {
  Page,
  type PageComposableProps,
  type PageLegacyProps,
} from "@jobber/components/Page";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Menu } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Popover } from "@jobber/components/Popover";

const meta = {
  title: "Components/Layouts and Structure/Page",
  component: Page,
} satisfies Meta;
export default meta;
type PropsBasedStory = StoryObj<React.FC<PageLegacyProps>>;
type ComposableStory = StoryObj<React.FC<PageComposableProps>>;

const BasicTemplate = (args: PropsBasedStory["args"]) => (
  <Page {...args}>
    <Content>
      <Text>Page content here</Text>
    </Content>
  </Page>
);

const CustomTitleTemplate = (args: PropsBasedStory["args"]) => {
  const props = { ...args, titleMetaData: undefined } as PageLegacyProps;

  return (
    <Page
      {...props}
      title={
        <Tooltip message="This is a tooltip">
          <Heading level={1}>Title with tooltip</Heading>
        </Tooltip>
      }
    >
      <Content>
        <Text>Page content here</Text>
      </Content>
    </Page>
  );
};

const PopoverTemplate = (args: PropsBasedStory["args"]) => {
  const primaryDivRef = useRef(null);
  const [showPrimaryPopover, setShowPrimaryPopover] = useState(false);

  const secondaryDivRef = useRef(null);
  const [showSecondaryPopover, setShowSecondaryPopover] = useState(false);

  const pageProps = args as PageLegacyProps;

  return (
    <>
      <Page
        {...pageProps}
        primaryAction={{
          label: "Trigger Food Popover",
          onClick: () => setShowPrimaryPopover(true),
          ref: primaryDivRef,
        }}
        secondaryAction={{
          label: "Trigger Drink Popover",
          onClick: () => setShowSecondaryPopover(true),
          ref: secondaryDivRef,
        }}
      >
        <Content>
          <Text>Page content here</Text>
        </Content>
      </Page>
      <Popover
        attachTo={primaryDivRef}
        open={showPrimaryPopover}
        onRequestClose={() => setShowPrimaryPopover(false)}
        preferredPlacement="bottom"
      >
        <Content>Your food order: 🥨</Content>
      </Popover>
      <Popover
        attachTo={secondaryDivRef}
        open={showSecondaryPopover}
        onRequestClose={() => setShowSecondaryPopover(false)}
        preferredPlacement="bottom"
      >
        <Content>Your drink order: 🍹</Content>
      </Popover>
    </>
  );
};

const titleMetaData = (
  <StatusLabel label={"In Progress"} alignment={"start"} status={"warning"} />
);

export const Basic: PropsBasedStory = {
  render: BasicTemplate,
  args: {
    title: "Notifications",
    intro:
      "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
  },
};

export const CustomTitle: PropsBasedStory = {
  render: CustomTitleTemplate,
};

export const WithActions: PropsBasedStory = {
  render: PopoverTemplate,
  args: {
    title: "Notification Settings",
    intro: "This isn't just talk. Get into action with some buttons and menus.",
    moreActionsMenu: [
      {
        actions: [
          {
            label: "Edit",
            icon: "edit",
            onClick: fn(),
          },
        ],
      },
      {
        header: "Send as...",
        actions: [
          {
            label: "Text Message",
            icon: "sms",
            onClick: fn(),
          },
          {
            label: "Email",
            icon: "email",
            onClick: fn(),
          },
        ],
      },
    ],
  },
};

export const SecondaryActionOnly: PropsBasedStory = {
  render: BasicTemplate,
  args: {
    title: "Settings",
    secondaryAction: {
      label: "View Documentation",
      onClick: fn(),
    },
  },
};

export const WithIntro: PropsBasedStory = {
  render: BasicTemplate,
  args: {
    title: "Notifications",
    subtitle: "Notify me of all the work",
    intro:
      "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
    externalIntroLinks: true,
  },
};

export const WithAdditionalTitleFields: PropsBasedStory = {
  render: () => (
    <Page
      title="Kitchen Renovation Project"
      subtitle="Everything but the Kitchen Sink"
      titleMetaData={titleMetaData}
      intro="**Building the greatest kitchen one will ever see**. The _entire_ kitchen will be redone for this renovation."
    >
      <Text>Page content here</Text>
    </Page>
  ),
};

export const ComposableBasic: ComposableStory = {
  render: () => (
    <Page>
      <Page.Header>
        <Page.Title>Notifications</Page.Title>
      </Page.Header>
      <Page.Body>
        <Text>Page content here</Text>
      </Page.Body>
    </Page>
  ),
};

export const ComposableWithActions: ComposableStory = {
  render: () => (
    <Page width="fill">
      <Page.Header>
        <Page.Title>Clients</Page.Title>
        <Page.Actions>
          <Page.PrimaryAction
            label="New Client"
            onClick={action("primary-click")}
          />
          <Page.SecondaryAction
            label="Export"
            onClick={action("secondary-click")}
          />
          <Page.Menu>
            <Menu.Item textValue="Import" onClick={action("menu-import-click")}>
              <Menu.ItemIcon name="import" />
              <Menu.ItemLabel>Import</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Item
              textValue="Archive"
              onClick={action("menu-archive-click")}
            >
              <Menu.ItemIcon name="archive" />
              <Menu.ItemLabel>Archive</Menu.ItemLabel>
            </Menu.Item>
          </Page.Menu>
        </Page.Actions>
      </Page.Header>
      <Page.Body>
        <Text>Page content here</Text>
      </Page.Body>
    </Page>
  ),
};

export const ComposableWithSubtitleAndIntro: ComposableStory = {
  render: () => (
    <Page>
      <Page.Header>
        <Page.Title>Notifications</Page.Title>
        <Page.Subtitle>Notify me of all the work</Page.Subtitle>
      </Page.Header>
      <Page.Intro externalLinks={true}>
        Improve job completion rates, stop chasing payments, and boost your
        customer service by automatically communicating with your clients at key
        points before, during, and after a job. Read more about Notifications by
        visiting our [Help Center](https://help.getjobber.com/hc/en-us).
      </Page.Intro>
      <Page.Body>
        <Text>Page content here</Text>
      </Page.Body>
    </Page>
  ),
};

export const ComposableWithAllPieces: ComposableStory = {
  render: () => (
    <Page width="fill">
      <Page.Header>
        <Page.Title
          metadata={
            <StatusLabel
              label="In Progress"
              alignment="start"
              status="warning"
            />
          }
        >
          Kitchen Renovation Project
        </Page.Title>
        <Page.Subtitle>Everything but the Kitchen Sink</Page.Subtitle>
        <Page.Actions>
          <Page.PrimaryAction
            label="Create Invoice"
            icon="add"
            onClick={action("primary-click")}
          />
          <Page.SecondaryAction
            label="Send Quote"
            onClick={action("secondary-click")}
          />
          <Page.Menu>
            <Menu.Item textValue="Edit" onClick={action("menu-edit-click")}>
              <Menu.ItemIcon name="edit" />
              <Menu.ItemLabel>Edit</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Item
              textValue="Delete"
              variation="destructive"
              onClick={action("menu-delete-click")}
            >
              <Menu.ItemIcon name="trash" />
              <Menu.ItemLabel>Delete</Menu.ItemLabel>
            </Menu.Item>
          </Page.Menu>
        </Page.Actions>
      </Page.Header>
      <Page.Body>
        <Text>
          Building the greatest kitchen one will ever see. The entire kitchen
          will be redone for this renovation.
        </Text>
      </Page.Body>
    </Page>
  ),
};

export const ComposableCustomSlot: ComposableStory = {
  render: () => (
    <Page>
      <Page.Header>
        <Page.Title>Custom Action Elements</Page.Title>
        <Page.Actions>
          <Page.PrimaryAction>
            <Button
              label="Custom Primary"
              icon="add"
              onClick={action("custom-primary-click")}
              fullWidth
            />
          </Page.PrimaryAction>
          <Page.SecondaryAction>
            <Button
              label="Custom Secondary"
              type="secondary"
              onClick={action("custom-secondary-click")}
              fullWidth
            />
          </Page.SecondaryAction>
        </Page.Actions>
      </Page.Header>
      <Page.Body>
        <Text>
          This example uses custom Button elements via the children slot instead
          of the default label/onClick props.
        </Text>
      </Page.Body>
    </Page>
  ),
};
