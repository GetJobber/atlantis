import React, {useState} from 'react';
import {AnimatedSwitcher} from '.';
import {Button, Text} from '..';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof AnimatedSwitcher> = {
  title: 'Components/Utilities/AnimatedSwitcher/Web',
  component: AnimatedSwitcher,
  parameters: {
    viewMode: 'story',
    previewTabs: {code: {hidden: false}},
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AnimatedSwitcher>;

export const Basic: Story = {
  parameters: {
    docs: {
      story: {inline: true}, // render the story in an iframe
      canvas: {sourceState: 'shown'}, // start with the source open
      source: {type: 'code'}, // forces the raw source code (rather than the rendered JSX).
    },
  },
  render: () => {
    const [switched, setSwitched] = useState(false);
    return (
      <AnimatedSwitcher
        switched={switched}
        initialChild={
          <Button label="Mark complete" onClick={() => setSwitched(true)} />
        }
        switchTo={
          <Button
            icon="checkmark"
            label="Complete"
            type="secondary"
            onClick={() => setSwitched(false)}
          />
        }
      />
    );
  },
};

export const Icon: Story = {
  render: args => {
    const [switched, setSwitched] = useState(false);

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: 24,
            marginBottom: 16,
          }}>
          <AnimatedSwitcher.Icon
            {...args}
            switched={switched}
            initialIcon="add"
            switchToIcon="checkmark"
          />
          <AnimatedSwitcher.Icon
            switched={switched}
            initialIcon="menu"
            switchToIcon="longArrowLeft"
          />
          <AnimatedSwitcher.Icon
            switched={switched}
            initialIcon="event"
            switchToIcon="remove"
          />
          <AnimatedSwitcher.Icon
            switched={switched}
            initialIcon="eye"
            switchToIcon="eyeCrossed"
          />
        </div>
        <Text align="center">
          <Button
            label="Switch icons"
            type="tertiary"
            size="small"
            onClick={() => setSwitched(!switched)}
          />
        </Text>
      </div>
    );
  },
};
