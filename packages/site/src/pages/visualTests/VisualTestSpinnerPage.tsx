import { Box, Grid, Heading, Spinner, Stack, Text } from "@jobber/components";

export const VisualTestSpinnerPage = () => {
  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>Spinner Examples</Heading>

        <Stack space="large">
          {/* Basic Spinner */}
          <section>
            <Text size="large">Basic Spinner</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Spinner />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Spinner Sizes */}
          <section>
            <Text size="large">Spinner Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="base">
                  <Box>
                    <Text>Small:</Text>
                    <Spinner size="small" />
                  </Box>
                  <Box>
                    <Text>Base:</Text>
                    <Spinner size="base" />
                  </Box>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Inline Spinner */}
          <section>
            <Text size="large">Inline Spinner</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Text>
                  Loading
                  <Spinner inline={true} size="small" />
                  please wait
                </Text>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
