import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Menu, SectionProps } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Chip } from "@jobber/components/Chip";
import { Grid } from "@jobber/components/Grid";
import { Typography } from "@jobber/components/Typography";
import { Emphasis } from "@jobber/components/Emphasis";

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
      label: "Text Message",
      icon: "sms",
      onClick: () => alert("📱"),
    },
    {
      label: "Email",
      icon: "email",
      onClick: () => alert("📨"),
    },
  ];

  const legacyItems: SectionProps[] = [
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
  ];

  return (
    <div>
      <section>
        <h1>Composable with sections</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Press me</Button.Label>
            </Button>
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
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header>
                <Heading level={4}>Misc</Heading>
              </Menu.Header>
              <Menu.Item onClick={() => alert("Something")}>
                <Emphasis variation="highlight">Toggle Theme</Emphasis>
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
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item onClick={() => alert("�")}>
              <Icon name="email" />
              <Text>Email</Text>
            </Menu.Item>
            <Menu.Item onClick={() => alert("🔋")}>
              <Icon name="sms" />
              <Text>Text Message</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </section>

      <section>
        <h1>Composable with iteration</h1>
        <Menu>
          <Menu.Trigger>
            <Chip label="Press me" />
          </Menu.Trigger>
          <Menu.Content>
            {items.map(item => (
              <Menu.Item key={item.label} onClick={item.onClick}>
                <Icon name={item.icon} />
                <Text>{item.label}</Text>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu>
      </section>

      <section>
        <h1>Composable Implementing Default</h1>
        <Grid>
          <Grid.Cell size={{ xs: 6 }}>
            <Menu>
              <Menu.Trigger>
                <Button>
                  <Button.Label>Composable</Button.Label>
                </Button>
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Section>
                  <Menu.Item onClick={() => alert("✏️")}>
                    <Icon name="edit" />
                    <Text>Edit</Text>
                  </Menu.Item>
                </Menu.Section>
                <Menu.Separator />
                <Menu.Section>
                  <Menu.Header>
                    <Typography
                      element="h6"
                      size="base"
                      textColor="textSecondary"
                      fontWeight="regular"
                      textCase="none"
                    >
                      Send as...
                    </Typography>
                  </Menu.Header>
                  {items.map(item => (
                    <Menu.Item key={item.label} onClick={item.onClick}>
                      <Icon name={item.icon} />
                      <Text>{item.label}</Text>
                    </Menu.Item>
                  ))}
                </Menu.Section>
              </Menu.Content>
            </Menu>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Menu
              items={legacyItems}
              activator={
                <Button>
                  <Button.Label>Single Tag</Button.Label>
                </Button>
              }
            />
          </Grid.Cell>
        </Grid>
      </section>
      <section>
        <h1>Composable with Conditional Items</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Second Item Rendered After 2 Seconds</Button.Label>
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item onClick={() => alert("Timesheets")}>
              <Icon name="timer" />
              <Text>Timesheets</Text>
            </Menu.Item>
            <PseudoAuth>
              <Menu.Item onClick={() => alert("Admin")}>
                <Icon name="lock" />
                <Text>Admin</Text>
              </Menu.Item>
            </PseudoAuth>
          </Menu.Content>
        </Menu>
      </section>
    </div>
  );
};

function PseudoAuth({ children }: { readonly children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  if (!visible) return null;

  return <>{children}</>;
}
