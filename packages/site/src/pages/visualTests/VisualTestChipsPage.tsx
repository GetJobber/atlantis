import { Box, Chips, Grid, Heading, Stack, Text } from "@jobber/components";
import { Chip } from "@jobber/components/Chips";
import { useState } from "react";

export const VisualTestChipsPage = () => {
  const [singleSelected, setSingleSelected] = useState<string>();
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [dismissibleSelected, setDismissibleSelected] = useState<string[]>([
    "Alice Johnson",
    "Bob Smith",
  ]);
  const [noSuffixSelected, setNoSuffixSelected] = useState<string[]>([]);
  const [loadingSelected, setLoadingSelected] = useState<string[]>([
    "Charlie Brown",
    "David Wilson",
  ]);

  const singleSelectOptions = [
    "High Priority",
    "Medium Priority",
    "Low Priority",
  ];

  const multiSelectOptions = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Landscaping",
    "Cleaning",
  ];

  const teamMembers = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David Wilson",
    "Eve Anderson",
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Chips Examples</Heading>

        <Stack gap="large">
          {/* Single Select Chips */}
          <section>
            <Text size="large">Single Select Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Chips
                  type="singleselect"
                  selected={singleSelected}
                  onChange={value => setSingleSelected(value)}
                >
                  {singleSelectOptions.map(option => (
                    <Chip key={option} label={option} value={option} />
                  ))}
                </Chips>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multi Select Chips */}
          <section>
            <Text size="large">Multi Select Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Chips
                  type="multiselect"
                  selected={multiSelected}
                  onChange={value => setMultiSelected(value as string[])}
                >
                  {multiSelectOptions.map(option => (
                    <Chip key={option} label={option} value={option} />
                  ))}
                </Chips>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Dismissible Chips */}
          <section>
            <Text size="large">Dismissible Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Chips
                  type="dismissible"
                  selected={dismissibleSelected}
                  onChange={value => setDismissibleSelected(value as string[])}
                  onSearch={searchValue => {
                    console.log("Searching for:", searchValue);
                  }}
                  onCustomAdd={value => {
                    setDismissibleSelected(prev => [...prev, value]);
                  }}
                >
                  {teamMembers.map(member => (
                    <Chip key={member} label={member} value={member} />
                  ))}
                </Chips>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Chips without Selected Suffix */}
          <section>
            <Text size="large">Chips without Selected Suffix</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Chips
                  type="multiselect"
                  selected={noSuffixSelected}
                  onChange={value => setNoSuffixSelected(value as string[])}
                  showSelectedSuffix={false}
                >
                  {multiSelectOptions.map(option => (
                    <Chip key={option} label={option} value={option} />
                  ))}
                </Chips>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Chips with Loading State */}
          <section>
            <Text size="large">Chips with Loading State</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Chips
                  type="dismissible"
                  selected={loadingSelected}
                  onChange={value => setLoadingSelected(value as string[])}
                  isLoadingMore={true}
                  onLoadMore={searchValue => {
                    console.log("Loading more with search:", searchValue);
                  }}
                >
                  {teamMembers.map(member => (
                    <Chip key={member} label={member} value={member} />
                  ))}
                </Chips>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
