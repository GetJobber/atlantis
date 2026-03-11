import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Frame } from "@jobber/components/Frame";
import { Box } from "@jobber/components/Box";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Layouts and Structure/Frame",
  component: Frame,
} satisfies Meta<typeof Frame>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof Frame>, "aspectX" | "aspectY">
>;

const BasicTemplate = (args: Story["args"]) => (
  <Frame aspectX={args?.aspectX} aspectY={args?.aspectY}>
    <img src="https://placehold.co/600x400?text=Frame" alt="Placeholder" />
  </Frame>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    aspectX: 16,
    aspectY: 9,
  },
};

export const Square: Story = {
  render: BasicTemplate,
  args: {
    aspectX: 1,
    aspectY: 1,
  },
};

export const FourByThree: Story = {
  render: BasicTemplate,
  args: {
    aspectX: 4,
    aspectY: 3,
  },
};

const WithContentTemplate = () => (
  <Frame>
    <Box padding="base">
      <Heading level={2}>It Works for Content As Well</Heading>
      <Text>Everything is centered and cropped to fit the aspect ratio.</Text>
    </Box>
  </Frame>
);

export const WithContent: Story = {
  render: WithContentTemplate,
};
