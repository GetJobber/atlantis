import {
  Box,
  Grid,
  Heading,
  Icon,
  SegmentedControl,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestSegmentedControlPage = () => {
  const [selectedView, setSelectedView] = useState<string | number>("day");
  const [selectedSize, setSelectedSize] = useState<string | number>("small");

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>SegmentedControl Examples</Heading>

        <Stack gap="large">
          {/* Basic SegmentedControl */}
          <section>
            <Text size="large">Basic SegmentedControl</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <SegmentedControl
                  selectedValue={selectedView}
                  onSelectValue={setSelectedView}
                >
                  <SegmentedControl.Option value="day">
                    Day
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="week">
                    Week
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="month">
                    Month
                  </SegmentedControl.Option>
                </SegmentedControl>
              </Grid.Cell>
            </Grid>
          </section>

          {/* SegmentedControl with Icons */}
          <section>
            <Text size="large">SegmentedControl with Icons</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <SegmentedControl defaultValue="calendar">
                  <SegmentedControl.Option
                    value="calendar"
                    ariaLabel="Calendar"
                  >
                    <Icon name="calendar" />
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="phone" ariaLabel="Phone">
                    <Icon name="phone" />
                  </SegmentedControl.Option>
                  <SegmentedControl.Option
                    value="availability"
                    ariaLabel="Availability"
                  >
                    <Icon name="availability" />
                  </SegmentedControl.Option>
                </SegmentedControl>
              </Grid.Cell>
            </Grid>
          </section>

          {/* SegmentedControl Sizes */}
          <section>
            <Text size="large">SegmentedControl Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <SegmentedControl
                    selectedValue={selectedSize}
                    onSelectValue={setSelectedSize}
                    size="small"
                  >
                    <SegmentedControl.Option value="small">
                      Small
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="medium">
                      Medium
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="large">
                      Large
                    </SegmentedControl.Option>
                  </SegmentedControl>

                  <SegmentedControl defaultValue="base" size="base">
                    <SegmentedControl.Option value="small">
                      Small
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="medium">
                      Medium
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="large">
                      Large
                    </SegmentedControl.Option>
                  </SegmentedControl>

                  <SegmentedControl defaultValue="large" size="large">
                    <SegmentedControl.Option value="small">
                      Small
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="medium">
                      Medium
                    </SegmentedControl.Option>
                    <SegmentedControl.Option value="large">
                      Large
                    </SegmentedControl.Option>
                  </SegmentedControl>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* SegmentedControl with Maximum Options */}
          <section>
            <Text size="large">SegmentedControl with Maximum Options</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <SegmentedControl defaultValue="option1">
                  <SegmentedControl.Option value="option1">
                    Option 1
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="option2">
                    Option 2
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="option3">
                    Option 3
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="option4">
                    Option 4
                  </SegmentedControl.Option>
                  <SegmentedControl.Option value="option5">
                    Option 5
                  </SegmentedControl.Option>
                </SegmentedControl>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
