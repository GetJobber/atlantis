import {
  Box,
  Content,
  Divider,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestDividerPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Divider Examples</Heading>

        <Stack gap="large">
          {/* Basic Divider */}
          <section>
            <Text size="large">Basic Divider</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Content>
                  <Text>Content above the divider</Text>
                  <Divider />
                  <Text>Content below the divider</Text>
                </Content>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Different Sizes */}
          <section>
            <Text size="large">Different Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Content>
                  <Text>Small size divider</Text>
                  <Divider size="small" />
                  <Text>Base size divider (default)</Text>
                  <Divider size="base" />
                  <Text>Large size divider</Text>
                  <Divider size="large" />
                </Content>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Different Directions */}
          <section>
            <Text size="large">Different Directions</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Content>
                  <Stack align="center" gap="small">
                    <Text>Left</Text>
                    <Box padding="small">
                      <Divider direction="vertical" />
                    </Box>
                    <Text>Right</Text>
                  </Stack>
                  <Text>Horizontal divider (default)</Text>
                  <Divider direction="horizontal" />
                  <Text>More content</Text>
                </Content>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Divider in Card Context */}
          <section>
            <Text size="large">Divider in Different Contexts</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Content>
                  <Stack gap="small">
                    <Text>First section</Text>
                    <Divider />
                    <Text>Second section</Text>
                    <Divider size="large" />
                    <Text>Third section</Text>
                  </Stack>
                </Content>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
