import React, { useRef, useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
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

export default {
  title: "Components/Layouts and Structure/Page/Web",
  component: Page,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} satisfies Meta<typeof Page>;

const BasicTemplate: StoryFn<PageLegacyProps> = args => (
  <Page {...args}>
    <Content>
      <Text>Page content here</Text>
    </Content>
  </Page>
);

const CustomTitleTemplate: StoryFn<PageLegacyProps> = args => {
  const props = { ...args, titleMetaData: undefined };

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

const PopoverTemplate: StoryFn<PageLegacyProps> = args => {
  const primaryDivRef = useRef(null);
  const [showPrimaryPopover, setShowPrimaryPopover] = useState(false);

  const secondaryDivRef = useRef(null);
  const [showSecondaryPopover, setShowSecondaryPopover] = useState(false);

  return (
    <>
      <Page
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
        {...args}
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Notifications",
  intro:
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
};

export const CustomTitle = CustomTitleTemplate.bind({});

export const WithActions = PopoverTemplate.bind({});
WithActions.args = {
  title: "Notification Settings",
  intro: "This isn't just talk. Get into action with some buttons and menus.",
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

export const SecondaryActionOnly = BasicTemplate.bind({});

SecondaryActionOnly.args = {
  title: "Settings",
  secondaryAction: {
    label: "View Documentation",
    onClick: () => {
      alert("View Documentation!");
    },
  },
};

export const WithIntro = BasicTemplate.bind({});
WithIntro.args = {
  title: "Notifications",
  subtitle: "Notify me of all the work",
  intro:
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us).",
  externalIntroLinks: true,
};

export const WithAdditionalTitleFields = BasicTemplate.bind({});
WithAdditionalTitleFields.args = {
  title: "Kitchen Renovation Project",
  subtitle: "Everything but the Kitchen Sink",
  titleMetaData: titleMetaData,
  intro:
    "**Building the greatest kitchen one will ever see**. The _entire_ kitchen will be redone for this renovation.",
};

WithAdditionalTitleFields.parameters = {
  previewTabs: {
    code: {
      hidden: true,
    },
  },
};

export const ComposableBasic: StoryFn<PageComposableProps> = args => (
  <Page {...args}>
    <Page.Header>
      <Page.Title>Notifications</Page.Title>
    </Page.Header>
    <Page.Body>
      <Text>Page content here</Text>
    </Page.Body>
  </Page>
);

export const ComposableWithActions: StoryFn<PageComposableProps> = args => (
  <Page {...args}>
    <Page.Header>
      <Page.Title>Clients</Page.Title>
      <Page.Actions>
        <Page.PrimaryAction
          label="New Client"
          onClick={() => alert("New Client")}
        />
        <Page.SecondaryAction label="Export" onClick={() => alert("Export")} />
        <Page.Menu>
          <Menu.Item textValue="Import" onClick={() => alert("Import")}>
            <Menu.ItemIcon name="import" />
            <Menu.ItemLabel>Import</Menu.ItemLabel>
          </Menu.Item>
          <Menu.Item textValue="Archive" onClick={() => alert("Archive")}>
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
);
ComposableWithActions.args = {
  width: "fill",
};

export const ComposableWithSubtitleAndIntro: StoryFn<
  PageComposableProps
> = args => (
  <Page {...args}>
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
);

export const ComposableWithAllPieces: StoryFn<PageComposableProps> = args => (
  <Page {...args}>
    <Page.Header>
      <Page.Title
        metadata={
          <StatusLabel label="In Progress" alignment="start" status="warning" />
        }
      >
        Kitchen Renovation Project
      </Page.Title>
      <Page.Subtitle>Everything but the Kitchen Sink</Page.Subtitle>
      <Page.Actions>
        <Page.PrimaryAction
          label="Create Invoice"
          icon="add"
          onClick={() => alert("Create")}
        />
        <Page.SecondaryAction
          label="Send Quote"
          onClick={() => alert("Send")}
        />
        <Page.Menu>
          <Menu.Item textValue="Edit" onClick={() => alert("Edit")}>
            <Menu.ItemIcon name="edit" />
            <Menu.ItemLabel>Edit</Menu.ItemLabel>
          </Menu.Item>
          <Menu.Item
            textValue="Delete"
            variation="destructive"
            onClick={() => alert("Delete")}
          >
            <Menu.ItemIcon name="trash" />
            <Menu.ItemLabel>Delete</Menu.ItemLabel>
          </Menu.Item>
        </Page.Menu>
      </Page.Actions>
    </Page.Header>
    <Page.Body>
      <Text>
        Building the greatest kitchen one will ever see. The entire kitchen will
        be redone for this renovation.
      </Text>
    </Page.Body>
  </Page>
);
ComposableWithAllPieces.args = {
  width: "fill",
};

export const ComposableCustomSlot: StoryFn<PageComposableProps> = args => (
  <Page {...args}>
    <Page.Header>
      <Page.Title>Custom Action Elements</Page.Title>
      <Page.Actions>
        <Page.PrimaryAction>
          <Button
            label="Custom Primary"
            icon="add"
            onClick={() => alert("Custom primary")}
            fullWidth
          />
        </Page.PrimaryAction>
        <Page.SecondaryAction>
          <Button
            label="Custom Secondary"
            type="secondary"
            onClick={() => alert("Custom secondary")}
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
);
