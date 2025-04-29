import { Box, Grid, Heading, List, Stack, Text } from "@jobber/components";

export const VisualTestListPage = () => {
  const basicItems = [
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
    { id: 4, content: "Item 4" },
    { id: 5, content: "Item 5" },
  ];

  const complexItems = [
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
    { id: 3, title: "Task 3", description: "Description 3" },
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>List Examples</Heading>

        <Stack gap="large">
          {/* Basic List */}
          <section>
            <Text size="large">Basic List</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <List items={basicItems} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* List with Custom Render */}
          <section>
            <Text size="large">List with Custom Render</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <List
                  items={complexItems}
                  customRenderItem={item => (
                    <Stack gap="small">
                      <Text size="base">{item.title}</Text>
                      <Text variation="subdued">{item.description}</Text>
                    </Stack>
                  )}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* List with Custom Styles */}
          <section>
            <Text size="large">List with Custom Styles</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <List
                  items={basicItems}
                  customRenderItem={item => (
                    <Box background="blue" padding="small">
                      <Text variation="subdued">{item.content}</Text>
                    </Box>
                  )}
                  customItemStyles={true}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
