import type { ComponentProps } from "react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@jobber/components/Avatar";
import { Tooltip } from "@jobber/components/Tooltip";

const meta = {
  title: "Components/Images and Icons/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof Avatar>;

const toAvatarProps = (args: Story["args"]): ComponentProps<typeof Avatar> => {
  const storyArgs = (args ?? {}) as Partial<ComponentProps<typeof Avatar>>;

  // Note from Scott: This sort of workaround code is exactly why we need to move
  // away from complicated prop combinations and towards more composition.
  // Or maybe it's just why I want to move away from using TSXOR for these
  // kinds of 'opinionated components' just compose the two different ones together
  // and maybe a variation to pick which one?
  // Either way, the LLM wrote this to get around typing issues with just passing
  // the props directly like it's supposed to with Storybook. I've left it here on purpose to encourage us
  // to fix our ts-xor typing issues.

  if (storyArgs.imageUrl !== undefined) {
    const rest = { ...storyArgs };
    delete rest.initials;

    return { ...rest, imageUrl: storyArgs.imageUrl };
  }

  return { ...storyArgs, initials: storyArgs.initials ?? "" };
};

const BasicTemplate = (args: Story["args"]) => (
  <Avatar {...toAvatarProps(args)} />
);

const TooltipTemplate = (args: Story["args"]) => (
  <Tooltip message="The Jobbler">
    <Avatar {...toAvatarProps(args)} />
  </Tooltip>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    color: "var(--color-green)",
    imageUrl:
      "https://images.unsplash.com/photo-1533858539156-90ea20bafd17?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    name: "The Jobbler",
    size: "large",
  },
};

export const WithTooltip: Story = {
  render: TooltipTemplate,
  args: {
    size: "large",
    initials: "JBLR",
  },
};
