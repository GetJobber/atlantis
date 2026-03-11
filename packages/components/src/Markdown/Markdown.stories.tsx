import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Markdown } from "@jobber/components/Markdown";

const meta = {
  title: "Components/Text and Typography/Markdown",
  component: Markdown,
} satisfies Meta<typeof Markdown>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof Markdown>, "basicUsage" | "externalLink">
>;

const BasicTemplate = (args: Story["args"]) => {
  const content = `### Bananas\nBananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).`;

  return (
    <Markdown
      content={content}
      basicUsage={args?.basicUsage}
      externalLink={args?.externalLink}
    />
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    externalLink: true,
  },
};
