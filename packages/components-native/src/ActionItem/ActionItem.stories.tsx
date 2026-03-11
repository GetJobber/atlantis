import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import {
  ActionItem,
  AutoLink,
  Card,
  Content,
  InputDate,
  Text,
} from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/ActionItem",
  component: ActionItem,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    backgrounds: {
      default: "surface background",
    },
  },
} satisfies Meta<typeof ActionItem>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => {
  return (
    <ActionItem {...args}>
      <Text>Service Checklist</Text>
    </ActionItem>
  );
};

const InACardTemplate = (args: Story["args"]) => {
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

const MixedComponentsTemplate = (args: Story["args"]) => {
  return (
    <Card>
      <Content>
        <InputDate placeholder="Start date" />
      </Content>
      <ActionItem {...args}>
        <Text>Casey Young</Text>
      </ActionItem>
    </Card>
  );
};

const ActionAlignmentTemplate = (args: Story["args"]) => {
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

const TitleOnlyTemplate = (args: Story["args"]) => {
  return (
    <Card>
      <ActionItem {...args} />
    </Card>
  );
};

const InteractiveChildrenTemplate = (args: Story["args"]) => {
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

const NoActionTemplate = (args: Story["args"]) => {
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    icon: "work",
    onPress: () => alert("👍"),
  },
};

export const InACard: Story = {
  render: InACardTemplate,
  args: {
    onPress: () => alert("👍"),
  },
};

export const MixedComponents: Story = {
  render: MixedComponentsTemplate,
  args: {
    onPress: () => alert("👍"),
    icon: "person",
    title: "Assigned to",
  },
};

export const ActionAlignment: Story = {
  render: ActionAlignmentTemplate,
  args: {
    onPress: () => alert("👍"),
    actionIconAlignment: "flex-start",
    title: "Service Details",
  },
};

export const TitleOnly: Story = {
  render: TitleOnlyTemplate,
  args: {
    title: "Add client",
    icon: "person",
    onPress: () => alert("👍"),
    actionIcon: "add",
  },
};

export const InteractiveChildren: Story = {
  render: InteractiveChildrenTemplate,
  args: {
    onPress: () => alert("Tapped the entire action item"),
    icon: "presentation",
    actionIcon: "link",
  },
};

export const NoAction: Story = {
  render: NoActionTemplate,
  args: {
    icon: "userSwitch",
    title: "Team",
  },
};
