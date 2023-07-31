import React from "react";
import styles from "./Layout.css";
import { SideSheet } from "./SideSheet";
import { ThiccListProvider } from "./ThiccListProvider";
import { Heading } from "../Heading";
import { Grid } from "../Grid";
import { Text } from "../Text";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { Icon, IconNames } from "../Icon";

interface LayoutProps {
  readonly children: React.ReactNode;
}

const sidebarItems: {
  label?: string;
  icon?: IconNames;
  divider?: boolean;
  isCreate?: boolean;
  isActive?: boolean;
}[] = [
  { label: "Create", icon: "add", isCreate: true },
  { label: "Home", icon: "home" },
  { label: "Schedule", icon: "schedule" },
  { divider: true },
  { label: "Clients", icon: "clients", isActive: true },
  { label: "Request", icon: "request" },
  { label: "Quotes", icon: "quote" },
  { label: "Jobs", icon: "job" },
  { label: "Invoices", icon: "invoice" },
  { divider: true },
  { label: "Reports", icon: "reports" },
  { label: "Expenses", icon: "expense" },
  { label: "Timesheet", icon: "timer" },
  { label: "Apps", icon: "apps" },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo} />
        <div className={styles.sidebarDivider} />
        {sidebarItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className={styles.sidebarDivider} />;
          }

          return (
            <div
              key={index}
              className={styles.sidebarItem}
              data-active={item.isActive}
              data-create={item.isCreate}
            >
              {item.icon && <Icon name={item.icon} />}
              {item.label}
            </div>
          );
        })}
      </div>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <Grid alignItems="center">
            <Grid.Cell size={{ xs: 4 }}>
              <Text variation="subdued" maxLines="single">
                ABC Landscaping | <b>Randall Struckland</b>
              </Text>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 8 }}>
              <div className={styles.actions}>
                <InputText
                  placeholder="Search"
                  prefix={{ icon: "search" }}
                  size="small"
                />
                <Button
                  icon="quickbooks"
                  ariaLabel="Quickbooks"
                  type="secondary"
                  variation="subtle"
                />
                <Button
                  icon="chat"
                  ariaLabel="Messages"
                  type="secondary"
                  variation="subtle"
                />
                <Button
                  icon="reminder"
                  ariaLabel="Notifications"
                  type="secondary"
                  variation="subtle"
                />
                <Button
                  icon="cog"
                  ariaLabel="Settings"
                  type="secondary"
                  variation="subtle"
                />
              </div>
            </Grid.Cell>
          </Grid>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <Heading level={1}>Clients</Heading>
          </div>
          <ThiccListProvider>
            {children}

            <SideSheet />
          </ThiccListProvider>
        </div>
      </div>
    </div>
  );
}
