import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Box/Web",
  component: Box,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Box>;

const BasicTemplate: ComponentStory<typeof Box> = args => (
  <Box {...args}>Box Content</Box>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const Order = () => (
  <Box
    gap="base"
    padding="base"
    background="surface"
    style={{ display: "flex", minHeight: "200px" }}
  >
    <Box
      padding="base"
      background="interactive"
      alignItems="center"
      style={{
        order: 3,
        color: "white",
      }}
    >
      Third (order: 3)
    </Box>
    <Box
      padding="base"
      background="success"
      alignItems="center"
      style={{
        order: 1,
        color: "white",
      }}
    >
      First (order: 1)
    </Box>
    <Box
      padding="base"
      background="warning"
      alignItems="center"
      style={{
        order: 2,
        color: "white",
      }}
    >
      Second (order: 2)
    </Box>
  </Box>
);

Order.storyName = "Order";
