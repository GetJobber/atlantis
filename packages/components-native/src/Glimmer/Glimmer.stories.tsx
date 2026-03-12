import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Content, Flex, Glimmer } from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/Glimmer",
  component: Glimmer,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  decorators: [
    // Take out Storybook's wrapper layout to preserve native glimmer shapes.
    (Story: React.ComponentType) => (
      // eslint-disable-next-line react/forbid-elements
      <div style={{ display: "block" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Glimmer>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Glimmer>>>;

const BasicTemplate = (args: Story["args"]) => <Glimmer {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    shape: "rectangle",
    size: "base",
    timing: "base",
  },
};

const InDepthTemplate = (args: Story["args"]) => (
  <Content spacing="none">
    <Flex template={["shrink", "grow"]}>
      <Glimmer {...args} />
      <Content spacing="none" childSpacing="small">
        <Glimmer size="large" width="30%" />
        <Glimmer size="small" width="40%" />
      </Content>
    </Flex>

    <Content spacing="none" childSpacing="small">
      <Glimmer size="small" width="80%" />
      <Glimmer size="small" />
      <Glimmer size="small" width="70%" />
    </Content>

    <Flex template={["shrink", "shrink", "shrink", "shrink"]}>
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
      <Glimmer size="largest" shape="square" />
    </Flex>
  </Content>
);

export const InDepth: Story = {
  render: InDepthTemplate,
  args: {
    size: "larger",
    shape: "circle",
  },
};
