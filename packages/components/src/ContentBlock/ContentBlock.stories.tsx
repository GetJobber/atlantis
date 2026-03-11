import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentBlock } from "@jobber/components/ContentBlock";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";
import { Cluster } from "@jobber/components/Cluster";

const meta = {
  title: "Components/Layouts and Structure/ContentBlock",
  component: ContentBlock,
} satisfies Meta<typeof ContentBlock>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof ContentBlock>>>;

function mapClusterJustify(
  justify: React.ComponentProps<typeof ContentBlock>["justify"],
) {
  if (justify === "center") return "center";
  if (justify === "right") return "end";

  return "start";
}

const BasicTemplate = (args: Story["args"]) => (
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
      <Cluster justify={mapClusterJustify(args?.justify)}>
        <Button>
          <Button.Label>Click me</Button.Label>
        </Button>
      </Cluster>
    </Stack>
  </ContentBlock>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    maxWidth: "50ch",
    justify: "left",
  },
};

export const WithGutters: Story = {
  render: BasicTemplate,
  args: {
    maxWidth: "50ch",
    gutters: "base",
  },
};

export const WithAndText: Story = {
  render: BasicTemplate,
  args: {
    maxWidth: "50ch",
    justify: "center",
    andText: true,
  },
};

const CustomMaxWidthTemplate = (args: Story["args"]) => (
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

export const CustomMaxWidth: Story = {
  render: CustomMaxWidthTemplate,
  args: {
    maxWidth: "12ch",
    gutters: "large",
  },
};
