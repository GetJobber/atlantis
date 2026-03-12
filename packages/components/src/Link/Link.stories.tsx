import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "@jobber/components/Link";

const meta = {
  title: "Components/Text and Typography/Link",
  component: Link,
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof Link>, "url" | "external">
>;

const BasicTemplate = (args: Story["args"]) => (
  <Link url={args?.url ?? ""} external={args?.external}>
    What is a Link anyway?
  </Link>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    url: "https://en.wikipedia.org/wiki/Hyperlink",
    external: true,
  },
};
