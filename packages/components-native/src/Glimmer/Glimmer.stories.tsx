import React from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-native-web-vite";
import { Content, Flex } from "@jobber/components-native";
import { Glimmer } from "./Glimmer";

const meta = {
  title: "Components/Status and Feedback/Glimmer/Mobile",
  component: Glimmer,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
  decorators: [
    Story => (
      // Take out storybooks weird flex layout to enable the shape prop
      // eslint-disable-next-line react/forbid-elements
      <div style={{ display: "block" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Glimmer>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate: StoryFn<typeof Glimmer> = args => <Glimmer {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    shape: "rectangle",
    size: "base",
    timing: "base",
  },
};
const InDepthTemplate: StoryFn<typeof Glimmer> = args => (
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
