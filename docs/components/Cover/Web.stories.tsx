import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cover } from "@jobber/components/Cover";
import { Box } from "@jobber/components/Box";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Layouts and Structure/Cover/Web",
  component: Cover,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Cover>;

const BasicTemplate: ComponentStory<typeof Cover> = args => (
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  minHeight: "30vh",
};

export const WithTopAndBottom: ComponentStory<typeof Cover> = () => (
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

export const TallCover: ComponentStory<typeof Cover> = () => (
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
