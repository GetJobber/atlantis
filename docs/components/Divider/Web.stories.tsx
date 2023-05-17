import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";

export default {
  title: "Components/Divider/Web",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { docs: { hidden: true } },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        args.direction === "vertical" ? "auto min-content auto" : "auto",
      gap: "var(--space-base)",
    }}
  >
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  size: "base",
  direction: "horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  size: "base",
  direction: "vertical",
};
