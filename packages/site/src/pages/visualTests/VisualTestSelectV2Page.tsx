import { Box, Grid, Heading, Stack, Text } from "@jobber/components";
import { Option, Select } from "@jobber/components/Select";
import { useState } from "react";

export const VisualTestSelectV2Page = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [customSelectedValue, setCustomSelectedValue] = useState("");

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Select V2 Examples</Heading>

        <Stack gap="large">
          {/* Basic Select */}
          <section>
            <Text size="large">Basic Select</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Select
                  version={2}
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
                  version={2}
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
                  <Select version={2} placeholder="Invalid state" invalid>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select version={2} placeholder="Disabled state" disabled>
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
                  <Select version={2} placeholder="Small size" size="small">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select version={2} placeholder="Large size" size="large">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Select with Prefix/Suffix */}
          <section>
            <Text size="large">Select with Prefix/Suffix</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Select
                    version={2}
                    placeholder="With prefix"
                    prefix={{ icon: "search" }}
                  >
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select
                    version={2}
                    placeholder="With suffix"
                    suffix={{ icon: "sparkles" }}
                  >
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select
                    version={2}
                    placeholder="With prefix and suffix"
                    prefix={{ label: "Pre" }}
                    suffix={{ label: "Suf" }}
                  >
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Alignment and Inline */}
          <section>
            <Text size="large">Alignment and Inline</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  <Select version={2} placeholder="Right aligned" align="right">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select
                    version={2}
                    placeholder="Center aligned"
                    align="center"
                  >
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>

                  <Select version={2} placeholder="Inline" inline>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Custom Select (enableCustomSelect) */}
          <section>
            <Text size="large">Custom Select (enableCustomSelect)</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="base">
                  {/* Basic custom select */}
                  <Select
                    version={2}
                    enableCustomSelect
                    value={customSelectedValue}
                    onChange={value => setCustomSelectedValue(value as string)}
                    placeholder="Custom select"
                  >
                    <Option value="a">Alpha</Option>
                    <Option value="b">Beta</Option>
                    <Option value="g">Gamma</Option>
                  </Select>

                  {/* Custom select with description */}
                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="With description"
                    description="This is a custom select"
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  {/* Custom select: invalid + disabled */}
                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Invalid custom select"
                    invalid
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Disabled custom select"
                    disabled
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  {/* Sizes */}
                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Small custom select"
                    size="small"
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Large custom select"
                    size="large"
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  {/* Affixes */}
                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Prefix"
                    prefix={{ icon: "search" }}
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Suffix"
                    suffix={{ icon: "sparkles" }}
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Prefix + Suffix"
                    prefix={{ label: "Pre" }}
                    suffix={{ label: "Suf" }}
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>

                  {/* Inline */}
                  <Select
                    version={2}
                    enableCustomSelect
                    placeholder="Inline custom select"
                    inline
                  >
                    <Option value="1">One</Option>
                    <Option value="2">Two</Option>
                  </Select>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
