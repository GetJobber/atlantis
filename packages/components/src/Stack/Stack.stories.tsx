import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Stack } from "@jobber/components/Stack";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Stack/Web",
  component: Stack,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Stack>;

const BasicTemplate: StoryFn<typeof Stack> = args => (
  <Stack {...args}>
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

export const Basic = {
  render: BasicTemplate,
  args: {
    gap: "base",
  },
};
export const CustomSpace = {
  render: BasicTemplate,
  args: {
    gap: "large",
  },
};
const SplitTemplate: StoryFn<typeof Stack> = args => (
  <div
    style={{
      height: "400px",
    }}
  >
    <Stack {...args}>
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
  </div>
);

export const WithSplit = {
  render: SplitTemplate,
  args: {
    gap: "base",
    splitAfter: 1,
  },
};
const RecursiveTemplate: StoryFn<typeof Stack> = args => (
  <Stack {...args}>
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
);

export const Recursive = {
  render: RecursiveTemplate,
  args: {
    gap: "large",
    recursive: true,
  },
};
