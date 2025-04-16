import { Box, Grid, Heading, Stack, Tab, Tabs, Text } from "@jobber/components";

export const VisualTestTabsPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Tabs Examples</Heading>

        <Stack gap="large">
          {/* Basic Tabs */}
          <section>
            <Text size="large">Basic Tabs</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Tabs defaultTab={0}>
                  <Tab label="Tab 1">
                    <Box padding="base">
                      <Text>Content for Tab 1</Text>
                    </Box>
                  </Tab>
                  <Tab label="Tab 2">
                    <Box padding="base">
                      <Text>Content for Tab 2</Text>
                    </Box>
                  </Tab>
                  <Tab label="Tab 3">
                    <Box padding="base">
                      <Text>Content for Tab 3</Text>
                    </Box>
                  </Tab>
                </Tabs>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Controlled Tabs */}
          <section>
            <Text size="large">Controlled Tabs</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Tabs
                  activeTab={1}
                  onTabChange={index => console.log("Tab changed to:", index)}
                >
                  <Tab label="First Tab">
                    <Box padding="base">
                      <Text>Content for First Tab</Text>
                    </Box>
                  </Tab>
                  <Tab label="Second Tab">
                    <Box padding="base">
                      <Text>Content for Second Tab</Text>
                    </Box>
                  </Tab>
                  <Tab label="Third Tab">
                    <Box padding="base">
                      <Text>Content for Third Tab</Text>
                    </Box>
                  </Tab>
                </Tabs>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Tabs with Complex Content */}
          <section>
            <Text size="large">Tabs with Complex Content</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Tabs defaultTab={0}>
                  <Tab label="Details">
                    <Box padding="base">
                      <Stack gap="small">
                        <Text>Detailed information goes here</Text>
                        <Text variation="subdued">
                          Additional details can be added
                        </Text>
                      </Stack>
                    </Box>
                  </Tab>
                  <Tab label="Settings">
                    <Box padding="base">
                      <Stack gap="small">
                        <Text>Settings panel content</Text>
                        <Text variation="subdued">
                          Configure your preferences
                        </Text>
                      </Stack>
                    </Box>
                  </Tab>
                  <Tab label="History">
                    <Box padding="base">
                      <Stack gap="small">
                        <Text>History and activity</Text>
                        <Text variation="subdued">
                          View past actions and changes
                        </Text>
                      </Stack>
                    </Box>
                  </Tab>
                </Tabs>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
