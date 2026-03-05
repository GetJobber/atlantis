import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Markdown } from "@jobber/components/Markdown";

export default {
  title: "Components/Text and Typography/Markdown/Web",
  component: Markdown,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Markdown>;

const BasicTemplate: StoryFn<typeof Markdown> = args => {
  const content = `### Bananas\nBananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).`;

  return (
    <Markdown
      content={content}
      basicUsage={args.basicUsage}
      externalLink={args.externalLink}
    />
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    externalLink: true,
  },
};
