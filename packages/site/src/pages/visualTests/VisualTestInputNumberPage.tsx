import {
  Box,
  Grid,
  Heading,
  InputNumber,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestInputNumberPage = () => {
  const [value1, setValue1] = useState<number | undefined>(undefined);
  const [value2, setValue2] = useState<number | undefined>(undefined);
  const [value3, setValue3] = useState<number | undefined>(undefined);
  const [value4, setValue4] = useState<number | undefined>(undefined);

  const handleChange =
    (setter: (value: number | undefined) => void) => (value: number) => {
      setter(value);
    };

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>InputNumber Examples</Heading>

        <Stack space="large">
          {/* Basic InputNumber */}
          <section>
            <Text size="large">Basic InputNumber</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputNumber
                  value={value1}
                  onChange={handleChange(setValue1)}
                  placeholder="Enter a number"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputNumber with min/max */}
          <section>
            <Text size="large">InputNumber with min/max</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputNumber
                  value={value2}
                  onChange={handleChange(setValue2)}
                  placeholder="Enter a number between 0 and 100"
                  min={0}
                  max={100}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputNumber with prefix/suffix */}
          <section>
            <Text size="large">InputNumber with prefix/suffix</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  <InputNumber
                    value={value3}
                    onChange={handleChange(setValue3)}
                    placeholder="Enter amount"
                    prefix={{ label: "$" }}
                  />
                  <InputNumber
                    value={value4}
                    onChange={handleChange(setValue4)}
                    placeholder="Enter percentage"
                    suffix={{ label: "%" }}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputNumber states */}
          <section>
            <Text size="large">InputNumber states</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  <InputNumber
                    value={42}
                    onChange={handleChange(() => ({}))}
                    disabled={true}
                    placeholder="Disabled input"
                  />
                  <InputNumber
                    value={42}
                    onChange={handleChange(() => ({}))}
                    readonly={true}
                    placeholder="Read-only input"
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
