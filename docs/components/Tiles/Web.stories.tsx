import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tiles } from "@jobber/components/Tiles";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Tiles/Web",
  component: Tiles,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Tiles>;

const BasicTemplate: ComponentStory<typeof Tiles> = args => (
  <Tiles {...args}>
    <Card>
      <Box padding="base">
        <Text>First tile</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Second tile</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Third tile</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Fourth tile</Text>
      </Box>
    </Card>
  </Tiles>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  gap: "base",
  minSize: "30ch",
};

export const CustomSpace = BasicTemplate.bind({});
CustomSpace.args = {
  gap: "large",
  minSize: "30ch",
};

export const CustomMinSize = BasicTemplate.bind({});
CustomMinSize.args = {
  gap: "base",
  minSize: "40ch",
};

const ContentTemplate: ComponentStory<typeof Tiles> = args => (
  <Tiles {...args}>
    <Card>
      <Box padding="base">
        <Text>
          A tile with some longer content to demonstrate how the tiles adjust to
          content
        </Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>
          Another tile with varying content length to show the responsive grid
          layout
        </Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Short tile</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>
          This tile has enough content to potentially affect the layout of other
          tiles in the grid
        </Text>
      </Box>
    </Card>
  </Tiles>
);

export const WithContent = ContentTemplate.bind({});
WithContent.args = {
  gap: "base",
  minSize: "30ch",
};
