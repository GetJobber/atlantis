import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { {{name}} } from "@jobber/components/{{name}}";

export default {
  title: "Components/Category/{{name}}/Web",
  component: {{name}},
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof {{name}}>;

const BasicTemplate: ComponentStory<typeof {{name}}> = args => (
  <{{name}} {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
