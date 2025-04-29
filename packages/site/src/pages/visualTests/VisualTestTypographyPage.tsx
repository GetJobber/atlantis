import {
  Box,
  Grid,
  Heading,
  Stack,
  Text,
  Typography,
} from "@jobber/components";

export const VisualTestTypographyPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Typography Examples</Heading>

        <Stack gap="large">
          {/* Basic Typography */}
          <section>
            <Text size="large">Basic Typography</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="h1">Heading 1</Typography>
                  <Typography element="h2">Heading 2</Typography>
                  <Typography element="h3">Heading 3</Typography>
                  <Typography element="h4">Heading 4</Typography>
                  <Typography element="h5">Heading 5</Typography>
                  <Typography element="h6">Heading 6</Typography>
                  <Typography element="p">Paragraph text</Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Font Weights */}
          <section>
            <Text size="large">Typography Font Weights</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" fontWeight="regular">
                    Regular weight text
                  </Typography>
                  <Typography element="p" fontWeight="bold">
                    Bold weight text
                  </Typography>
                  <Typography element="p" fontWeight="extraBold">
                    Extra bold text
                  </Typography>
                  <Typography element="p" fontWeight="black">
                    Black weight text
                  </Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Text Cases */}
          <section>
            <Text size="large">Typography Text Cases</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" textCase="uppercase">
                    Uppercase text
                  </Typography>
                  <Typography element="p" textCase="lowercase">
                    Lowercase text
                  </Typography>
                  <Typography element="p" textCase="capitalize">
                    Capitalized text
                  </Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Text Colors */}
          <section>
            <Text size="large">Typography Text Colors</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" textColor="success">
                    Success color text
                  </Typography>
                  <Typography element="p" textColor="error">
                    Error color text
                  </Typography>
                  <Typography element="p" textColor="warning">
                    Warning color text
                  </Typography>
                  <Typography element="p" textColor="info">
                    Info color text
                  </Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Emphasis */}
          <section>
            <Text size="large">Typography Emphasis</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" emphasisType="strong">
                    Strong emphasis
                  </Typography>
                  <Typography element="p" emphasisType="subtle">
                    Subtle emphasis
                  </Typography>
                  <Typography element="em">Italic emphasis</Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Alignment */}
          <section>
            <Text size="large">Typography Alignment</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" align="start">
                    Start aligned text
                  </Typography>
                  <Typography element="p" align="center">
                    Center aligned text
                  </Typography>
                  <Typography element="p" align="end">
                    End aligned text
                  </Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography Line Limits */}
          <section>
            <Text size="large">Typography Line Limits</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Box width={300}>
                  <Typography element="p" numberOfLines={2}>
                    This is a long text that will be limited to two lines. It
                    demonstrates how the Typography component handles text
                    truncation when the content exceeds the specified number of
                    lines.
                  </Typography>
                </Box>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Typography with Underline */}
          <section>
            <Text size="large">Typography with Underline</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <Stack gap="base">
                  <Typography element="p" underline="solid">
                    Solid underline
                  </Typography>
                  <Typography element="p" underline="double">
                    Double underline
                  </Typography>
                  <Typography element="p" underline="dashed">
                    Dashed underline
                  </Typography>
                  <Typography element="p" underline="solid color-success">
                    Colored underline
                  </Typography>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
