import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Frame } from "@jobber/components/Frame";
import { Box } from "@jobber/components/Box";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Layouts and Structure/Frame/Web",
  component: Frame,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Frame>;

const BasicTemplate: ComponentStory<typeof Frame> = args => (
  <Frame {...args}>
    <img src="https://placehold.co/600x400?text=Frame" alt="Placeholder" />
  </Frame>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  aspectX: 16,
  aspectY: 9,
};

export const Square = BasicTemplate.bind({});
Square.args = {
  aspectX: 1,
  aspectY: 1,
};

export const FourByThree = BasicTemplate.bind({});
FourByThree.args = {
  aspectX: 4,
  aspectY: 3,
};

export const WithContent: ComponentStory<typeof Frame> = () => (
  <Frame>
    <Box padding="base">
      <Heading level={2}>It Works for Content As Well</Heading>
      <Text>Everything is centered and cropped to fit the aspect ratio.</Text>
    </Box>
  </Frame>
);
