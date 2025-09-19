import {
  Avatar,
  Box,
  Chip,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestChipPage = () => {
  const [selectedSingle, setSelectedSingle] = useState<string>();
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([
    "Gavin Messina",
    "Jane Smith",
  ]);

  const handleSingleSelect = (value: string) => {
    setSelectedSingle(selectedSingle === value ? undefined : value);
  };

  const handleMultiSelect = (value: string) => {
    setSelectedMultiple(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const handleRemoveTeamMember = (member: string) => {
    setSelectedTeamMembers(prev => prev.filter(item => item !== member));
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Chip Examples</Heading>

        <Stack gap="large">
          {/* Basic Chips */}
          <section>
            <Text size="large">Basic Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink", "shrink", "shrink"]}
                >
                  <Chip label="Base Chip" />
                  <Chip label="Subtle Chip" variation="subtle" />
                  <Chip label="Disabled Chip" disabled />
                  <Chip
                    label="With Heading"
                    heading="Status"
                    variation="subtle"
                  />
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Single Select Chips */}
          <section>
            <Text size="large">Single Select Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink", "shrink", "shrink"]}
                >
                  {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                    option => (
                      <Chip
                        key={option}
                        label={option}
                        variation={
                          selectedSingle === option ? "base" : "subtle"
                        }
                        onClick={() => handleSingleSelect(option)}
                      >
                        {selectedSingle === option && (
                          <Chip.Suffix>
                            <Icon
                              name="checkmark"
                              size="small"
                              color="interactiveSubtle"
                            />
                          </Chip.Suffix>
                        )}
                      </Chip>
                    ),
                  )}
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multi Select Chips */}
          <section>
            <Text size="large">Multi Select Chips</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink", "shrink", "shrink"]}
                >
                  {["Tag 1", "Tag 2", "Tag 3", "Tag 4"].map(option => (
                    <Chip
                      key={option}
                      label={option}
                      variation={
                        selectedMultiple.includes(option) ? "base" : "subtle"
                      }
                      onClick={() => handleMultiSelect(option)}
                    >
                      {selectedMultiple.includes(option) && (
                        <Chip.Suffix>
                          <Icon
                            name="checkmark"
                            size="small"
                            color="interactiveSubtle"
                          />
                        </Chip.Suffix>
                      )}
                    </Chip>
                  ))}
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Chips with Icons and Avatars */}
          <section>
            <Text size="large">Chips with Icons and Avatars</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink", "shrink"]}
                >
                  {selectedTeamMembers.map(member => (
                    <Chip key={member} label={member}>
                      <Chip.Prefix>
                        <Avatar
                          size="small"
                          initials={member
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                        />
                      </Chip.Prefix>
                      <Chip.Suffix
                        onClick={() => handleRemoveTeamMember(member)}
                      >
                        <Icon name="cross" size="small" />
                      </Chip.Suffix>
                    </Chip>
                  ))}
                  <Chip label="Add Member" variation="subtle">
                    <Chip.Suffix>
                      <Icon name="add" size="small" color="interactiveSubtle" />
                    </Chip.Suffix>
                  </Chip>
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Invalid State */}
          <section>
            <Text size="large">Invalid State</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink"]}
                >
                  <Chip label="Invalid Chip" invalid>
                    <Chip.Prefix>
                      <Icon name="alert" size="small" />
                    </Chip.Prefix>
                  </Chip>
                  <Chip label="Invalid with Heading" heading="Error" invalid />
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Disabled State */}
          <section>
            <Text size="large">Disabled State</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Flex
                  direction="row"
                  gap="small"
                  template={["shrink", "shrink"]}
                >
                  <Chip label="Disabled Chip" disabled>
                    <Chip.Prefix>
                      <Icon name="alert" size="small" />
                    </Chip.Prefix>
                  </Chip>
                  <Chip label="Disabled with Heading" disabled />
                </Flex>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
