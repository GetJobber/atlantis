import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cover } from "@jobber/components/Cover";
import { Box } from "@jobber/components/Box";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Layouts and Structure/Cover",
  component: Cover,
} satisfies Meta<typeof Cover>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
  <Cover {...args}>
    <Cover.Center>
      <Box padding="base" background="surface--background">
        <Stack>
          <Heading level={2}>Centered Content</Heading>
          <Text>This content is vertically centered within the Cover</Text>
        </Stack>
      </Box>
    </Cover.Center>
  </Cover>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    minHeight: "30vh",
  },
};

const WithTopAndBottomTemplate = () => (
  <Cover minHeight="50vh">
    <Stack>
      <Text>Content at the top</Text>
    </Stack>
    <Cover.Center>
      <Box padding="base" background="surface--background">
        <Stack>
          <Heading level={2}>Centered Content</Heading>
          <Text>This content stays centered while content flows around it</Text>
        </Stack>
      </Box>
    </Cover.Center>
    <Stack>
      <Text>Content at the bottom</Text>
    </Stack>
  </Cover>
);

const TallCoverTemplate = () => (
  <Cover minHeight="80vh">
    <Cover.Center>
      <Box padding="base" background="surface--background">
        <Stack>
          <Heading level={2}>Tall Cover</Heading>
          <Text>This cover takes up most of the viewport height</Text>
        </Stack>
      </Box>
    </Cover.Center>
  </Cover>
);

export const WithTopAndBottom: Story = {
  render: WithTopAndBottomTemplate,
};

export const TallCover: Story = {
  render: TallCoverTemplate,
};
