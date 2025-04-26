import { Box, Grid, Heading, Link, Stack, Text } from "@jobber/components";

export const VisualTestLinkPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Link Examples</Heading>

        <Stack gap="large">
          {/* Basic Link */}
          <section>
            <Text size="large">Basic Link</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Link url="https://example.com">Visit Example.com</Link>
              </Grid.Cell>
            </Grid>
          </section>

          {/* External Link */}
          <section>
            <Text size="large">External Link</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Link url="https://example.com" external={true}>
                  External Link
                </Link>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Link with ARIA label */}
          <section>
            <Text size="large">Link with ARIA label</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Link
                  url="https://example.com"
                  ariaLabel="Visit Example.com website"
                >
                  Visit Website
                </Link>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Link with ARIA expanded */}
          <section>
            <Text size="large">Link with ARIA expanded</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Link url="#" ariaExpanded={true} ariaLabel="Expanded section">
                  Expanded Link
                </Link>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Link in text context */}
          <section>
            <Text size="large">Link in text context</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Text>
                  This is a paragraph with a{" "}
                  <Link url="https://example.com">link</Link> in the middle of
                  the text.
                </Text>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
