import { Box, Content, Page, Text } from "@jobber/components";

export const VisualTestPagePage = () => {
  return (
    <Box padding="large">
      <Page
        title="Clients"
        subtitle="Filtered clients"
        primaryAction={{ label: "New Client", onClick: () => null }}
        secondaryAction={{ label: "More Actions", onClick: () => null }}
        moreActionsMenu={[
          { actions: [{ label: "Import", onClick: () => null }] },
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
    </Box>
  );
};
