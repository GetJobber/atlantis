import {
  Box,
  Grid,
  Heading,
  InputEmail,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestInputEmailPage = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [email4, setEmail4] = useState("");

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>InputEmail Examples</Heading>

        <Stack gap="large">
          {/* Basic InputEmail */}
          <section>
            <Text size="large">Basic InputEmail</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputEmail
                  value={email1}
                  onChange={handleChange(setEmail1)}
                  placeholder="Enter your email"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputEmail with validation */}
          <section>
            <Text size="large">InputEmail with validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputEmail
                  value={email2}
                  onChange={handleChange(setEmail2)}
                  placeholder="Enter your email"
                  invalid={!email2}
                  description={!email2 ? "Please enter your email" : undefined}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputEmail with maxLength */}
          <section>
            <Text size="large">InputEmail with maxLength</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputEmail
                  value={email3}
                  onChange={handleChange(setEmail3)}
                  placeholder="Enter your email"
                  maxLength={30}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputEmail states */}
          <section>
            <Text size="large">InputEmail states</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <InputEmail
                    value={email4}
                    onChange={handleChange(setEmail4)}
                    disabled={true}
                    placeholder="Enter your email"
                  />
                  <InputEmail
                    value="readonly@example.com"
                    onChange={handleChange(setEmail4)}
                    readonly={true}
                    placeholder="Enter your email"
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
