import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Link } from "@jobber/components/Link";

export default {
  title: "Components/Text and Typography/Link/Web",
  component: Link,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Link>;

const BasicTemplate: StoryFn<typeof Link> = args => (
  <Link {...args}>What is a Link anyway?</Link>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    url: "https://en.wikipedia.org/wiki/Hyperlink",
    external: true,
  },
};
