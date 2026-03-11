import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Glimmer } from "@jobber/components/Glimmer";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Status and Feedback/Glimmer",
  component: Glimmer,
} satisfies Meta<typeof Glimmer>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Glimmer>>>;

const BasicTemplate = (args: Story["args"]) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-small)",
        padding: "var(--space-base)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <Text size="small" variation="subdued">
        On surface
      </Text>
      <Glimmer {...args} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-small)",
        padding: "var(--space-base)",
        backgroundColor: "var(--color-surface--background",
      }}
    >
      <Text size="small" variation="subdued">
        On surface--background
      </Text>
      <Glimmer {...args} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-small)",
        padding: "var(--space-base)",
        backgroundColor: "var(--color-surface--background--subtle)",
      }}
    >
      <Text size="small" variation="subdued">
        On surface--background--subtle
      </Text>
      <Glimmer {...args} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-small)",
        padding: "var(--space-base)",
        backgroundColor: "var(--color-surface--reverse)",
      }}
    >
      <Text size="small" variation="subdued">
        On surface--reverse (toggle reverseTheme prop)
      </Text>
      <Glimmer {...args} />
    </div>
  </div>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    shape: "rectangle",
    size: "base",
    timing: "base",
  },
};

const InDepthTemplate = (args: Story["args"]) => (
  <Content>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content minmax(auto, 30%)",
        gap: "var(--space-base)",
        alignItems: "center",
      }}
    >
      <Glimmer {...args} />
      <Content spacing="small">
        <Glimmer.Header />
        <Glimmer.Text lines={1} />
      </Content>
    </div>

    <Glimmer.Text />
    <div style={{ display: "flex", gap: "var(--space-base)" }}>
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
    </div>
  </Content>
);

export const InDepth: Story = {
  render: InDepthTemplate,
  args: {
    size: "larger",
    shape: "circle",
  },
};

export const Timing: Story = {
  render: BasicTemplate,
  args: {
    timing: "fast",
  },
};
