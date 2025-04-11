import {
  Box,
  Grid,
  Heading,
  InlineLabel,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestInlineLabelPage = () => {
  const colors = [
    "greyBlue",
    "red",
    "orange",
    "green",
    "blue",
    "yellow",
    "lime",
    "purple",
    "pink",
    "teal",
    "yellowGreen",
    "blueDark",
    "lightBlue",
    "indigo",
  ] as const;

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>InlineLabel Examples</Heading>

        <Stack space="large">
          {/* Basic InlineLabel */}
          <section>
            <Text size="large">Basic InlineLabel</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  <InlineLabel>Default Label</InlineLabel>
                  <InlineLabel color="green">Success Label</InlineLabel>
                  <InlineLabel color="red">Error Label</InlineLabel>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Different Sizes */}
          <section>
            <Text size="large">Different Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  <InlineLabel size="base">Base Size</InlineLabel>
                  <InlineLabel size="large">Large Size</InlineLabel>
                  <InlineLabel size="larger">Larger Size</InlineLabel>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* All Colors */}
          <section>
            <Text size="large">All Colors</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  {colors.map(color => (
                    <InlineLabel key={color} color={color}>
                      {color} Label
                    </InlineLabel>
                  ))}
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
