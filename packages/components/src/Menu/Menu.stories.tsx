import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionProps } from "@jobber/components/Menu";
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
import { Menu } from ".";
import { BottomSheet } from "../BottomSheet";

const meta = {
  title: "Components/Navigation/Menu",
  component: Menu,
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<Record<string, never>>;

export const Horizontal: Story = {
  render: () => (
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
  ),
};

export const CustomActivator: Story = {
  render: () => (
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
  ),
};

export const Composable: Story = {
  render: () => {
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
    const [controlledOpen, setControlledOpen] = useState(false);

    const fullWidthTriggerRef = useRef<HTMLDivElement>(null);
    const [showFullWidthPopover, setShowFullWidthPopover] = useState(true);

    return (
      <div>
        <style>
          {`
          .custom-styles {
            display: flex;
            flex-direction: row;
            gap: 5px;
            justify-content: space-between;
          }
        `}
        </style>
        <section>
          <h1>Composable with sections</h1>
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
          <Menu.Popover>
            <Menu.Popover.Trigger ariaLabel="I have a popover" ref={divRef}>
              <Button>
                <Button.Label>I have a popover</Button.Label>
              </Button>
            </Menu.Popover.Trigger>
            <Menu.Popover.Content>
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
            </Menu.Popover.Content>
          </Menu.Popover>
        </section>
        <section>
          <h1>Composable flat (controlled)</h1>
          <Menu
            ariaLabel="I have a tooltip"
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            trigger={
              <Tooltip message="Menu Tooltip">
                <Button>
                  <Button.Label>I have a tooltip</Button.Label>
                </Button>
              </Tooltip>
            }
          >
            <Menu.Item onClick={() => alert("")} textValue="Email">
              <Menu.ItemLabel>Email</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={() => alert("🔋")} textValue="Text Message">
              <Menu.ItemLabel>Text Message</Menu.ItemLabel>
            </Menu.Item>
          </Menu>
        </section>

        <section>
          <h1>Composable with iteration</h1>
          <Menu ariaLabel="Press me" trigger={<Chip label="Press me" />}>
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
          </Menu>
        </section>

        <section>
          <h1>Composable Implementing Default</h1>
          <Grid>
            <Grid.Cell size={{ xs: 6 }}>
              <Menu
                ariaLabel="Composable"
                trigger={
                  <Button>
                    <Button.Label>Composable</Button.Label>
                  </Button>
                }
              >
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
                      variation={item.destructive ? "destructive" : undefined}
                      textValue={item.label}
                    >
                      <Menu.ItemLabel>{item.label}</Menu.ItemLabel>
                      <Menu.ItemIcon name={item.icon} />
                    </Menu.Item>
                  ))}
                </Menu.Section>
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
            <Menu
              ariaLabel="Conditional Menu Items"
              trigger={
                <Button>
                  <Button.Label>Conditonal Menu Items</Button.Label>
                </Button>
              }
            >
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
            </Menu>
          </div>
        </section>
        <section>
          <h1>Composable with Custom Content</h1>
          <Menu
            ariaLabel="Custom"
            trigger={
              <Button>
                <Button.Label>Custom</Button.Label>
              </Button>
            }
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
                className="custom-styles"
                onClick={() => alert("Email")}
                textValue="Email"
              >
                <Typography element="span" fontWeight="semiBold">
                  Email (Right)
                </Typography>
                <Icon name="email" />
              </Menu.Item>
              <Menu.Item
                className="custom-styles"
                onClick={() => alert("Text message")}
                textValue="Text Message"
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
                className="custom-styles"
                onClick={() => alert("New")}
                textValue="Line Items"
              >
                <Typography element="span" fontWeight="bold">
                  Line Items
                </Typography>
                <StatusIndicator status="critical" />
              </Menu.Item>

              <Menu.Item
                className="custom-styles"
                onClick={() => alert("Job Forms")}
                textValue="Job Forms"
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
                className="custom-styles"
                href="https://getjobber.com"
                rel="noreferrer"
                target="_blank"
                textValue="Jobber"
              >
                <Typography element="span">Jobber</Typography>
              </Menu.Item>
              <Menu.Item
                className="custom-styles"
                href="https://help.getjobber.com/hc/en-us"
                rel="noreferrer"
                target="_blank"
                textValue="Jobber Docs"
              >
                <span style={{ textDecoration: "underline" }}>Jobber Docs</span>
                <span aria-hidden>↗</span>
              </Menu.Item>
            </Menu.Section>
          </Menu>
        </section>

        <section>
          <h1>Composable with full width trigger and Popover</h1>
          <Popover
            attachTo={fullWidthTriggerRef}
            open={showFullWidthPopover}
            preferredPlacement="bottom"
            onRequestClose={() => setShowFullWidthPopover(false)}
          >
            <Content>
              <Text>Centered on the trigger</Text>
            </Content>
          </Popover>
          <Menu.Popover>
            <Menu.Popover.Trigger
              ariaLabel="I am full width and have a popover"
              ref={fullWidthTriggerRef}
              style={{ display: "block" }}
            >
              <Button fullWidth={true}>
                <Button.Label>I am full width and have a popover</Button.Label>
              </Button>
            </Menu.Popover.Trigger>
            <Menu.Popover.Content>
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
            </Menu.Popover.Content>
          </Menu.Popover>
        </section>
      </div>
    );
  },
};

export const ExplicitRoots: Story = {
  render: () => (
    <div>
      <Heading level={3}>Responsive default</Heading>
      <Menu
        ariaLabel="Responsive Menu"
        trigger={<Button label="Responsive Menu" />}
      >
        <Menu.Section>
          <Menu.Header>
            <Menu.HeaderLabel>Actions</Menu.HeaderLabel>
          </Menu.Header>
          <Menu.Item onClick={() => alert("Edit")} textValue="Edit">
            <Menu.ItemLabel>Edit</Menu.ItemLabel>
            <Menu.ItemIcon name="edit" />
          </Menu.Item>
        </Menu.Section>
      </Menu>

      <Heading level={3}>Explicit popover surface</Heading>
      <Menu.Popover
        ariaLabel="Popover Menu"
        trigger={<Button label="Popover Menu" />}
      >
        <Menu.Popover.Section>
          <Menu.Popover.Header>
            <Menu.Popover.HeaderLabel>Actions</Menu.Popover.HeaderLabel>
          </Menu.Popover.Header>
          <Menu.Popover.Item
            onClick={() => alert("Archive")}
            textValue="Archive"
          >
            <Menu.Popover.ItemLabel>Archive</Menu.Popover.ItemLabel>
            <Menu.Popover.ItemIcon name="archive" />
          </Menu.Popover.Item>
        </Menu.Popover.Section>
      </Menu.Popover>

      <Heading level={3}>Explicit bottom sheet surface</Heading>
      <BottomSheet
        ariaLabel="Bottom Sheet"
        trigger={<Button label="Bottom Sheet" />}
      >
        <BottomSheet.Section>
          <BottomSheet.Header>
            <BottomSheet.HeaderLabel>Actions</BottomSheet.HeaderLabel>
          </BottomSheet.Header>
          <BottomSheet.Item
            onClick={() => alert("Delete")}
            textValue="Delete"
            variation="destructive"
          >
            <BottomSheet.ItemLabel>Delete</BottomSheet.ItemLabel>
            <BottomSheet.ItemIcon name="trash" />
          </BottomSheet.Item>
        </BottomSheet.Section>
      </BottomSheet>
    </div>
  ),
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
