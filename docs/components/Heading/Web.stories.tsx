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
    <Content spacing="large">
      <div>
        <Heading level={2}>Fixed Width Container</Heading>
        <div
          style={{ width: "300px", border: "1px dashed #ccc", padding: "16px" }}
        >
          <Content>
            <Heading level={3} maxLines="single">
              maxLines=&quot;single&quot;: This heading demonstrates single line
              truncation and will cut off any text that exceeds the container
              width with ellipsis
            </Heading>
            <Divider />
            <Heading level={3} maxLines="small">
              maxLines=&quot;small&quot;: This heading shows two line truncation
              behavior and will allow text to wrap to exactly two lines before
              truncating with an ellipsis at the end
            </Heading>
            <Divider />
            <Heading level={3}>
              No maxLines prop: This heading will wrap naturally without any
              truncation limits and can span as many lines as needed to display
              all the content
            </Heading>
          </Content>
        </div>
      </div>

      <div>
        <Heading level={2}>Flex Layout (70% width)</Heading>
        <div
          style={{
            display: "flex",
            border: "1px dashed #999",
            padding: "16px",
            gap: "16px",
          }}
        >
          <div
            style={{
              flex: "0 0 70%",
              border: "1px solid #ddd",
              padding: "12px",
            }}
          >
            <Content>
              <Heading level={3} maxLines="single">
                maxLines=&quot;single&quot;: Flex item with 70% width showing
                truncation works with flexible layouts and responsive design
              </Heading>
              <Divider />
              <Heading level={3} maxLines="small">
                maxLines=&quot;small&quot;: This heading in a flex container
                demonstrates that truncation works perfectly with CSS flexbox
                and dynamic width calculations
              </Heading>
            </Content>
          </div>
          <div style={{ flex: "1", border: "1px solid #ddd", padding: "12px" }}>
            <Heading level={4}>Sidebar</Heading>
          </div>
        </div>
      </div>

      <div>
        <Heading level={2}>Grid Layout (2fr + 1fr)</Heading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "16px",
            border: "1px dashed #999",
            padding: "16px",
          }}
        >
          <div style={{ border: "1px solid #ddd", padding: "12px" }}>
            <Content>
              <Heading level={3} maxLines="single">
                maxLines=&quot;single&quot;: Grid item with 2fr showing that
                truncation adapts to CSS Grid fractional units automatically
              </Heading>
              <Divider />
              <Heading level={3} maxLines="base">
                maxLines=&quot;base&quot;: This heading demonstrates truncation
                in CSS Grid layouts with fractional units, showing how the
                component adapts to dynamic widths calculated by the grid
                algorithm without needing explicit pixel values
              </Heading>
            </Content>
          </div>
          <div style={{ border: "1px solid #ddd", padding: "12px" }}>
            <Heading level={4}>1fr column</Heading>
          </div>
        </div>
      </div>
    </Content>
  );
};

export const Truncation = TruncationTemplate.bind({});
Truncation.args = {};
