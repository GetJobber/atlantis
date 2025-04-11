import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ContentBlock } from "@jobber/components/ContentBlock";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";
import { Cluster } from "@jobber/components/Cluster";

export default {
  title: "Components/Layouts and Structure/ContentBlock/Web",
  component: ContentBlock,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof ContentBlock>;

const BasicTemplate: ComponentStory<typeof ContentBlock> = args => (
  <ContentBlock {...args}>
    <Stack>
      <Text>
        This is content that demonstrates the ContentBlock component&rsquo;s
        ability to constrain and justify content within a container. The content
        will be justified horizontally and have a maximum width defined by the
        maxWidth prop. If gutters are applied, they will be applied when there
        is no more room at the edges of the container to prevent it from bumping
        up against the edges.
      </Text>
      <Cluster
        justify={
          args.justify as "center" | "start" | "end" | "between" | "around"
        }
      >
        <Button>
          <Button.Label>Click me</Button.Label>
        </Button>
      </Cluster>
    </Stack>
  </ContentBlock>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  maxWidth: "50ch",
  justify: "left",
};

export const WithGutters = BasicTemplate.bind({});
WithGutters.args = {
  maxWidth: "50ch",
  gutters: "base",
};

export const WithAndText = BasicTemplate.bind({});
WithAndText.args = {
  maxWidth: "50ch",
  justify: "center",
};

const CustomMaxWidthTemplate: ComponentStory<typeof ContentBlock> = args => (
  <ContentBlock {...args}>
    <Stack>
      <Text>
        This content demonstrates a custom maximum width constraint. The
        ContentBlock component allows you to specify any valid CSS length unit
        for the maxWidth prop.
      </Text>
    </Stack>
  </ContentBlock>
);

export const CustomMaxWidth = CustomMaxWidthTemplate.bind({});
CustomMaxWidth.args = {
  maxWidth: "12ch",
  gutters: "large",
};
