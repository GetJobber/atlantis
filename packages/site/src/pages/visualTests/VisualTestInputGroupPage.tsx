import {
  Box,
  Grid,
  Heading,
  InputGroup,
  InputText,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestInputGroupPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>InputGroup Examples</Heading>

        <Stack gap="large">
          {/* Vertical InputGroup */}
          <section>
            <Text size="large">Vertical InputGroup</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputGroup flowDirection="vertical">
                  <InputText placeholder="First name" />
                  <InputText placeholder="Last name" />
                  <InputText placeholder="Email" />
                </InputGroup>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Vertical InputGroup with Horizontal Rows */}
          <section>
            <Text size="large">Vertical InputGroup with Horizontal Rows</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 8 }}>
                <InputGroup flowDirection="vertical">
                  <InputText placeholder="Street 1" />
                  <InputText placeholder="Street 2" />
                  <InputGroup flowDirection="horizontal">
                    <InputText placeholder="City" />
                    <InputText placeholder="Province" />
                  </InputGroup>
                  <InputGroup flowDirection="horizontal">
                    <InputText placeholder="Postal Code" />
                    <InputText placeholder="Country" />
                  </InputGroup>
                </InputGroup>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Horizontal InputGroup */}
          <section>
            <Text size="large">Horizontal InputGroup</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputGroup flowDirection="horizontal">
                  <InputText placeholder="First name" />
                  <InputText placeholder="Last name" />
                </InputGroup>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Nested InputGroup */}
          <section>
            <Text size="large">Nested InputGroup</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputGroup flowDirection="vertical">
                  <InputText placeholder="Company name" />
                  <InputGroup flowDirection="horizontal">
                    <InputText placeholder="City" />
                    <InputText placeholder="State" />
                    <InputText placeholder="ZIP" />
                  </InputGroup>
                </InputGroup>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
