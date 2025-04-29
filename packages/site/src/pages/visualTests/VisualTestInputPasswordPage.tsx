import {
  Box,
  Grid,
  Heading,
  InputPassword,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestInputPasswordPage = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>InputPassword Examples</Heading>

        <Stack gap="large">
          {/* Basic InputPassword */}
          <section>
            <Text size="large">Basic InputPassword</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputPassword
                  value={password1}
                  onChange={setPassword1}
                  placeholder="Enter password"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputPassword with visibility toggle */}
          <section>
            <Text size="large">InputPassword with visibility toggle</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputPassword
                  value={password2}
                  onChange={setPassword2}
                  placeholder="Enter password"
                  hasVisibility={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputPassword states */}
          <section>
            <Text size="large">InputPassword states</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <InputPassword
                    value={password3}
                    onChange={setPassword3}
                    placeholder="Enter password"
                    disabled={true}
                  />
                  <InputPassword
                    value="readonly-password"
                    onChange={() => ({})}
                    placeholder="Enter password"
                    disabled={true}
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
