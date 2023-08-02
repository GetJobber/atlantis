import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Link } from "@jobber/components/Link";

export default {
  title: "Components/Text and Typography/Link/Web",
  component: Link,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Link>;

const BasicTemplate: ComponentStory<typeof Link> = args => (
  <Link {...args}>What is a Link anyway?</Link>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  url: "https://en.wikipedia.org/wiki/Hyperlink",
  external: true,
};
