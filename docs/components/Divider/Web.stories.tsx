import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { Card } from "@jobber/components/Card";

export default {
  title: "Components/Layouts and Structure/Divider/Web",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Divider>;

const HorizontalTemplate: ComponentStory<typeof Divider> = args => (
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

const VerticalTemplate: ComponentStory<typeof Divider> = args => (
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

export const Horizontal = HorizontalTemplate.bind({});
Horizontal.args = {
  direction: "horizontal",
};

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {
  direction: "vertical",
};
