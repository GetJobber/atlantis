import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { Card } from "@jobber/components/Card";

const meta = {
  title: "Components/Layouts and Structure/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Divider>>>;

const HorizontalTemplate = (args: Story["args"]) => (
  <div
    style={{
      display: "grid",
      gap: "var(--space-base)",
    }}
  >
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </div>
);

const VerticalTemplate = (args: Story["args"]) => (
  <div style={{ width: "fit-content" }}>
    <Card>
      <Content>
        <Heading level={4}>Summary</Heading>
        <div style={{ display: "flex", gap: "var(--space-base)" }}>
          <Content spacing="small">
            <Heading level={5}>Today</Heading>
            <Text>$ 104.13</Text>
          </Content>
          <Divider {...args} direction="vertical" />
          <Content spacing="small">
            <Heading level={5}>Tomorrow</Heading>
            <Text>$ 262.42</Text>
          </Content>
          <Divider {...args} direction="vertical" />
          <Content spacing="small">
            <Heading level={5}>Next Week</Heading>
            <Text>$ 12403.23</Text>
          </Content>
        </div>
      </Content>
    </Card>
  </div>
);

export const Horizontal: Story = {
  render: HorizontalTemplate,
  args: {
    direction: "horizontal",
  },
};

export const Vertical: Story = {
  render: VerticalTemplate,
  args: {
    direction: "vertical",
  },
};
