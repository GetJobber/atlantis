import {
  Box,
  Content,
  Glimmer,
  Heading,
  Icon,
  Menu,
  Page,
  StatusLabel,
  Text,
} from "@jobber/components";

export const VisualTestPagePage = () => {
  return (
    <Box padding="large">
      {/* Example 1: Basic Page - Title only */}
      <Page title="Basic Page - Title Only">
        <Content>
          <Text>This is the most basic Page component with just a title.</Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 2: Page with Subtitle */}
      <Page
        title="Page with Subtitle"
        subtitle="This is a subtitle that provides additional context"
      >
        <Content>
          <Text>This example shows a page with both title and subtitle.</Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 3: Page with Primary Action */}
      <Page
        title="Page with Primary Action"
        primaryAction={{
          label: "Create New",
          onClick: () => alert("Primary action clicked"),
        }}
      >
        <Content>
          <Text>This page includes a primary action button.</Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 4: Page with Primary and Secondary Actions */}
      <Page
        title="Page with Multiple Actions"
        subtitle="Both primary and secondary actions"
        primaryAction={{ label: "Save Changes", onClick: () => null }}
        secondaryAction={{ label: "Cancel", onClick: () => null }}
      >
        <Content>
          <Text>
            This example demonstrates both primary and secondary action buttons.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 5: Page with All Actions including Menu */}
      <Page
        title="Clients"
        subtitle="Filtered clients"
        primaryAction={{ label: "New Client", onClick: () => null }}
        secondaryAction={{ label: "More Actions", onClick: () => null }}
        moreActionsMenu={[
          {
            actions: [
              { label: "Import", onClick: () => null },
              { label: "Export", onClick: () => null },
              { label: "Archive", onClick: () => null },
            ],
          },
        ]}
      >
        <Content>
          <Text>
            This page exists to visually validate the responsive title bar
            actions. On small viewports, actions should render full width
            immediately without snapping from a horizontal layout.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 6: Page with Intro (Markdown) */}
      <Page
        title="Page with Introduction"
        intro="This is an **intro** section that supports _markdown_ formatting. You can include **bold text**, _italic text_, and more."
      >
        <Content>
          <Text>
            The intro prop appears between the title/subtitle and the main
            content.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 7: Page with Intro and External Links */}
      <Page
        title="Page with External Links"
        intro="Visit [Jobber](https://getjobber.com) for more information. This link will open in a new tab."
        externalIntroLinks={true}
      >
        <Content>
          <Text>
            Links in the intro will open in a new tab when externalIntroLinks is
            true.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 8: Page with Title Metadata */}
      <Page
        title="Page with Title Metadata"
        titleMetaData={<Glimmer size="small" />}
        subtitle="The glimmer badge appears next to the title"
      >
        <Content>
          <Text>
            Title metadata can include badges, icons, or other small components
            next to the title.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 9: Page with Standard Width (default) */}
      <Page
        title="Standard Width Page"
        subtitle="width='standard' (caps at 1280px)"
        width="standard"
        primaryAction={{ label: "Action", onClick: () => null }}
      >
        <Content>
          <Text>
            This page uses the standard width (default), which caps at 1280px.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 10: Page with Narrow Width */}
      <Page
        title="Narrow Width Page"
        subtitle="width='narrow' (caps at 1024px)"
        width="narrow"
        primaryAction={{ label: "Action", onClick: () => null }}
      >
        <Content>
          <Text>This page uses the narrow width, which caps at 1024px.</Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 11: Page with Fill Width */}
      <Page
        title="Fill Width Page"
        subtitle="width='fill' (grows to 100%)"
        width="fill"
        primaryAction={{ label: "Action", onClick: () => null }}
      >
        <Content>
          <Text>
            This page uses the fill width, which grows to 100% of its container.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 12: Page with Custom Title (ReactNode) */}
      <Page
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon name="clients" />
            <Heading level={1}>Custom Title with Icon</Heading>
          </div>
        }
        subtitle="Title can be any React node"
        primaryAction={{ label: "New Client", onClick: () => null }}
      >
        <Content>
          <Text>
            When passing a custom element as title, make sure to include an
            H1-level heading.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 13: Page with Disabled Actions */}
      <Page
        title="Page with Disabled Actions"
        subtitle="Actions can be disabled"
        primaryAction={{
          label: "Disabled Primary",
          onClick: () => null,
          disabled: true,
        }}
        secondaryAction={{
          label: "Disabled Secondary",
          onClick: () => null,
          disabled: true,
        }}
      >
        <Content>
          <Text>
            Actions can be disabled by passing the disabled prop to
            ButtonActionProps.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 14: Page with Loading Actions */}
      <Page
        title="Page with Loading State"
        subtitle="Actions can show loading state"
        primaryAction={{
          label: "Loading...",
          onClick: () => null,
          loading: true,
        }}
        secondaryAction={{ label: "Cancel", onClick: () => null }}
      >
        <Content>
          <Text>Primary action button can show a loading state.</Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 15: Page with Icon Button Actions */}
      <Page
        title="Page with Icon Buttons"
        subtitle="Actions can include icons"
        primaryAction={{
          label: "Save",
          icon: "checkmark",
          onClick: () => null,
        }}
        secondaryAction={{
          label: "Delete",
          icon: "remove",
          onClick: () => null,
          variation: "destructive",
        }}
      >
        <Content>
          <Text>
            Action buttons can include icons and use different button types.
          </Text>
        </Content>
      </Page>

      <Box padding="largest" />

      {/* Example 16: Complete Page - All Props Combined */}
      <Page
        title="Complete Example"
        titleMetaData={<Glimmer size="small" />}
        subtitle="Showcasing **all** _available_ props together"
        width="standard"
        primaryAction={{ label: "Create", icon: "add", onClick: () => null }}
        secondaryAction={{
          label: "Export",
          icon: "export",
          onClick: () => null,
        }}
        moreActionsMenu={[
          {
            actions: [
              { label: "Import", onClick: () => null },
              { label: "Settings", onClick: () => null },
              { label: "Help", onClick: () => null },
            ],
          },
        ]}
        intro="This comprehensive example combines all available props: **title**, titleMetaData, **subtitle**, width, actions, and intro with [markdown links](https://example.com)."
        externalIntroLinks={true}
      >
        <Content>
          <Text>
            This is the most complete example showing all Page component
            capabilities in one place. It includes title metadata, subtitle with
            markdown, intro section, all action types, and custom width.
          </Text>
        </Content>
      </Page>
      <Page
        title="Complete Example without externalIntroLinks"
        titleMetaData={<Glimmer size="small" />}
        subtitle="Showcasing **all** _available_ props together"
        width="standard"
        primaryAction={{ label: "Create", icon: "add", onClick: () => null }}
        secondaryAction={{
          label: "Export",
          icon: "export",
          onClick: () => null,
        }}
        moreActionsMenu={[
          {
            actions: [
              { label: "Import", onClick: () => null },
              { label: "Settings", onClick: () => null },
              { label: "Help", onClick: () => null },
            ],
          },
        ]}
        intro="This comprehensive example combines all available props: **title**, titleMetaData, **subtitle**, width, actions, and intro with [markdown links](https://example.com)."
        externalIntroLinks={false}
      >
        <Content>
          <Text>
            This is the most complete example showing all Page component
            capabilities in one place. It includes title metadata, subtitle with
            markdown, intro section, all action types, and custom width.
          </Text>
        </Content>
      </Page>
      <Box padding="largest" />

      {/* Composable: Basic */}
      <Page>
        <Page.Header>
          <Page.Title>Composable - Basic</Page.Title>
        </Page.Header>
        <Page.Body>
          <Text>Composable page with just a title and body content.</Text>
        </Page.Body>
      </Page>

      <Box padding="largest" />

      {/* Composable: With Actions and Menu */}
      <Page width="fill">
        <Page.Header>
          <Page.Title>Composable - With Actions</Page.Title>
          <Page.Actions>
            <Page.PrimaryAction label="New Client" onClick={() => null} />
            <Page.SecondaryAction label="Export" onClick={() => null} />
            <Page.Menu>
              <Menu.Item textValue="Import" onClick={() => null}>
                <Menu.ItemIcon name="import" />
                <Menu.ItemLabel>Import</Menu.ItemLabel>
              </Menu.Item>
              <Menu.Item textValue="Archive" onClick={() => null}>
                <Menu.ItemIcon name="archive" />
                <Menu.ItemLabel>Archive</Menu.ItemLabel>
              </Menu.Item>
            </Page.Menu>
          </Page.Actions>
        </Page.Header>
        <Page.Body>
          <Text>
            Composable page with primary action, secondary action, and a menu.
          </Text>
        </Page.Body>
      </Page>

      <Box padding="largest" />

      {/* Composable: Subtitle and Intro */}
      <Page>
        <Page.Header>
          <Page.Title>Composable - Subtitle and Intro</Page.Title>
          <Page.Subtitle>A subtitle with **markdown** support</Page.Subtitle>
        </Page.Header>
        <Page.Intro externalLinks={true}>
          This is an **intro** section that supports _markdown_ formatting and
          [external links](https://example.com).
        </Page.Intro>
        <Page.Body>
          <Text>
            Composable page with subtitle and intro text between header and
            body.
          </Text>
        </Page.Body>
      </Page>

      <Box padding="largest" />

      {/* Composable: All Pieces */}
      <Page width="standard">
        <Page.Header>
          <Page.Title
            metadata={
              <StatusLabel
                label="In Progress"
                alignment="start"
                status="warning"
              />
            }
          >
            Composable - All Pieces
          </Page.Title>
          <Page.Subtitle>A subtitle with **markdown** support</Page.Subtitle>
          <Page.Actions>
            <Page.PrimaryAction
              label="Create"
              icon="add"
              onClick={() => null}
            />
            <Page.SecondaryAction label="Export" onClick={() => null} />
            <Page.Menu>
              <Menu.Item textValue="Import" onClick={() => null}>
                <Menu.ItemIcon name="import" />
                <Menu.ItemLabel>Import</Menu.ItemLabel>
              </Menu.Item>
              <Menu.Item textValue="Settings" onClick={() => null}>
                <Menu.ItemIcon name="cog" />
                <Menu.ItemLabel>Settings</Menu.ItemLabel>
              </Menu.Item>
            </Page.Menu>
          </Page.Actions>
        </Page.Header>
        <Page.Body>
          <Text>
            Composable page showing all available sub-components together.
          </Text>
        </Page.Body>
      </Page>

      <Box padding="largest" />
    </Box>
  );
};
