import {
  Autocomplete,
  Box,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

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
  const [customValue, setCustomValue] = useState<Option | undefined>(undefined);

  const basicOptions: Option[] = [
    { value: "1", label: "Apple" },
    { value: "2", label: "Banana" },
    { value: "3", label: "Cherry" },
    { value: "4", label: "Date" },
    { value: "5", label: "Elderberry" },
  ];

  const detailsOptions: Option[] = [
    { value: "1", label: "John Smith", details: "john@example.com" },
    { value: "2", label: "Jane Doe", details: "jane@example.com" },
    { value: "3", label: "Bob Johnson", details: "bob@example.com" },
  ];

  const getFilteredOptions = (query: string) => {
    return basicOptions.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const getAsyncOptions = async (query: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return getFilteredOptions(query);
  };

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>Autocomplete Examples</Heading>

        <Stack space="large">
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

          {/* Autocomplete with Async Options */}
          <section>
            <Text size="large">Autocomplete with Async Options</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Autocomplete<Option>
                  placeholder="Type to search"
                  value={customValue}
                  onChange={(newValue?: Option) => setCustomValue(newValue)}
                  getOptions={getAsyncOptions}
                  debounce={500}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
