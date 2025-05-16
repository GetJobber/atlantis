import { Box, Grid, Heading, Stack, Text } from "@jobber/components";

export const VisualTestGridPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Grid Examples</Heading>

        <Stack gap="large">
          {/* Basic Grid */}
          <section>
            <Text size="large">Basic Grid</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 1</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 2</Text>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Three Column Grid */}
          <section>
            <Text size="large">Three Column Grid (50/25/25 Split)</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 1 (50%)</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 2 (25%)</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 3 (25%)</Text>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Grid with Different Alignments */}
          <section>
            <Text size="large">Grid with Different Alignments</Text>
            <Grid alignItems="center">
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="large">
                  <Text>Tall Column</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="small">
                  <Text>Short Column</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="base">
                  <Text>Medium Column</Text>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Grid without Gap */}
          <section>
            <Text size="large">Grid without Gap</Text>
            <Grid gap={false}>
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 1</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 2</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 4 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 3</Text>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Responsive Grid */}
          <section>
            <Text size="large">Responsive Grid</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 1</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 2</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 3</Text>
                </Box>
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box background="surface--background" padding="small">
                  <Text>Column 4</Text>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
