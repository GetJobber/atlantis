import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Glimmer } from "@jobber/components/Glimmer";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Status and Feedback/Glimmer/Web",
  component: Glimmer,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
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
  <>
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
  </>
);

export const InDepth = InDepthTemplate.bind({});
InDepth.args = {
  size: "larger",
  shape: "circle",
};

export const Timing = BasicTemplate.bind({});
Timing.args = {
  timing: "fast",
};
