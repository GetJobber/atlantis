import { Box, Grid, Heading, Stack, Switch, Text } from "@jobber/components";
import { useState } from "react";

export const VisualTestSwitchPage = () => {
  const [basicValue, setBasicValue] = useState(false);
  const [namedValue, setNamedValue] = useState(false);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Switch Examples</Heading>

        <Stack gap="large">
          {/* Basic Switch */}
          <section>
            <Text size="large">Basic Switch</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Switch
                  value={basicValue}
                  onChange={setBasicValue}
                  ariaLabel="Toggle notifications"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Switch with Name */}
          <section>
            <Text size="large">Switch with Name</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <label htmlFor="namedSwitch">Enable notifications</label>
                <Switch
                  value={namedValue}
                  onChange={setNamedValue}
                  name="namedSwitch"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Switch States */}
          <section>
            <Text size="large">Switch States</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Box>
                    <Text>Disabled (Off):</Text>
                    <Switch
                      value={false}
                      disabled={true}
                      ariaLabel="Disabled switch off"
                    />
                  </Box>
                  <Box>
                    <Text>Disabled (On):</Text>
                    <Switch
                      value={true}
                      disabled={true}
                      ariaLabel="Disabled switch on"
                    />
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
