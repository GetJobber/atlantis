import {
  Box,
  Grid,
  Heading,
  ProgressBar,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestProgressBarPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>ProgressBar Examples</Heading>

        <Stack gap="large">
          {/* Base Progress Bar */}
          <section>
            <Text size="large">Base Progress Bar</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <ProgressBar currentStep={3} totalSteps={10} />
                  <ProgressBar currentStep={7} totalSteps={10} />
                  <ProgressBar currentStep={10} totalSteps={10} />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Large Progress Bar */}
          <section>
            <Text size="large">Large Progress Bar</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <ProgressBar currentStep={3} totalSteps={10} size="large" />
                  <ProgressBar currentStep={7} totalSteps={10} size="large" />
                  <ProgressBar currentStep={10} totalSteps={10} size="large" />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Stepped Progress Bar */}
          <section>
            <Text size="large">Stepped Progress Bar</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <ProgressBar
                    currentStep={1}
                    totalSteps={4}
                    variation="stepped"
                  />
                  <ProgressBar
                    currentStep={2}
                    totalSteps={4}
                    variation="stepped"
                  />
                  <ProgressBar
                    currentStep={4}
                    totalSteps={4}
                    variation="stepped"
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Percentage Progress Bar */}
          <section>
            <Text size="large">Percentage Progress Bar</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <ProgressBar currentStep={25} totalSteps={100} />
                  <ProgressBar currentStep={50} totalSteps={100} />
                  <ProgressBar currentStep={75} totalSteps={100} />
                  <ProgressBar currentStep={100} totalSteps={100} />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
