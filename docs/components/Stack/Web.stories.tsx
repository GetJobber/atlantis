import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Stack>;

const BasicTemplate: ComponentStory<typeof Stack> = args => (
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  space: "base",
};

export const CustomSpace = BasicTemplate.bind({});
CustomSpace.args = {
  space: "large",
};

const SplitTemplate: ComponentStory<typeof Stack> = args => (
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

export const WithSplit = SplitTemplate.bind({});
WithSplit.args = {
  space: "base",
  splitAfter: 1,
};

const RecursiveTemplate: ComponentStory<typeof Stack> = args => (
  <Stack {...args}>
    <div>
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
    </div>
    <div>
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
    </div>
  </Stack>
);

export const Recursive = RecursiveTemplate.bind({});
Recursive.args = {
  space: "large",
  recursive: true,
};
