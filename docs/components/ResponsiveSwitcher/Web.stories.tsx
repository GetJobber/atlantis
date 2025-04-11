import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

type ResponsiveSwitcherProps = React.ComponentProps<typeof ResponsiveSwitcher>;

export default {
  title: "Components/Layouts and Structure/ResponsiveSwitcher/Web",
  component: ResponsiveSwitcher,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof ResponsiveSwitcher>;

const BasicTemplate: ComponentStory<typeof ResponsiveSwitcher> = (
  args: ResponsiveSwitcherProps,
) => {
  return (
    <Stack>
      <ResponsiveSwitcher {...args}>
        <Card>
          <Box padding="base">
            <Stack>
              <Heading level={3}>Left/Top Content</Heading>
              <Text>
                This content will switch between horizontal and vertical layout
                based on the threshold.
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
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  threshold: "60ch",
  space: "base",
  limit: 2,
} as ResponsiveSwitcherProps;

const MultipleItemsTemplate: ComponentStory<typeof ResponsiveSwitcher> = (
  args: ResponsiveSwitcherProps,
) => {
  return (
    <Stack>
      <ResponsiveSwitcher {...args}>
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
};

export const MultipleItems = MultipleItemsTemplate.bind({});
MultipleItems.args = {
  threshold: "50ch",
  space: "large",
  limit: 3,
} as ResponsiveSwitcherProps;

const CustomSpacingTemplate: ComponentStory<typeof ResponsiveSwitcher> = (
  args: ResponsiveSwitcherProps,
) => {
  return (
    <Stack>
      <ResponsiveSwitcher {...args}>
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
};

export const CustomSpacing = CustomSpacingTemplate.bind({});
CustomSpacing.args = {
  threshold: "40ch",
  space: "12px",
  limit: 2,
} as ResponsiveSwitcherProps;
