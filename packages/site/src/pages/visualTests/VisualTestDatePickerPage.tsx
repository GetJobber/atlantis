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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2025, 5, 3),
  );

  // Inline DatePicker
  const [inlineDate, setInlineDate] = useState<Date | undefined>(
    new Date(2025, 5, 3),
  );

  const [restrictedDate, setRestrictedDate] = useState<Date | undefined>(
    new Date(2025, 8, 3),
  );

  const minDate = new Date(2025, 5, 3);
  const maxDate = new Date(2025, 8, 3);

  // DatePicker with highlighted dates
  const [highlightedDate, setHighlightedDate] = useState<Date | undefined>(
    new Date(2025, 8, 18),
  );
  const highlightDates = [
    new Date(2025, 5, 3),
    new Date(2025, 5, 7),
    new Date(2025, 5, 14),
  ];

  const [disabledDate, setDisabledDate] = useState<Date | undefined>(undefined);

  const [interactionTestDate, setInteractionTestDate] = useState<
    Date | undefined
  >(new Date(2025, 5, 15));
  const [positionTestDate, setPositionTestDate] = useState<Date | undefined>(
    new Date(2025, 5, 15),
  );

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>DatePicker Examples</Heading>

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
                    Only allows selecting dates between selected date and 3
                    months prior
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
                  activator={
                    <Button
                      label={
                        selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Full Width Datepicker"
                      }
                      type="primary"
                    />
                  }
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Interaction Test DatePicker */}
          <section>
            <Text size="large">Interaction Test</Text>
            <Text size="small">
              For testing keyboard navigation, hover effects, and focus
            </Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  data-testid="interaction-test-datepicker"
                  selected={interactionTestDate}
                  onChange={date => setInteractionTestDate(date)}
                  activator={
                    <Button
                      data-testid="interaction-test-activator"
                      label="Interaction Test"
                      type="secondary"
                    />
                  }
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Position Test DatePicker */}
          <section>
            <Text size="large">Position Test - Bottom Constraint</Text>
            <Text size="small">
              For testing positioning when insufficient space below
            </Text>
            <div style={{ height: "60vh" }} />
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DatePicker
                  data-testid="position-test-datepicker"
                  selected={positionTestDate}
                  onChange={date => setPositionTestDate(date)}
                  activator={
                    <Button
                      data-testid="position-test-activator"
                      label="Position Test"
                      type="secondary"
                    />
                  }
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
