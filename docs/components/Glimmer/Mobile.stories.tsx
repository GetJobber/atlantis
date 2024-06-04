import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content, Flex, Glimmer } from "@jobber/components-native";

export default {
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
} as ComponentMeta<typeof Glimmer>;

const BasicTemplate: ComponentStory<typeof Glimmer> = args => (
  <Glimmer {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  shape: "rectangle",
  size: "base",
  timing: "base",
};

const InDepthTemplate: ComponentStory<typeof Glimmer> = args => (
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

export const InDepth = InDepthTemplate.bind({});
InDepth.args = {
  size: "larger",
  shape: "circle",
};
