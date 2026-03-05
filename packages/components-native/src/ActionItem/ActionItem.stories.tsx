import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import {
  ActionItem,
  AutoLink,
  Card,
  Content,
  InputDate,
  Text,
} from "@jobber/components-native";

export default {
  title: "Components/Layouts and Structure/ActionItem/Mobile",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    backgrounds: {
      default: "surface background",
    },
  },
} satisfies Meta<typeof ActionItem>;

const BasicTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <ActionItem {...args}>
      <Text>Service Checklist</Text>
    </ActionItem>
  );
};

const InACardTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem icon="work" {...args}>
        <Text>Service Checklist</Text>
      </ActionItem>
      <ActionItem icon="address" {...args}>
        <Text>Address</Text>
      </ActionItem>
      <ActionItem icon="quote" title="Quote #64" {...args} />
    </Card>
  );
};

const MixedComponentsTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <Content>
        <InputDate
          placeholder="Start date"
          value={new Date("2024-01-01")}
          onChange={() => undefined}
        />
      </Content>
      <ActionItem {...args}>
        <Text>Casey Young</Text>
      </ActionItem>
    </Card>
  );
};

const ActionAlignmentTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem {...args}>
        <Text>
          Cut front, back and area behind garage. Give the customer a heads up.
        </Text>
      </ActionItem>
    </Card>
  );
};

const TitleOnlyTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem {...args} />
    </Card>
  );
};

const InteractiveChildrenTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem {...args}>
        <Content spacing="none">
          <Text>You can tap this link or the whole ActionItem</Text>
          <AutoLink>{"www.getjobber.com"}</AutoLink>
        </Content>
      </ActionItem>
    </Card>
  );
};

const NoActionTemplate: StoryFn<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem {...args}>
        <Text>Nathaniel Lewis</Text>
        <Text>Christian Carlino</Text>
        <Text>Lorna Erikssen</Text>
      </ActionItem>
    </Card>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    icon: "work",
    onPress: () => console.log("👍"),
  },
};
export const InACard = {
  render: InACardTemplate,
  args: {
    onPress: () => console.log("👍"),
  },
};
export const MixedComponents = {
  render: MixedComponentsTemplate,
  args: {
    onPress: () => console.log("👍"),
    icon: "person",
    title: "Assigned to",
  },
};
export const ActionAlignment = {
  render: ActionAlignmentTemplate,
  args: {
    onPress: () => console.log("👍"),
    actionIconAlignment: "flex-start",
    title: "Service Details",
  },
};
export const TitleOnly = {
  render: TitleOnlyTemplate,
  args: {
    title: "Add client",
    icon: "person",
    onPress: () => console.log("👍"),
    actionIcon: "add",
  },
};
export const InteractiveChildren = {
  render: InteractiveChildrenTemplate,
  args: {
    onPress: () => console.log("Tapped the entire action item"),
    icon: "presentation",
    actionIcon: "link",
  },
};
export const NoAction = {
  render: NoActionTemplate,
  args: {
    icon: "userSwitch",
    title: "Team",
  },
};
