import { Box, Grid, Heading, InputDate, Stack, Text } from "@jobber/components";
import { useState } from "react";

export const VisualTestInputDatePage = () => {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>();
  const [date3, setDate3] = useState<Date | undefined>();
  const [date4, setDate4] = useState<Date | undefined>();

  const today = new Date(2025, 3, 11); // Months are 0-indexed, so 3 is April
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>InputDate Examples</Heading>

        <Stack gap="large">
          {/* Basic InputDate */}
          <section>
            <Text size="large">Basic InputDate</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputDate
                  value={date1}
                  onChange={setDate1}
                  placeholder="MM/DD/YYYY"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputDate with min/max dates */}
          <section>
            <Text size="large">InputDate with min/max dates</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputDate
                  value={date2}
                  onChange={setDate2}
                  minDate={today}
                  maxDate={nextWeek}
                  placeholder="MM/DD/YYYY"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputDate with validation */}
          <section>
            <Text size="large">InputDate with validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputDate
                  value={date3}
                  onChange={setDate3}
                  placeholder="MM/DD/YYYY"
                  invalid={!date3}
                  description={!date3 ? "Please select a date" : undefined}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputDate states */}
          <section>
            <Text size="large">InputDate states</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <InputDate
                    value={date4}
                    onChange={setDate4}
                    disabled={true}
                    placeholder="MM/DD/YYYY"
                  />
                  <InputDate
                    value={new Date(2025, 3, 11)}
                    onChange={setDate4}
                    readOnly={true}
                    placeholder="MM/DD/YYYY"
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
