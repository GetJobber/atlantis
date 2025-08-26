import { Box, Grid, Heading, Stack, Text, Toast } from "@jobber/components";

export const VisualTestToastPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Toast Examples</Heading>

        <Stack gap="large">
          {/* Basic Toast */}
          <section>
            <Text size="large">Basic Toast</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Toast message="This is a basic toast message" />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Toast Variations */}
          <section>
            <Text size="large">Toast Variations</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Toast message="Success message" variation="success" />
                  <Toast message="Error message" variation="error" />
                  <Toast message="Info message" variation="info" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Toast with Action */}
          <section>
            <Text size="large">Toast with Action</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Toast
                  message="Action toast message"
                  variation="info"
                  action={() => console.log("Toast action clicked")}
                  actionLabel="Undo"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multiple Toasts */}
          <section>
            <Text size="large">Multiple Toasts</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Toast message="First toast message" variation="success" />
                  <Toast message="Second toast message" variation="info" />
                  <Toast message="Third toast message" variation="error" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Long Message Toast */}
          <section>
            <Text size="large">Long Message Toast</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Toast
                  message="This is a very long toast message that demonstrates how the component handles text wrapping for longer content that might span multiple lines."
                  variation="info"
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
