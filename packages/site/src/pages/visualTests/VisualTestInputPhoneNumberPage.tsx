import {
  Box,
  Grid,
  Heading,
  InputPhoneNumber,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestInputPhoneNumberPage = () => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>InputPhoneNumber Examples</Heading>

        <Stack space="large">
          {/* Basic InputPhoneNumber */}
          <section>
            <Text size="large">Basic InputPhoneNumber</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputPhoneNumber
                  value={phone1}
                  onChange={setPhone1}
                  placeholder="Enter phone number"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputPhoneNumber with custom pattern */}
          <section>
            <Text size="large">InputPhoneNumber with custom pattern</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputPhoneNumber
                  value={phone2}
                  onChange={setPhone2}
                  placeholder="Enter phone number"
                  pattern="** ** ** **"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputPhoneNumber states */}
          <section>
            <Text size="large">InputPhoneNumber states</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack space="small">
                  <InputPhoneNumber
                    value={phone3}
                    onChange={setPhone3}
                    placeholder="Enter phone number"
                    disabled={true}
                  />
                  <InputPhoneNumber
                    value="(555) 123-4567"
                    onChange={() => ({})}
                    placeholder="Enter phone number"
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
