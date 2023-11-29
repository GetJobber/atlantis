import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Markdown } from "@jobber/components/Markdown";

export default {
  title: "Components/Text and Typography/Markdown/Web",
  component: Markdown,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Markdown>;

const BasicTemplate: ComponentStory<typeof Markdown> = args => {
  const content = `### Bananas\nBananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).`;

  return (
    <Markdown
      content={content}
      basicUsage={args.basicUsage}
      externalLink={args.externalLink}
    />
  );
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  externalLink: true,
};
