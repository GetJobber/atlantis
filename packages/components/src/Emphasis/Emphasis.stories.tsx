import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";

const meta = {
  title: "Components/Text and Typography/Emphasis",
  component: Emphasis,
} satisfies Meta<typeof Emphasis>;
export default meta;
type EmphasisStoryArgs = Pick<
  React.ComponentProps<typeof Emphasis>,
  "variation"
>;
type Story = StoryObj<EmphasisStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Text>
    To <Emphasis variation={args?.variation ?? "bold"}>boldly</Emphasis> go…
  </Text>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    variation: "bold",
  },
};
