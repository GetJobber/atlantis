import React, { useRef, useState } from "react";
import { Menu, SectionProps } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Icon, type IconNames } from "@jobber/components/Icon";
import { Chip } from "@jobber/components/Chip";
import { Grid } from "@jobber/components/Grid";
import { Checkbox } from "@jobber/components/Checkbox";
import { Tooltip } from "@jobber/components/Tooltip";
import { Popover } from "@jobber/components/Popover";
import { Content } from "@jobber/components/Content";
import { Emphasis } from "@jobber/components/Emphasis";
import { Typography } from "@jobber/components/Typography";
import { StatusIndicator } from "@jobber/components/StatusIndicator";
import { Heading } from "@jobber/components/Heading";

export default {
  title: "Components/Navigation/Menu/Web",
  component: Menu,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as const;

export const Horizontal = () => (
  <Menu
    items={[
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
    ]}
  />
);

export const CustomActivator = () => (
  <Menu
    activator={<Button label="My Fancy Menu" />}
    items={[
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
    ]}
  />
);

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
            preferredPlacement="right"
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
                <Menu.HeaderLabel>Nav</Menu.HeaderLabel>
              </Menu.Header>
              <Menu.Item onClick={() => alert("Home")} textValue="Home">
                <Menu.ItemLabel>Home</Menu.ItemLabel>
                <Menu.ItemIcon name="home" />
              </Menu.Item>
              <Menu.Item onClick={() => alert("Admin")} textValue="Admin">
                <Menu.ItemLabel>Admin</Menu.ItemLabel>
                <Menu.ItemIcon name="lock" />
                <StatusIndicator status="critical" />
              </Menu.Item>
            </Menu.Section>
            <Menu.Section>
              <Menu.Header>
                <Menu.HeaderLabel>Misc</Menu.HeaderLabel>
              </Menu.Header>
              <Menu.Item
                onClick={() => alert("Toggle")}
                textValue="Toggle Theme"
              >
                <Menu.ItemLabel>Toggle Theme</Menu.ItemLabel>
                <Menu.ItemIcon name="sun" />
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
            <Menu.Item onClick={() => alert("")} textValue="Email">
              <Menu.ItemLabel>Email</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={() => alert("🔋")} textValue="Text Message">
              <Menu.ItemLabel>Text Message</Menu.ItemLabel>
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
              <Menu.Item
                key={item.label}
                onClick={item.onClick}
                textValue={item.label}
              >
                <Menu.ItemLabel>{item.label}</Menu.ItemLabel>
                <Menu.ItemIcon name={item.icon} />
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
                  <Menu.Item onClick={() => alert("✏️")} textValue="Edit">
                    <Menu.ItemLabel>Edit</Menu.ItemLabel>
                    <Menu.ItemIcon name="edit" />
                  </Menu.Item>
                </Menu.Section>
                <Menu.Separator />
                <Menu.Section>
                  <Menu.Header>
                    <Menu.HeaderLabel>Send as...</Menu.HeaderLabel>
                  </Menu.Header>
                  {items.map(item => (
                    <Menu.Item
                      key={item.label}
                      onClick={item.onClick}
                      destructive={item.destructive}
                      textValue={item.label}
                    >
                      <Menu.ItemLabel>{item.label}</Menu.ItemLabel>
                      <Menu.ItemIcon name={item.icon} />
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
              <Menu.Item
                onClick={() => alert("Timesheets")}
                textValue="Timesheets"
              >
                <Menu.ItemLabel>Timesheets</Menu.ItemLabel>
                <Menu.ItemIcon name="timer" />
              </Menu.Item>
              <Menu.Item onClick={() => alert("Invoices")} textValue="Invoices">
                <Menu.ItemLabel>Invoices</Menu.ItemLabel>
                <Menu.ItemIcon name="invoice" />
              </Menu.Item>
              <PermissionCheck canView={canView}>
                <Menu.Item onClick={() => alert("Admin")} textValue="Admin">
                  <Menu.ItemLabel>Admin</Menu.ItemLabel>
                  <Menu.ItemIcon name="lock" />
                </Menu.Item>
              </PermissionCheck>
            </Menu.Content>
          </Menu>
        </div>
      </section>
      <section>
        <h1>Composable with Custom Content</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Custom</Button.Label>
            </Button>
          </Menu.Trigger>
          <Menu.Content
            UNSAFE_style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Menu.Section>
              <Menu.Header>
                <Typography
                  element="span"
                  size="large"
                  fontWeight="bold"
                  textColor="invoice"
                >
                  Communications
                </Typography>
              </Menu.Header>
              <Menu.Item
                onClick={() => alert("Email")}
                textValue="Email"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography element="span" fontWeight="semiBold">
                  Email (Right)
                </Typography>
                <Icon name="email" />
              </Menu.Item>
              <Menu.Item
                onClick={() => alert("Text message")}
                textValue="Text Message"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography element="span" fontWeight="semiBold">
                  Text Message (Right)
                </Typography>
                <Icon name="sms" />
              </Menu.Item>
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header>
                <Emphasis variation="highlight">Featured Items</Emphasis>
              </Menu.Header>
              <Menu.Item
                onClick={() => alert("New")}
                textValue="Line Items"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography element="span" fontWeight="bold">
                  Line Items
                </Typography>
                <StatusIndicator status="critical" />
              </Menu.Item>

              <Menu.Item
                onClick={() => alert("Job Forms")}
                textValue="Job Forms"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography element="span" fontWeight="bold">
                  Job Forms
                </Typography>
                <StatusIndicator status="critical" />
              </Menu.Item>
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header>
                <Heading level={6}>Links</Heading>
              </Menu.Header>
              <Menu.Item
                href="https://getjobber.com"
                target="_blank"
                rel="noreferrer"
                textValue="Jobber"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography element="span">Jobber</Typography>
              </Menu.Item>
              <Menu.Item
                href="https://help.getjobber.com/hc/en-us"
                target="_blank"
                rel="noreferrer"
                textValue="Jobber Docs"
                UNSAFE_style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <span style={{ textDecoration: "underline" }}>Jobber Docs</span>
                <span aria-hidden>↗</span>
              </Menu.Item>
            </Menu.Section>
          </Menu.Content>
        </Menu>
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
