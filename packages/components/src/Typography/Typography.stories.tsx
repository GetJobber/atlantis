import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@jobber/components/Typography";

type TypographyStoryArgs = Pick<
  React.ComponentProps<typeof Typography>,
  "element" | "textCase" | "emphasisType"
>;

const meta = {
  title: "Components/Text and Typography/Typography",
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<TypographyStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <div>
    <Typography
      element={args?.element}
      emphasisType={args?.emphasisType}
      textCase={args?.textCase}
    >
      Some type here
    </Typography>
  </div>
);

export const Basic: Story = {
  render: BasicTemplate,
};

export const Element: Story = {
  render: BasicTemplate,
  args: {
    element: "h1",
  },
};

export const TextCase: Story = {
  render: BasicTemplate,
  args: {
    textCase: "uppercase",
  },
};

export const Emphasis: Story = {
  render: BasicTemplate,
  args: {
    element: "span",
    emphasisType: "highlight",
  },
};
