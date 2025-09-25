import React, { useRef, useState } from "react";
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
import { Checkbox } from "@jobber/components/Checkbox";
import { Tooltip } from "@jobber/components/Tooltip";
import { Popover } from "@jobber/components/Popover";
import { Content } from "@jobber/components/Content";

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
  const items: {
    label: string;
    icon: IconNames;
    onClick: () => void;
    destructive?: boolean;
  }[] = [
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
    {
      label: "Delete",
      icon: "trash",
      destructive: true,
      onClick: () => {
        alert("🗑️");
      },
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
  ];

  const [canView, setCanView] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(true);

  return (
    <div>
      <section>
        <h1>Composable with sections</h1>
        <Menu>
          <Popover
            attachTo={divRef}
            open={showPopover}
            onRequestClose={() => setShowPopover(false)}
          >
            <Content>
              <Text>Click here for new features!</Text>
            </Content>
          </Popover>
          <Menu.Trigger ref={divRef}>
            <Button>
              <Button.Label>I have a popover</Button.Label>
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
          <Tooltip message="Menu Tooltip">
            <Menu.Trigger>
              <Button>
                <Button.Label>I have a tooltip</Button.Label>
              </Button>
            </Menu.Trigger>
          </Tooltip>
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
                    <Typography fontWeight="semiBold" element="span">
                      Edit
                    </Typography>
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
                      <Icon
                        name={item.icon}
                        color={item.destructive ? "destructive" : "icon"}
                      />
                      <Typography
                        fontWeight="semiBold"
                        element="span"
                        textColor={item.destructive ? "destructive" : "text"}
                      >
                        {item.label}
                      </Typography>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <Checkbox
            label="Admin?"
            checked={canView}
            onChange={() => setCanView(!canView)}
          />
          <Menu>
            <Menu.Trigger>
              <Button>
                <Button.Label>Conditonal Menu Items</Button.Label>
              </Button>
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item onClick={() => alert("Timesheets")}>
                <Icon name="timer" />
                <Text>Timesheets</Text>
              </Menu.Item>
              <Menu.Item onClick={() => alert("Invoices")}>
                <Icon name="invoice" />
                <Text>Invoices</Text>
              </Menu.Item>
              <PermissionCheck canView={canView}>
                <Menu.Item onClick={() => alert("Admin")}>
                  <Icon name="lock" />
                  <Text>Admin</Text>
                </Menu.Item>
              </PermissionCheck>
            </Menu.Content>
          </Menu>
        </div>
      </section>
    </div>
  );
};

function PermissionCheck({
  children,
  canView,
}: {
  readonly children: React.ReactNode;
  readonly canView: boolean;
}) {
  if (!canView) return null;

  return <>{children}</>;
}
