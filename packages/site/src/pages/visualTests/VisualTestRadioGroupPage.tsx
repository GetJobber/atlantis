import {
  Box,
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
          <Heading level={4}>Basic RadioGroup</Heading>
          <section>
            <RadioGroup
              value={basicValue}
              onChange={setBasicValue}
              ariaLabel="Basic radio group"
            >
              <RadioOption value="1" label="Option 1" />
              <RadioOption value="2" label="Option 2" />
              <RadioOption value="3" label="Option 3" />
            </RadioGroup>
          </section>

          <Heading level={4}>Horizontal</Heading>
          <section>
            <RadioGroup
              value={basicValue}
              onChange={setBasicValue}
              ariaLabel="Horizontal radio group"
              direction="horizontal"
            >
              <RadioOption value="1" label="Option 1" />
              <RadioOption value="2" label="Option 2" />
              <RadioOption value="3" label="Option 3" />
            </RadioGroup>
          </section>

          <Heading level={4}>Horizontal with description</Heading>
          <section>
            <RadioGroup
              value={basicValue}
              onChange={setBasicValue}
              ariaLabel="Horizontal radio group with description"
              direction="horizontal"
            >
              <RadioOption
                value="1"
                label="Option 1"
                description="Description 1"
              />
              <RadioOption
                value="2"
                label="Option 2"
                description="Description 2"
              />
              <RadioOption
                value="3"
                label="Option 3"
                description="Description 3"
              />
            </RadioGroup>
          </section>

          <Heading level={4}>Custom content</Heading>
          <section>
            <RadioGroup
              value={customValue}
              onChange={setCustomValue}
              ariaLabel="Custom content radio group"
            >
              <RadioOption value="custom1">
                <Stack>
                  <Text>Custom Option 1</Text>
                  <Text variation="subdued">With additional description</Text>
                </Stack>
              </RadioOption>
              <RadioOption value="custom2">
                <Stack>
                  <Text>Custom Option 2</Text>
                  <Text variation="subdued">With additional description</Text>
                </Stack>
              </RadioOption>
            </RadioGroup>
          </section>

          <Heading level={4}>Disabled options</Heading>
          <section>
            <RadioGroup
              value={basicValue}
              onChange={setBasicValue}
              ariaLabel="Radio group with disabled options"
            >
              <RadioOption value="1" label="Enabled Option" />
              <RadioOption value="2" label="Disabled Option" disabled />
              <RadioOption value="3" label="Another Enabled Option" />
            </RadioGroup>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
