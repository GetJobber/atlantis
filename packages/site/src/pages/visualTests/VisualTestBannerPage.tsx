import { Banner, Box, Heading, Stack } from "@jobber/components";

export const VisualTestBannerPage = () => {
  return (
    <Box padding="large">
      <Stack gap="large">
        <Heading level={3}>Banner Examples</Heading>

        {/* Basic Banner */}
        <section>
          <Stack>
            <Banner type="success">
              Your account was upgraded successfully
            </Banner>
            <Banner type="notice">
              Jobber will be performing scheduled maintenance on Feb. 21
            </Banner>
            <Banner type="warning">
              Changes to this visit will not be applied to future visits
            </Banner>

            <Banner type="error">
              Payment could not be processed because of a network error
            </Banner>
          </Stack>
        </section>

        {/* Banner with primary action */}
        <section>
          <Stack>
            <Banner
              type="success"
              primaryAction={{
                label: "View Plans",
                onClick: () => alert("Plans"),
              }}
            >
              Your account was upgraded successfully
            </Banner>
            <Banner
              type="notice"
              primaryAction={{
                label: "View Plans",
                onClick: () => alert("Plans"),
              }}
            >
              Jobber will be performing scheduled maintenance on Feb. 21
            </Banner>
            <Banner
              type="warning"
              primaryAction={{
                label: "View Plans",
                onClick: () => alert("Plans"),
              }}
            >
              Changes to this visit will not be applied to future visits
            </Banner>

            <Banner
              type="error"
              primaryAction={{
                label: "View Plans",
                onClick: () => alert("Plans"),
              }}
            >
              Payment could not be processed because of a network error
            </Banner>
          </Stack>
        </section>
      </Stack>
    </Box>
  );
};
