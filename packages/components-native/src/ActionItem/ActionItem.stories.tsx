import React from 'react';
import {ActionItem, AutoLink, Card, Content, InputDate, Text} from '..';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof ActionItem> = {
  title: 'Components/Layouts and Structure/ActionItem/Mobile',
  component: ActionItem,
  parameters: {
    viewMode: 'story',
    previewTabs: {code: {hidden: false}},
    viewport: {defaultViewport: 'mobile1'},
    backgrounds: {
      default: 'surface background',
    },
  },
};
export default meta;
type Story = StoryObj<typeof ActionItem>;

export const Basic: Story = {
  args: {
    icon: 'work',
    onPress: () => console.log('👍'),
  },
  render: args => {
    return (
      <ActionItem {...args}>
        <Text>Service Checklist</Text>
      </ActionItem>
    );
  },
};

export const InACard: Story = {
  args: {
    onPress: () => console.log('👍'),
  },
  render: args => {
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
  },
};
/*
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

export const MixedComponents = MixedComponentsTemplate.bind({});
MixedComponents.args = {
  onPress: () => alert('👍'),
  icon: 'person',
  title: 'Assigned to',
};
*/
/*
export const ActionAlignment = ActionAlignmentTemplate.bind({});
ActionAlignment.args = {
  onPress: () => alert('👍'),
  actionIconAlignment: 'flex-start',
  title: 'Service Details',
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
          <AutoLink>{'www.getjobber.com'}</AutoLink>
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



export const TitleOnly = TitleOnlyTemplate.bind({});
TitleOnly.args = {
  title: 'Add client',
  icon: 'person',
  onPress: () => alert('👍'),
  actionIcon: 'add',
};

export const InteractiveChildren = InteractiveChildrenTemplate.bind({});
InteractiveChildren.args = {
  onPress: () => alert('Tapped the entire action item'),
  icon: 'presentation',
  actionIcon: 'link',
};

export const NoAction = NoActionTemplate.bind({});
NoAction.args = {
  icon: 'userSwitch',
  title: 'Team',
};
*/
