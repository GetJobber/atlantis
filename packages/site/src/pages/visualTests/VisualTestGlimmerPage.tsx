import { Box, Glimmer, Grid, Heading, Stack, Text } from "@jobber/components";

export const VisualTestGlimmerPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Glimmer Examples</Heading>

        <Stack gap="large">
          {/* Basic Glimmer */}
          <section>
            <Text size="large">Basic Glimmer</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Glimmer />
                  <Glimmer width={200} />
                  <Glimmer size="small" />
                  <Glimmer size="large" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Different Shapes */}
          <section>
            <Text size="large">Different Shapes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Glimmer shape="rectangle" />
                  <Glimmer shape="circle" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Different Timings */}
          <section>
            <Text size="large">Different Timings</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Glimmer timing="slow" />
                  <Glimmer timing="base" />
                  <Glimmer timing="fast" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Reverse Theme */}
          <section>
            <Text size="large">Reverse Theme</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box background="surface--reverse" padding="small">
                  <Stack gap="small">
                    <Glimmer reverseTheme={true} />
                    <Glimmer.Header reverseTheme={true} />
                    <Glimmer.Text reverseTheme={true} />
                    <Glimmer.Button reverseTheme={true} />
                  </Stack>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Semantic Blocks */}
          <section>
            <Text size="large">Semantic Blocks</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Glimmer.Header level={1} />
                  <Glimmer.Header level={3} />
                  <Glimmer.Text lines={1} />
                  <Glimmer.Text lines={2} />
                  <Glimmer.Text lines={3} />
                  <Glimmer.Button />
                  <Glimmer.Button fullWidth={true} />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Auto Size */}
          <section>
            <Text size="large">Auto Size</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Box height={200}>
                  <Glimmer size="auto" shape="rectangle" />
                </Box>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
