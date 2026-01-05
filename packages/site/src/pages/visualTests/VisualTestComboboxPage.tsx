import {
  Avatar,
  Box,
  Chip,
  Combobox,
  Grid,
  Heading,
  Icon,
  Stack,
  StatusIndicator,
  Text,
} from "@jobber/components";
import { useState } from "react";

interface ComboboxOption {
  id: string;
  label: string;
}

interface TeamMember extends ComboboxOption {
  email: string;
  status: "online" | "offline" | "away";
}

// Static data used only for visual scenarios
const basicOptions: ComboboxOption[] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4" },
];

const multiOptions: ComboboxOption[] = [
  { id: "plumbing", label: "Plumbing" },
  { id: "electrical", label: "Electrical" },
  { id: "hvac", label: "HVAC" },
  { id: "landscaping", label: "Landscaping" },
  { id: "cleaning", label: "Cleaning" },
];

const teamMembers: TeamMember[] = [
  {
    id: "1",
    label: "Alice Johnson",
    email: "alice@example.com",
    status: "online",
  },
  { id: "2", label: "Bob Smith", email: "bob@example.com", status: "away" },
  {
    id: "3",
    label: "Charlie Brown",
    email: "charlie@example.com",
    status: "offline",
  },
  {
    id: "4",
    label: "David Wilson",
    email: "david@example.com",
    status: "online",
  },
];

const lotrMembers: ComboboxOption[] = [
  { id: "1", label: "Bilbo Baggins" },
  { id: "2", label: "Frodo Baggins" },
  { id: "3", label: "Pippin Took" },
  { id: "4", label: "Merry Brandybuck" },
  { id: "5", label: "Sam Gamgee" },
  { id: "6", label: "Aragorn" },
  { id: "7", label: "Legolas" },
  { id: "8", label: "Gimli" },
];

export const VisualTestComboboxPage = () => {
  const [basicSelected, setBasicSelected] = useState<ComboboxOption[]>([]);
  const [multiSelected, setMultiSelected] = useState<ComboboxOption[]>([]);
  const [customSelected, setCustomSelected] = useState<ComboboxOption[]>([]);
  const [teamSelected, setTeamSelected] = useState<TeamMember[]>([]);
  const [searchSelected, setSearchSelected] = useState<ComboboxOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<ComboboxOption[]>([]);

  const [constrainedSelected, setConstrainedSelected] =
    useState<ComboboxOption[]>(lotrMembers);

  const handleSearch = async (searchValue: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const filteredOptions = basicOptions.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSearchOptions(filteredOptions);
    setIsLoading(false);
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Combobox Examples</Heading>

        <Stack gap="large">
          {/* Basic Single Select */}
          <section>
            <Text size="large">Basic Single Select</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Combobox
                  label="Select an option"
                  selected={basicSelected}
                  onSelect={options =>
                    setBasicSelected(options as ComboboxOption[])
                  }
                  subjectNoun="options"
                >
                  {basicOptions.map(option => (
                    <Combobox.Option
                      key={option.id}
                      id={option.id}
                      label={option.label}
                    />
                  ))}
                </Combobox>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multi Select */}
          <section>
            <Text size="large">Multi Select</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Combobox
                  label="Select services"
                  selected={multiSelected}
                  onSelect={options =>
                    setMultiSelected(options as ComboboxOption[])
                  }
                  multiSelect={true}
                  subjectNoun="services"
                >
                  {multiOptions.map(option => (
                    <Combobox.Option
                      key={option.id}
                      id={option.id}
                      label={option.label}
                    />
                  ))}
                </Combobox>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Custom Activator */}
          <section>
            <Text size="large">Custom Activator</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Combobox
                  selected={customSelected}
                  onSelect={options =>
                    setCustomSelected(options as ComboboxOption[])
                  }
                  subjectNoun="options"
                >
                  <Combobox.Activator>
                    <Chip
                      label={
                        customSelected.length
                          ? customSelected[0].label
                          : "Select an option"
                      }
                      variation="subtle"
                    >
                      <Chip.Suffix>
                        <Icon name="arrowDown" size="small" />
                      </Chip.Suffix>
                    </Chip>
                  </Combobox.Activator>
                  {basicOptions.map(option => (
                    <Combobox.Option
                      key={option.id}
                      id={option.id}
                      label={option.label}
                    />
                  ))}
                </Combobox>
              </Grid.Cell>
            </Grid>
          </section>

          {/* With Prefix and Custom Render */}
          <section>
            <Text size="large">With Prefix and Custom Render</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Combobox
                  label="Select team members"
                  selected={teamSelected}
                  onSelect={options => setTeamSelected(options as TeamMember[])}
                  multiSelect={true}
                  subjectNoun="team members"
                >
                  {teamMembers.map(member => (
                    <Combobox.Option
                      key={member.id}
                      id={member.id}
                      label={member.label}
                      prefix={
                        <Stack gap="small" align="center">
                          <Avatar
                            size="small"
                            initials="AJ"
                            imageUrl="https://i.pravatar.cc/300"
                          />
                          <StatusIndicator
                            status={
                              member.status === "online"
                                ? "success"
                                : member.status === "away"
                                ? "warning"
                                : "inactive"
                            }
                          />
                        </Stack>
                      }
                      customRender={option => (
                        <Stack gap="small">
                          <Text>{option.label}</Text>
                          <Text variation="subdued" size="small">
                            {member.email}
                          </Text>
                        </Stack>
                      )}
                    />
                  ))}
                </Combobox>
              </Grid.Cell>
            </Grid>
          </section>

          {/* With Search and Loading */}
          <section>
            <Text size="large">With Search and Loading</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Combobox
                  label="Search options"
                  selected={searchSelected}
                  onSelect={options =>
                    setSearchSelected(options as ComboboxOption[])
                  }
                  onSearch={handleSearch}
                  loading={isLoading}
                  subjectNoun="options"
                >
                  {searchOptions.map(option => (
                    <Combobox.Option
                      key={option.id}
                      id={option.id}
                      label={option.label}
                    />
                  ))}
                </Combobox>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Constrained Width Multi Select (Visual) */}
          <section>
            <Text size="large">Constrained Width Multi Select</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <div style={{ width: 300 }}>
                  <Combobox
                    label="Teammates"
                    selected={constrainedSelected}
                    onSelect={options =>
                      setConstrainedSelected(options as ComboboxOption[])
                    }
                    multiSelect={true}
                    subjectNoun="teammates"
                  >
                    {lotrMembers.map(option => (
                      <Combobox.Option
                        key={option.id}
                        id={option.id}
                        label={option.label}
                      />
                    ))}
                  </Combobox>
                </div>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
