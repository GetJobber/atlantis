import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";

export default {
  title: "Components/Text and Typography/Heading/Web",
  component: Heading,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Heading>;

const LevelsTemplate: ComponentStory<typeof Heading> = args => {
  return (
    <Content>
      <Heading {...args}>New client</Heading>
      <Divider size="base" />
      <Heading level={2}>Client details</Heading>
      <Divider size="base" />
      <Heading level={3}>Contact details</Heading>
      <Divider size="base" />
      <Heading level={4}>Phone numbers</Heading>
      <Divider size="base" />
      <Heading level={5}>Receives SMS</Heading>
      <Divider size="base" />
      <Heading level={6}>Business settings</Heading>
    </Content>
  );
};

export const Levels = LevelsTemplate.bind({});
Levels.args = { level: 1 };

const TruncationTemplate: ComponentStory<typeof Heading> = () => {
  return (
    <div style={{ width: "300px", border: "1px dashed #ccc", padding: "16px" }}>
      <Content>
        <Heading level={3} numberOfLines={1}>
          numberOfLines=1: This heading demonstrates single line truncation and
          will cut off any text that exceeds the container width with ellipsis
        </Heading>
        <Divider />
        <Heading level={3} numberOfLines={2}>
          numberOfLines=2: This heading shows two line truncation behavior and
          will allow text to wrap to exactly two lines before truncating with an
          ellipsis at the end
        </Heading>
        <Divider />
        <Heading level={3}>
          No numberOfLines prop: This heading will wrap naturally without any
          truncation limits and can span as many lines as needed to display all
          the content
        </Heading>
      </Content>
    </div>
  );
};

export const Truncation = TruncationTemplate.bind({});
Truncation.args = {};
