import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tiles } from "@jobber/components/Tiles";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

type TilesStoryArgs = Pick<
  React.ComponentProps<typeof Tiles>,
  "gap" | "minSize"
>;

const meta = {
  title: "Components/Layouts and Structure/Tiles",
  component: Tiles,
} satisfies Meta<typeof Tiles>;

export default meta;

type Story = StoryObj<TilesStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Tiles gap={args?.gap} minSize={args?.minSize}>
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    gap: "base",
    minSize: "30ch",
  },
};

export const CustomSpace: Story = {
  render: BasicTemplate,
  args: {
    gap: "large",
    minSize: "30ch",
  },
};

export const CustomMinSize: Story = {
  render: BasicTemplate,
  args: {
    gap: "base",
    minSize: "40ch",
  },
};

const ContentTemplate = (args: Story["args"]) => (
  <Tiles gap={args?.gap} minSize={args?.minSize}>
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

const AlignmentTemplate = () => (
  <Box border="base" borderColor="border">
    <Tiles gap="largest" align="center">
      <Card>
        <Box height={150} padding="base" justifyContent="center">
          <Text>First tile</Text>
        </Box>
      </Card>
      <Card>
        <Box height={50} padding="base" justifyContent="center">
          <Text>Second tile</Text>
        </Box>
      </Card>
      <Card>
        <Box height={20} padding="base" justifyContent="center">
          <Text>Third tile</Text>
        </Box>
      </Card>
      <Card>
        <Box height={30} padding="base" justifyContent="center">
          <Text>Forth tile</Text>
        </Box>
      </Card>
    </Tiles>
  </Box>
);

export const Alignment: Story = {
  render: AlignmentTemplate,
};

export const WithContent: Story = {
  render: ContentTemplate,
  args: {
    gap: "base",
    minSize: "30ch",
  },
};
