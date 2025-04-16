import { Box, Grid, Heading, Stack, Text } from "@jobber/components";
import { Option, Select } from "@jobber/components/Select";
import { useState } from "react";

export const VisualTestSelectPage = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Select Examples</Heading>

        <Stack gap="large">
          {/* Basic Select */}
          <section>
            <Text size="large">Basic Select</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Select
                  value={selectedValue}
                  onChange={value => setSelectedValue(value as string)}
                  placeholder="Choose an option"
                >
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Select with Description */}
          <section>
            <Text size="large">Select with Description</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Select
                  placeholder="Choose a fruit"
                  description="Select your favorite fruit"
                >
                  <Option value="apple">Apple</Option>
                  <Option value="banana">Banana</Option>
                  <Option value="orange">Orange</Option>
                </Select>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Select States */}
          <section>
            <Text size="large">Select States</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Select placeholder="Invalid state" invalid>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select placeholder="Disabled state" disabled>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select placeholder="Loading state" loading>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Select Sizes */}
          <section>
            <Text size="large">Select Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Select placeholder="Small size" size="small">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select placeholder="Large size" size="large">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Select with Validation */}
          <section>
            <Text size="large">Select with Validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Select
                  placeholder="Required field"
                  validations={{ required: "This field is required" }}
                >
                  <Option value="1">Option 1</Option>
                  <Option value="2">Option 2</Option>
                </Select>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
