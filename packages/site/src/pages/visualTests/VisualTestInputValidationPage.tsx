import {
  Box,
  Grid,
  Heading,
  InputValidation,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestInputValidationPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>InputValidation Examples</Heading>

        <Stack gap="large">
          {/* Basic InputValidation */}
          <section>
            <Text size="large">Basic InputValidation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputValidation message="This is a validation message" />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Hidden InputValidation */}
          <section>
            <Text size="large">Hidden InputValidation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputValidation
                  message="This validation message is hidden"
                  visible={false}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multiple InputValidations */}
          <section>
            <Text size="large">Multiple InputValidations</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <InputValidation message="This field is required" />
                  <InputValidation message="Must be at least 8 characters" />
                  <InputValidation message="Must contain a number" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
