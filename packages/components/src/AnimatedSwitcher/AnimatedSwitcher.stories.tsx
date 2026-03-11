import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnimatedSwitcher } from "@jobber/components/AnimatedSwitcher";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Utilities/AnimatedSwitcher",
  component: AnimatedSwitcher,
  subcomponents: { "AnimatedSwitcher.Icon": AnimatedSwitcher.Icon },
} satisfies Meta<typeof AnimatedSwitcher>;
export default meta;
type Story = StoryObj<
  Omit<
    React.ComponentProps<typeof AnimatedSwitcher>,
    "switched" | "initialChild" | "switchTo"
  > & {
    switched?: boolean;
    initialChild?: React.ReactElement;
    switchTo?: React.ReactElement;
  }
>;

const BasicTemplate = (args: Story["args"]) => {
  const [switched, setSwitched] = useState(args?.switched ?? false);

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

export const Basic: Story = {
  render: BasicTemplate,
};

const IconTemplate = (args: Story["args"]) => {
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

export const Icon: Story = {
  render: IconTemplate,
};
