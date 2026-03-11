import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SideKick } from "@jobber/components/SideKick";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

type SideKickStoryArgs = Pick<
  React.ComponentProps<typeof SideKick>,
  "contentMinWidth" | "sideWidth" | "gap" | "onRight"
>;

const meta = {
  title: "Components/Layouts and Structure/SideKick",
  component: SideKick,
} satisfies Meta<typeof SideKick>;

export default meta;

type Story = StoryObj<SideKickStoryArgs>;

const renderSideKick = (args?: Story["args"]) => (
  <SideKick
    contentMinWidth={args?.contentMinWidth}
    gap={args?.gap}
    onRight={args?.onRight}
    sideWidth={args?.sideWidth}
  >
    <Box>
      <Card>
        <Box padding="base">
          <Stack>
            <Text>This is the main</Text>
          </Stack>
        </Box>
      </Card>
    </Box>
    <Box>
      <Card>
        <Box padding="base">
          <Text>This is the side</Text>
        </Box>
      </Card>
    </Box>
  </SideKick>
);

export const Basic: Story = {
  render: renderSideKick,
  args: {
    contentMinWidth: "70ch",
    sideWidth: "50%",
  },
};

export const CustomSideWidth: Story = {
  render: renderSideKick,
  args: {
    contentMinWidth: "220px",
    sideWidth: "20%",
  },
};

export const CustomSpace: Story = {
  render: renderSideKick,
  args: {
    gap: "var(--space-large)",
  },
};

export const RightSide: Story = {
  render: renderSideKick,
  args: {
    onRight: true,
  },
};

export const CustomContentMinWidth: Story = {
  render: renderSideKick,
  args: {
    contentMinWidth: "60%",
  },
};

export const ComplexExample: Story = {
  render: args => (
    <SideKick
      contentMinWidth={args?.contentMinWidth ?? "400px"}
      gap={args?.gap ?? "larger"}
      sideWidth={args?.sideWidth ?? "10%"}
    >
      <Card>
        <Box padding="base">
          <Stack>
            <Text>This side panel has a fixed width of 400px</Text>
            <Text>
              It contains important navigation or supplementary content
            </Text>
          </Stack>
        </Box>
      </Card>
      <Card>
        <Box padding="base">
          <Stack>
            <Text>
              This main content area grows to fill the available space while
              maintaining a minimum width of 70% of the container
            </Text>
            <Text>
              The space between the panels is customized to be larger than
              default
            </Text>
          </Stack>
        </Box>
      </Card>
    </SideKick>
  ),
  args: {
    sideWidth: "10%",
    contentMinWidth: "400px",
    gap: "larger",
  },
};
