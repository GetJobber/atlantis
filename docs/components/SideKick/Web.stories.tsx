import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SideKick } from "@jobber/components/SideKick";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/SideKick/Web",
  component: SideKick,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof SideKick>;

const BasicTemplate: ComponentStory<typeof SideKick> = args => (
  <SideKick {...args}>
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

export const Basic = BasicTemplate.bind({});

Basic.args = {
  contentMinWidth: "70ch",
  sideWidth: "50%",
};

export const CustomSideWidth = BasicTemplate.bind({});
CustomSideWidth.args = {
  contentMinWidth: "220px",
  sideWidth: "20%",
};
export const CustomSpace = BasicTemplate.bind({});
CustomSpace.args = {
  gap: "var(--space-large)",
};

export const RightSide = BasicTemplate.bind({});
RightSide.args = {
  onRight: true,
};

export const CustomContentMinWidth = BasicTemplate.bind({});
CustomContentMinWidth.args = {
  contentMinWidth: "60%",
};

const ComplexTemplate: ComponentStory<typeof SideKick> = args => (
  <SideKick {...args}>
    <Card>
      <Box padding="base">
        <Stack>
          <Text>This side panel has a fixed width of 400px</Text>
          <Text>It contains important navigation or supplementary content</Text>
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
            The space between the panels is customized to be larger than default
          </Text>
        </Stack>
      </Box>
    </Card>
  </SideKick>
);

export const ComplexExample = ComplexTemplate.bind({});
ComplexExample.args = {
  sideWidth: "10%",
  contentMinWidth: "400px",
  gap: "larger",
};
