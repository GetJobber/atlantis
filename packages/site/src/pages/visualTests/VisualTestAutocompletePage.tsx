import {
  Autocomplete,
  Box,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";
import { CustomGroupOption } from "./AdvancedAutocomplete";
import SimpleAutocomplete from "./SimpleAutocomplete";

type OptionValue = string;

interface Option {
  value: OptionValue;
  label: string;
  details?: string;
}

export const VisualTestAutocompletePage = () => {
  const [basicValue, setBasicValue] = useState<Option | undefined>(undefined);
  const [detailsValue, setDetailsValue] = useState<Option | undefined>(
    undefined,
  );
  const [validationValue, setValidationValue] = useState<Option | undefined>(
    undefined,
  );

  const basicOptions: Option[] = [
    { value: "1", label: "Apple" },
    { value: "2", label: "Banana" },
    { value: "3", label: "Cherry" },
    { value: "4", label: "ElderDate" },
    { value: "5", label: "Elderberry" },
  ];

  const detailsOptions: Option[] = [
    { value: "1", label: "John Smith", details: "john@example.com" },
    { value: "2", label: "Jane Doe", details: "jane@example.com" },
    { value: "3", label: "Bob Johnson", details: "bob@example.com" },
  ];

  const customOptions: CustomGroupOption[] = [
    {
      label: "Services",
      icon: "quote",
      description: "Services",
      type: "default",
      options: [
        {
          value: 1,
          label: "Plumbing",
          type: "default",
          description: "Plumbing services",
          cost: 100,
        },
        {
          value: 2,
          label: "Electrical",
          type: "default",
          description: "Electrical services",
          cost: 200,
        },
      ],
    },
    {
      icon: "invoice",
      label: "Products",
      description: "Products",
      type: "default",
      options: [
        {
          label: "Plumbing Tape",
          description: "Plumbing Tape",
          cost: 100,
          type: "default",
          value: 4,
        },
        {
          label: "Plumbing Sink",

          type: "default",
          description: "Plumbing Sink",
          cost: 200,
          value: 5,
        },
      ],
    },
    {
      icon: "invoice",
      label: "HOME DEPOT",
      description: "Home Depot",
      type: "catalog",
      options: [
        {
          label: "Home Depot Plumbing Tape",
          description: "Home Depot Plumbing tape",
          type: "catalog",
          cost: 100,
          value: 6,
        },
        {
          label: "Home Depot Plumbing Sink",
          description: "Home Depot Plumbing sink",
          type: "catalog",
          cost: 100,
          value: 7,
        },
      ],
    },
  ];

  const getFilteredOptions = (query: string) => {
    return basicOptions.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const data = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Mango",
    "Orange",
    "Strawberry",
  ];

  const handleSelect = value => {
    alert(`Selected: ${value}`);
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Autocomplete Examples</Heading>

        <Stack gap="large">
          {/* Basic Autocomplete */}
          <section>
            <Text size="large">Basic Autocomplete</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Autocomplete<Option>
                  placeholder="Select a fruit"
                  value={basicValue}
                  onChange={(newValue?: Option) => setBasicValue(newValue)}
                  getOptions={query => getFilteredOptions(query)}
                  initialOptions={basicOptions}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Autocomplete with Details */}
          <section>
            <Text size="large">Autocomplete with Details</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Autocomplete<Option>
                  placeholder="Select a contact"
                  value={detailsValue}
                  onChange={(newValue?: Option) => setDetailsValue(newValue)}
                  getOptions={query =>
                    detailsOptions.filter(option =>
                      option.label.toLowerCase().includes(query.toLowerCase()),
                    )
                  }
                  initialOptions={detailsOptions}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Autocomplete with Validation */}
          <section>
            <Text size="large">Autocomplete with Validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Autocomplete<Option>
                  placeholder="Required field"
                  value={validationValue}
                  onChange={(newValue?: Option) => setValidationValue(newValue)}
                  getOptions={query => getFilteredOptions(query)}
                  initialOptions={basicOptions}
                  invalid={!validationValue}
                  description="This field is required"
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <SimpleAutocomplete
                  suggestions={data}
                  onSelect={handleSelect}
                  renderItem={item => <span>{item}</span>}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
