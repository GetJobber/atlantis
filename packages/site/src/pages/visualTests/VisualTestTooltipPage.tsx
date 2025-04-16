import {
  Box,
  Button,
  Grid,
  Heading,
  Stack,
  Text,
  Tooltip,
} from "@jobber/components";

export const VisualTestTooltipPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Tooltip Examples</Heading>

        <Stack gap="large">
          {/* Basic Tooltip */}
          <section>
            <Text size="large">Basic Tooltip</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Tooltip message="This is a basic tooltip">
                  <Button label="Hover me" />
                </Tooltip>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Tooltip Positions */}
          <section>
            <Text size="large">Tooltip Positions</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Tooltip message="Top tooltip" preferredPlacement="top">
                    <Button label="Top" />
                  </Tooltip>
                  <Tooltip message="Bottom tooltip" preferredPlacement="bottom">
                    <Button label="Bottom" />
                  </Tooltip>
                  <Tooltip message="Left tooltip" preferredPlacement="left">
                    <Button label="Left" />
                  </Tooltip>
                  <Tooltip message="Right tooltip" preferredPlacement="right">
                    <Button label="Right" />
                  </Tooltip>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Tooltip with Tab Index */}
          <section>
            <Text size="large">Tooltip with Tab Index</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Tooltip message="Default tooltip with tab index">
                    <Button label="With Tab Index" />
                  </Tooltip>
                  <Tooltip
                    message="Tooltip without tab index"
                    setTabIndex={false}
                  >
                    <Button label="Without Tab Index" />
                  </Tooltip>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Long Message Tooltip */}
          <section>
            <Text size="large">Long Message Tooltip</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Tooltip message="This is a very long tooltip message that demonstrates how the component handles text wrapping for longer content that might span multiple lines.">
                  <Button label="Long Message" />
                </Tooltip>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
