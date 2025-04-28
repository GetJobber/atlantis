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
        <Heading level={1}>InputGroup Examples</Heading>

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
