import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Typography } from "@jobber/components-native";

type TypographyStoryArgs = Pick<
  React.ComponentProps<typeof Typography>,
  "transform"
>;

const meta = {
  title: "Components/Text and Typography/Typography",
  component: Typography,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<TypographyStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Typography transform={args?.transform}>Some type here</Typography>
);

export const Basic: Story = {
  render: BasicTemplate,
};

export const Transform: Story = {
  render: BasicTemplate,
  args: {
    transform: "uppercase",
  },
};
