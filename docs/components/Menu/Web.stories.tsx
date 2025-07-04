import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Menu } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Navigation/Menu/Web",
  component: Menu,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Menu>;

const BasicTemplate: ComponentStory<typeof Menu> = args => <Menu {...args} />;

export const Horizontal = BasicTemplate.bind({});
Horizontal.args = {
  items: [
    {
      actions: [
        {
          label: "Edit",
          icon: "edit",
          onClick: () => {
            alert("✏️");
          },
        },
      ],
    },
    {
      header: "Send as...",
      actions: [
        {
          label: "Text message",
          icon: "sms",
          onClick: () => {
            alert("📱");
          },
        },
        {
          label: "Email",
          icon: "email",
          onClick: () => {
            alert("📨");
          },
        },
      ],
    },
  ],
};

const CustomActivatorTemplate: ComponentStory<typeof Menu> = args => (
  <Menu {...args} activator={<Button label="My Fancy Menu" />} />
);

export const CustomActivator = CustomActivatorTemplate.bind({});
CustomActivator.args = {
  items: [
    {
      actions: [
        {
          label: "Edit",
          icon: "edit",
          onClick: () => {
            alert("✏️");
          },
        },
      ],
    },
    {
      header: "Send as...",
      actions: [
        {
          label: "Text Message",
          icon: "sms",
          onClick: () => {
            alert("📱");
          },
        },
        {
          label: "Email",
          icon: "email",
          onClick: () => {
            alert("📨");
          },
        },
        {
          label: "Delete",
          icon: "trash",
          destructive: true,
          onClick: () => {
            alert("🗑️");
          },
        },
      ],
    },
  ],
};

export const WithCustomStyle = CustomActivatorTemplate.bind({});
WithCustomStyle.args = {
  ...CustomActivator.args,
  UNSAFE_style: {
    menu: {
      borderRadius: "16px",
      border: "2px solid var(--color-interactive)",
      padding: "16px",
    },
    action: {
      textDecoration: "underline",
    },
    header: {
      border: "1px dotted var(--color-interactive)",
    },
  },
  items: [
    {
      actions: [
        { label: "Email", icon: "email" },
        { label: "Text Message", icon: "sms" },
        { label: "Delete", icon: "trash", destructive: true },
      ],
    },
    {
      header: "More",
      actions: [
        { label: "Mark as Sent", icon: "email" },
        { label: "Follow Up", icon: "sms" },
        { label: "Copy", icon: "copy" },
      ],
    },
  ],
};
