import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof ActionItem>;

const BasicTemplate: ComponentStory<typeof ActionItem> = args => {
  return (
    <ActionItem {...args}>
      <Text>Service Checklist</Text>
    </ActionItem>
  );
};

const InACardTemplate: ComponentStory<typeof ActionItem> = args => {
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

const MixedComponentsTemplate: ComponentStory<typeof ActionItem> = args => {
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

const ActionAlignmentTemplate: ComponentStory<typeof ActionItem> = args => {
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

const TitleOnlyTemplate: ComponentStory<typeof ActionItem> = args => {
  return (
    <Card>
      <ActionItem {...args} />
    </Card>
  );
};

const InteractiveChildrenTemplate: ComponentStory<typeof ActionItem> = args => {
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

const NoActionTemplate: ComponentStory<typeof ActionItem> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  icon: "work",
  onPress: () => alert("👍"),
};

export const InACard = InACardTemplate.bind({});
InACard.args = {
  onPress: () => alert("👍"),
};

export const MixedComponents = MixedComponentsTemplate.bind({});
MixedComponents.args = {
  onPress: () => alert("👍"),
  icon: "person",
  title: "Assigned to",
};

export const ActionAlignment = ActionAlignmentTemplate.bind({});
ActionAlignment.args = {
  onPress: () => alert("👍"),
  actionIconAlignment: "flex-start",
  title: "Service Details",
};

export const TitleOnly = TitleOnlyTemplate.bind({});
TitleOnly.args = {
  title: "Add client",
  icon: "person",
  onPress: () => alert("👍"),
  actionIcon: "add",
};

export const InteractiveChildren = InteractiveChildrenTemplate.bind({});
InteractiveChildren.args = {
  onPress: () => alert("Tapped the entire action item"),
  icon: "presentation",
  actionIcon: "link",
};

export const NoAction = NoActionTemplate.bind({});
NoAction.args = {
  icon: "userSwitch",
  title: "Team",
};
