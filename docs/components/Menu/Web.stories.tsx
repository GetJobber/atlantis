import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Menu } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Icon, IconNames } from "@jobber/components/Icon";

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

export const Composable = () => {
  const items: { label: string; icon: IconNames; onClick: () => void }[] = [
    {
      label: "Home",
      icon: "home",
      onClick: () => alert("Home"),
    },
    {
      label: "Admin",
      icon: "lock",
      onClick: () => alert("Admin"),
    },
  ];

  return (
    <div>
      <section>
        <h1>Composable with sections</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Press me</Button.Label>
              <Button.Icon name="sparkles" />
            </Button>
            {/* <InlineLabel color="blue">Press me</InlineLabel> */}
            {/* <button type="button">Press me</button> */}
            {/* <span role="button">Press me</span> */}
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Section>
              <Menu.Header>
                <Heading level={4}>Nav</Heading>
              </Menu.Header>
              <Menu.Item onClick={() => alert("Home")}>
                <Icon name="home" />
                <Text>Home</Text>
              </Menu.Item>
              <Menu.Item onClick={() => alert("Admin")}>
                <Icon name="lock" />
                <Text>Admin</Text>
              </Menu.Item>
            </Menu.Section>
            <Menu.Section>
              <Menu.Header>
                <Heading level={4}>Other</Heading>
              </Menu.Header>
              <Menu.Item onClick={() => alert("Something")}>
                <Text>Something</Text>
              </Menu.Item>
            </Menu.Section>
          </Menu.Content>
        </Menu>
      </section>
      <section>
        <h1>Composable flat</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Press me</Button.Label>
              <Button.Icon name="sparkles" />
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              <Button onClick={() => alert("Home")}>
                <Button.Label>Home</Button.Label>
                <Button.Icon name="home" />
              </Button>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </section>

      <section>
        <h1>Composable with iteration</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Press me</Button.Label>
              <Button.Icon name="sparkles" />
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            {items.map(item => (
              <Menu.Item key={item.label}>
                <Button onClick={item.onClick}>
                  <Button.Label>{item.label}</Button.Label>
                  <Button.Icon name={item.icon} />
                </Button>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu>
      </section>
    </div>
  );
};
