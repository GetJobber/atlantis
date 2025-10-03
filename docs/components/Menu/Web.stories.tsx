import React, { useRef, useState } from "react";
import { Menu, SectionProps } from "@jobber/components/Menu";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import type { IconNames } from "@jobber/components/Icon";
import { Chip } from "@jobber/components/Chip";
import { Grid } from "@jobber/components/Grid";
import { Checkbox } from "@jobber/components/Checkbox";
import { Tooltip } from "@jobber/components/Tooltip";
import { Popover } from "@jobber/components/Popover";
import { Content } from "@jobber/components/Content";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Emphasis } from "@jobber/components/Emphasis";

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
              <Menu.Header label="Nav" />
              <Menu.Item
                label="Home"
                icon="home"
                onClick={() => alert("Home")}
              />
              <Menu.Item
                label="Admin"
                icon="lock"
                onClick={() => alert("Admin")}
              />
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header label="Misc" />
              <Menu.Item
                label="Toggle Theme"
                onClick={() => alert("Something")}
              />
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
            <Menu.Item label="Email" icon="email" onClick={() => alert("")} />
            <Menu.Item
              label="Text Message"
              icon="sms"
              onClick={() => alert("🔋")}
            />
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
                label={item.label}
                icon={item.icon}
                onClick={item.onClick}
              />
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
                  <Menu.Item
                    label="Edit"
                    icon="edit"
                    onClick={() => alert("✏️")}
                  />
                </Menu.Section>
                <Menu.Separator />
                <Menu.Section>
                  <Menu.Header label="Send as..." />
                  {items.map(item => (
                    <Menu.Item
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      onClick={item.onClick}
                      destructive={item.destructive}
                    />
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
                label="Timesheets"
                icon="timer"
                onClick={() => alert("Timesheets")}
              />
              <Menu.Item
                label="Invoices"
                icon="invoice"
                onClick={() => alert("Invoices")}
              />
              <PermissionCheck canView={canView}>
                <Menu.Item
                  label="Admin"
                  icon="lock"
                  onClick={() => alert("Admin")}
                />
              </PermissionCheck>
            </Menu.Content>
          </Menu>
        </div>
      </section>
      <section>
        <h1>Composable with Custom Render</h1>
        <Menu>
          <Menu.Trigger>
            <Button>
              <Button.Label>Mixed</Button.Label>
            </Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Section>
              <Menu.Header label="Opinionated" />
              <Menu.Item
                onClick={() => alert("Email")}
                label="Email"
                icon="email"
              />
              <Menu.Item
                onClick={() => alert("Text message")}
                label="Text message"
                icon="sms"
              />
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header
                customRender={() => (
                  <Emphasis variation="highlight">Emphasized Header</Emphasis>
                )}
              />
              <Menu.Item
                onClick={() => alert("Email")}
                customRender={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Email</span>
                    <span aria-hidden>📧</span>
                  </div>
                )}
              />
              <Menu.Item
                onClick={() => alert("Sync")}
                customRender={() => (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontWeight: 600 }}>Sync</span>
                    <StatusLabel label="In progress" status="success" />
                  </div>
                )}
              />
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header label="Links" />
              <Menu.Item
                label="Jobber"
                href="https://getjobber.com"
                target="_blank"
                rel="noreferrer"
              />
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Header label="Link + customRender" />
              <Menu.Item
                href="https://help.getjobber.com/hc/en-us"
                target="_blank"
                rel="noreferrer"
                customRender={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: 4,
                    }}
                  >
                    <span style={{ textDecoration: "underline" }}>
                      Jobber Docs
                    </span>
                    <span aria-hidden>↗</span>
                  </div>
                )}
              />
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
