import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Center } from "@jobber/components/Center";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";
import { Rectangle } from "@jobber/components/Rectangle";

export default {
  title: "Components/Layouts and Structure/Center/Web",
  component: Center,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Center>;

const BasicTemplate: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Stack>
      <Text>
        This is centered content that demonstrates the Center component&rsquo;s
        ability to constrain and center content within a container. The content
        will be centered horizontally and have a maximum width defined by the
        max prop. If gutters are applied, they will be applied when there is
        more room at the edges of the container.
      </Text>
      <Rectangle>
        <Button>
          <Button.Label>Click me</Button.Label>
        </Button>
      </Rectangle>
    </Stack>
  </Center>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  max: "50ch",
};

export const WithGutters = BasicTemplate.bind({});
WithGutters.args = {
  max: "50ch",
  gutters: "base",
};

export const WithAndText = BasicTemplate.bind({});
WithAndText.args = {
  max: "50ch",
  andText: true,
};

const CustomMaxWidthTemplate: ComponentStory<typeof Center> = args => (
  <Center {...args}>
    <Content>
      <Text>
        This content demonstrates a custom maximum width constraint. The Center
        component allows you to specify any valid CSS length unit for the max
        prop.
      </Text>
    </Content>
  </Center>
);

export const CustomMaxWidth = CustomMaxWidthTemplate.bind({});
CustomMaxWidth.args = {
  max: "75ch",
  gutters: "large",
};
