import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

type ResponsiveSwitcherStoryArgs = Pick<
  React.ComponentProps<typeof ResponsiveSwitcher>,
  "threshold" | "gap" | "limit"
>;

const meta = {
  title: "Components/Layouts and Structure/ResponsiveSwitcher",
  component: ResponsiveSwitcher,
} satisfies Meta<typeof ResponsiveSwitcher>;

export default meta;

type Story = StoryObj<ResponsiveSwitcherStoryArgs>;

export const Basic: Story = {
  render: args => {
    return (
      <Stack>
        <ResponsiveSwitcher
          gap={args?.gap ?? "base"}
          limit={args?.limit ?? 2}
          threshold={args?.threshold ?? "60ch"}
        >
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Left/Top Content</Heading>
                <Text>
                  This content will switch between horizontal and vertical
                  layout based on the threshold.
                </Text>
              </Stack>
            </Box>
          </Card>
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Right/Bottom Content</Heading>
                <Text>
                  The layout switches when the container width is less than the
                  threshold.
                </Text>
              </Stack>
            </Box>
          </Card>
        </ResponsiveSwitcher>
      </Stack>
    );
  },
  args: {
    threshold: "60ch",
    gap: "base",
    limit: 2,
  },
};

export const MultipleItems: Story = {
  render: args => {
    return (
      <Stack>
        <ResponsiveSwitcher
          gap={args?.gap ?? "large"}
          limit={args?.limit ?? 3}
          threshold={args?.threshold ?? "50ch"}
        >
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Card 1</Heading>
                <Text>First card content</Text>
              </Stack>
            </Box>
          </Card>
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Card 2</Heading>
                <Text>Second card content</Text>
              </Stack>
            </Box>
          </Card>
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Card 3</Heading>
                <Text>Third card content</Text>
              </Stack>
            </Box>
          </Card>
        </ResponsiveSwitcher>
      </Stack>
    );
  },
  args: {
    threshold: "50ch",
    gap: "large",
    limit: 3,
  },
};

export const CustomSpacing: Story = {
  render: args => {
    return (
      <Stack>
        <ResponsiveSwitcher
          gap={args?.gap ?? "12px"}
          limit={args?.limit ?? 2}
          threshold={args?.threshold ?? "40ch"}
        >
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Custom Space</Heading>
                <Text>Using a custom spacing value</Text>
              </Stack>
            </Box>
          </Card>
          <Card>
            <Box padding="base">
              <Stack>
                <Heading level={3}>Between Items</Heading>
                <Text>The gap between items is customizable</Text>
              </Stack>
            </Box>
          </Card>
        </ResponsiveSwitcher>
      </Stack>
    );
  },
  args: {
    threshold: "40ch",
    gap: "12px",
    limit: 2,
  },
};
