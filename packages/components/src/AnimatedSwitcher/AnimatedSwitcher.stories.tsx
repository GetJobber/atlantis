import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { AnimatedSwitcher } from "@jobber/components/AnimatedSwitcher";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Utilities/AnimatedSwitcher/Web",
  component: AnimatedSwitcher,
  subcomponents: { "AnimatedSwitcher.Icon": AnimatedSwitcher.Icon },
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof AnimatedSwitcher>;

const BasicTemplate: StoryFn<typeof AnimatedSwitcher> = args => {
  const [switched, setSwitched] = useState(args.switched || false);

  return (
    <AnimatedSwitcher
      {...args}
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
};

export const Basic = {
  render: BasicTemplate,
  args: {},
};

const IconTemplate: StoryFn<typeof AnimatedSwitcher> = args => {
  const [switched, setSwitched] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 24,
          marginBottom: 16,
        }}
      >
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
};

export const Icon = {
  render: IconTemplate,
  args: {},
};
