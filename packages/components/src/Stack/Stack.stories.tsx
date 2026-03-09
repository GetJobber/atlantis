import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@jobber/components/Stack";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

type StackStoryArgs = Pick<
  React.ComponentProps<typeof Stack>,
  "gap" | "splitAfter" | "recursive"
>;

const meta = {
  title: "Components/Layouts and Structure/Stack",
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<StackStoryArgs>;

const renderStack = (args?: Story["args"]) => (
  <Stack
    gap={args?.gap}
    recursive={args?.recursive}
    splitAfter={args?.splitAfter}
  >
    <Card>
      <Box padding="base">
        <Text>First item</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Second item</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Third item</Text>
      </Box>
    </Card>
  </Stack>
);

export const Basic: Story = {
  render: renderStack,
  args: {
    gap: "base",
  },
};

export const CustomSpace: Story = {
  render: renderStack,
  args: {
    gap: "large",
  },
};

export const WithSplit: Story = {
  render: args => (
    <div
      style={{
        height: "400px",
      }}
    >
      {renderStack(args)}
    </div>
  ),
  args: {
    gap: "base",
    splitAfter: 1,
  },
};

export const Recursive: Story = {
  render: args => (
    <Stack gap={args?.gap ?? "large"} recursive={args?.recursive ?? true}>
      <Box>
        <Card>
          <Box padding="base">
            <Text>Nested item 1.1</Text>
            <Text>Nested item 1.1.2</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Nested item 1.2</Text>
          </Box>
        </Card>
      </Box>
      <Box>
        <Card>
          <Box padding="base">
            <Text>Nested item 2.1</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Nested item 2.2</Text>
          </Box>
        </Card>
      </Box>
    </Stack>
  ),
  args: {
    gap: "large",
    recursive: true,
  },
};
