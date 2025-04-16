import { Box, Emphasis, Grid, Heading, Stack, Text } from "@jobber/components";

export const VisualTestEmphasisPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Emphasis Examples</Heading>

        <Stack gap="large">
          {/* Bold Emphasis */}
          <section>
            <Text size="large">Bold Emphasis</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Text>
                    <Emphasis variation="bold">Save $240</Emphasis> when you
                    choose our Annual Plan
                  </Text>
                  <Text>
                    This is a sentence with{" "}
                    <Emphasis variation="bold">multiple bold words</Emphasis> to
                    show emphasis.
                  </Text>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Italic Emphasis */}
          <section>
            <Text size="large">Italic Emphasis</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Text>
                    Simon&apos;s here to show{" "}
                    <Emphasis variation="italic">you</Emphasis> how Jobber
                    works.
                  </Text>
                  <Text>
                    The word <Emphasis variation="italic">emphasis</Emphasis>{" "}
                    itself is emphasized here.
                  </Text>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Highlight Emphasis */}
          <section>
            <Text size="large">Highlight Emphasis</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Heading level={1}>
                    Get paid <Emphasis variation="highlight">faster</Emphasis>
                  </Heading>
                  <Heading level={2}>
                    Work <Emphasis variation="highlight">smarter</Emphasis>, not
                    harder
                  </Heading>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Mixed Emphasis */}
          <section>
            <Text size="large">Mixed Emphasis</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Text>
                    The <Emphasis variation="bold">important</Emphasis> thing to
                    remember is to use{" "}
                    <Emphasis variation="italic">appropriate</Emphasis>{" "}
                    emphasis.
                  </Text>
                  <Heading level={3}>
                    Make your business{" "}
                    <Emphasis variation="highlight">stand out</Emphasis> with{" "}
                    <Emphasis variation="bold">professional</Emphasis> service
                  </Heading>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
