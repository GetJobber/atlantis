import {
  Box,
  Grid,
  Heading,
  RadioGroup,
  RadioOption,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestRadioGroupPage = () => {
  const [basicValue, setBasicValue] = useState<string | number>("1");
  const [customValue, setCustomValue] = useState<string | number>("custom1");

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>RadioGroup Examples</Heading>

        <Stack gap="large">
          {/* Basic RadioGroup */}
          <section>
            <Text size="large">Basic RadioGroup</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <RadioGroup
                  value={basicValue}
                  onChange={setBasicValue}
                  ariaLabel="Basic radio group"
                >
                  <RadioOption value="1" label="Option 1" />
                  <RadioOption value="2" label="Option 2" />
                  <RadioOption value="3" label="Option 3" />
                </RadioGroup>
              </Grid.Cell>
            </Grid>
          </section>

          {/* RadioGroup with Custom Content */}
          <section>
            <Text size="large">RadioGroup with Custom Content</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <RadioGroup
                  value={customValue}
                  onChange={setCustomValue}
                  ariaLabel="Custom content radio group"
                >
                  <RadioOption value="custom1">
                    <Stack>
                      <Text>Custom Option 1</Text>
                      <Text variation="subdued">
                        With additional description
                      </Text>
                    </Stack>
                  </RadioOption>
                  <RadioOption value="custom2">
                    <Stack>
                      <Text>Custom Option 2</Text>
                      <Text variation="subdued">
                        With additional description
                      </Text>
                    </Stack>
                  </RadioOption>
                </RadioGroup>
              </Grid.Cell>
            </Grid>
          </section>

          {/* RadioGroup with Disabled Options */}
          <section>
            <Text size="large">RadioGroup with Disabled Options</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <RadioGroup
                  value={basicValue}
                  onChange={setBasicValue}
                  ariaLabel="Radio group with disabled options"
                >
                  <RadioOption value="1" label="Enabled Option" />
                  <RadioOption value="2" label="Disabled Option" disabled />
                  <RadioOption value="3" label="Another Enabled Option" />
                </RadioGroup>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
