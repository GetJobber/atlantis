import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Stack } from "@jobber/components/Stack";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Rectangle } from "@jobber/components/Rectangle";

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
      <Rectangle>
        <Text>First item</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Second item</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Third item</Text>
      </Rectangle>
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
        <Rectangle>
          <Text>First item</Text>
        </Rectangle>
      </Card>
      <Card>
        <Rectangle>
          <Text>Second item</Text>
        </Rectangle>
      </Card>
      <Card>
        <Rectangle>
          <Text>Third item</Text>
        </Rectangle>
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
        <Rectangle>
          <Text>Nested item 1.1</Text>
          <Text>Nested item 1.1.2</Text>
        </Rectangle>
      </Card>
      <Card>
        <Rectangle>
          <Text>Nested item 1.2</Text>
        </Rectangle>
      </Card>
    </div>
    <div>
      <Card>
        <Rectangle>
          <Text>Nested item 2.1</Text>
        </Rectangle>
      </Card>
      <Card>
        <Rectangle>
          <Text>Nested item 2.2</Text>
        </Rectangle>
      </Card>
    </div>
  </Stack>
);

export const Recursive = RecursiveTemplate.bind({});
Recursive.args = {
  space: "large",
  recursive: true,
};
