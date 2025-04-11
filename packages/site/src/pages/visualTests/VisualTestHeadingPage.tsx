import { Box, Grid, Heading, Stack, Text } from "@jobber/components";

export const VisualTestHeadingPage = () => {
  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>Heading Examples</Heading>

        <Stack space="large">
          {/* Different Heading Levels */}
          <section>
            <Text size="large">Different Heading Levels</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack space="small">
                  <Heading level={1}>Heading Level 1</Heading>
                  <Text variation="subdued">Main subject of the page</Text>

                  <Heading level={2}>Heading Level 2</Heading>
                  <Text variation="subdued">
                    Categorize large groups of content
                  </Text>

                  <Heading level={3}>Heading Level 3</Heading>
                  <Text variation="subdued">
                    Group content and forms on a single topic
                  </Text>

                  <Heading level={4}>Heading Level 4</Heading>
                  <Text variation="subdued">
                    Used inside a card component or after level 3
                  </Text>

                  <Heading level={5}>Heading Level 5</Heading>
                  <Text variation="subdued">Used after level 4 heading</Text>

                  <Heading level={6}>HEADING LEVEL 6</Heading>
                  <Text variation="subdued">
                    Used for small lists or after level 5
                  </Text>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Custom Elements */}
          <section>
            <Text size="large">Custom Elements</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack space="small">
                  <Heading level={2} element="h1">
                    Visual Level 2, Semantic Level 1
                  </Heading>
                  <Text variation="subdued">
                    Using element=&quot;h1&quot; for semantic meaning while
                    keeping level 2 styling
                  </Text>

                  <Heading level={3} element="h2">
                    Visual Level 3, Semantic Level 2
                  </Heading>
                  <Text variation="subdued">
                    Using element=&quot;h2&quot; for semantic meaning while
                    keeping level 3 styling
                  </Text>

                  <Heading level={4} element="p">
                    Visual Level 4, Paragraph Element
                  </Heading>
                  <Text variation="subdued">
                    Using element=&quot;p&quot; when heading styling is needed
                    without semantic meaning
                  </Text>

                  <Heading level={5} element="span">
                    Visual Level 5, Span Element
                  </Heading>
                  <Text variation="subdued">
                    Using element=&quot;span&quot; for inline heading styling
                  </Text>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Heading in Context */}
          <section>
            <Text size="large">Heading in Context</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack space="large">
                  <Box background="surface--background" padding="large">
                    <Stack space="small">
                      <Heading level={2}>Job Details</Heading>
                      <Stack space="base">
                        <Heading level={3}>Client Information</Heading>
                        <Text>Client details would go here</Text>
                      </Stack>
                      <Stack space="base">
                        <Heading level={3}>Property Details</Heading>
                        <Text>Property information would go here</Text>
                      </Stack>
                      <Stack space="base">
                        <Heading level={4}>Additional Notes</Heading>
                        <Text>Any extra information about the job</Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
