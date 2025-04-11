import { Box, Grid, Heading, InputTime, Stack, Text } from "@jobber/components";
import { useState } from "react";

export const VisualTestInputTimePage = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>InputTime Examples</Heading>

        <Stack space="large">
          {/* Basic InputTime */}
          <section>
            <Text size="large">Basic InputTime</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  placeholder="Select time"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputTime with validation */}
          <section>
            <Text size="large">InputTime with validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  placeholder="Required time"
                  validations={{ required: "This field is required" }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputTime with description */}
          <section>
            <Text size="large">InputTime with description</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  placeholder="With description"
                  description="Please select a time"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Disabled InputTime */}
          <section>
            <Text size="large">Disabled InputTime</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  value={new Date()}
                  onChange={newValue => setValue(newValue)}
                  disabled={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputTime with default value */}
          <section>
            <Text size="large">InputTime with default value</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  defaultValue={new Date()}
                  onChange={newValue => setValue(newValue)}
                  placeholder="With default value"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputTime with clearable */}
          <section>
            <Text size="large">InputTime with clearable</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputTime
                  value={value}
                  onChange={newValue => setValue(newValue)}
                  placeholder="Clearable time"
                  clearable="always"
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
