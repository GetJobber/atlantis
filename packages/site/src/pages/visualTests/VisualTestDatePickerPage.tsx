import {
  Box,
  Button,
  DatePicker,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestDatePickerPage = () => {
  // Basic DatePicker
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Inline DatePicker
  const [inlineDate, setInlineDate] = useState<Date | undefined>(undefined);

  // DatePicker with min/max dates
  const [restrictedDate, setRestrictedDate] = useState<Date | undefined>(
    undefined,
  );
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // DatePicker with highlighted dates
  const [highlightedDate, setHighlightedDate] = useState<Date | undefined>(
    undefined,
  );
  const highlightDates = [
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 7)),
    new Date(new Date().setDate(new Date().getDate() + 14)),
  ];

  // Disabled DatePicker
  const [disabledDate, setDisabledDate] = useState<Date | undefined>(undefined);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>DatePicker Examples</Heading>

        <Stack gap="large">
          {/* Basic DatePicker */}
          <section>
            <Text size="large">Basic DatePicker</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Inline DatePicker */}
          <section>
            <Text size="large">Inline DatePicker</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  inline={true}
                  selected={inlineDate}
                  onChange={date => setInlineDate(date)}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Custom Activator */}
          <section>
            <Text size="large">Custom Activator</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  activator={
                    <Button
                      label={
                        selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Pick a date"
                      }
                      type="secondary"
                    />
                  }
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Date Range Restrictions */}
          <section>
            <Text size="large">Date Range Restrictions</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack>
                  <Text>
                    Only allows selecting dates between today and 3 months from
                    now
                  </Text>
                  <DatePicker
                    selected={restrictedDate}
                    onChange={date => setRestrictedDate(date)}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Highlighted Dates */}
          <section>
            <Text size="large">Highlighted Dates</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack>
                  <Text>Highlights dates at 3, 7, and 14 days from today</Text>
                  <DatePicker
                    selected={highlightedDate}
                    onChange={date => setHighlightedDate(date)}
                    highlightDates={highlightDates}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Disabled DatePicker */}
          <section>
            <Text size="large">Disabled DatePicker</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  selected={disabledDate}
                  onChange={date => setDisabledDate(date)}
                  disabled={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Full Width DatePicker */}
          <section>
            <Text size="large">Full Width DatePicker</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  fullWidth={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Read-only DatePicker */}
          <section>
            <Text size="large">Read-only DatePicker</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  selected={new Date()}
                  onChange={date => console.log(date)}
                  readonly={true}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
