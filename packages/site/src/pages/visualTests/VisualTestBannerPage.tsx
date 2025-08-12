import { Banner, Box, Button, Heading, Icon, Stack } from "@jobber/components";

export const VisualTestBannerPage = () => {
  return (
    <Box padding="large">
      <Stack gap="large">
        <Heading level={3}>Banner Examples</Heading>

        <Heading level={4}>Default</Heading>
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

        <Heading level={4}>Non-dismissible</Heading>
        <section>
          <Banner type="warning" dismissible={false}>
            Changes to this visit will not be applied to future visits
          </Banner>
        </section>

        <Heading level={4}>With primary action</Heading>
        <section>
          <Banner
            type="success"
            primaryAction={{
              label: "View Plans",
              onClick: () => alert("Plans"),
            }}
          >
            Your account was upgraded successfully
          </Banner>
        </section>

        <Heading level={4}>Default composable</Heading>
        <section>
          <Stack>
            <Banner.Provider type="success">
              <Banner.Content>
                Your account was upgraded successfully
              </Banner.Content>
            </Banner.Provider>
            <Banner.Provider type="notice">
              <Banner.Content>
                Jobber will be performing scheduled maintenance on Feb. 21
              </Banner.Content>
            </Banner.Provider>
            <Banner.Provider type="warning">
              <Banner.Content>
                Changes to this visit will not be applied to future visits
              </Banner.Content>
            </Banner.Provider>

            <Banner.Provider type="error">
              <Banner.Content>
                Payment could not be processed because of a network error
              </Banner.Content>
            </Banner.Provider>
          </Stack>
        </section>

        <Heading level={4}>Composable with primary action</Heading>
        <section>
          <Banner.Provider type="error">
            <Banner.Content>
              Payment could not be processed because of a network error
            </Banner.Content>
            <Banner.Action
              label="More info"
              onClick={() => alert("More info...")}
            />
          </Banner.Provider>
        </section>

        <Heading level={4}>
          Composable with custom icon and dismiss button
        </Heading>
        <section>
          <Banner.Provider
            type="success"
            icon={<Icon name="sparkles" customColor="red" />}
            dismissButton={<Button label="Custom" />}
          >
            <Banner.Content>
              Your account was upgraded successfully
            </Banner.Content>
          </Banner.Provider>
        </section>

        <Heading level={4}>Composable with no icon and dismiss button</Heading>
        <section>
          <Banner.Provider type="notice" icon={false} dismissButton={false}>
            <Banner.Content>
              Jobber will be performing scheduled maintenance on Feb. 21
            </Banner.Content>
          </Banner.Provider>
        </section>

        <Heading level={4}>Composable with custom styles</Heading>
        <section>
          <Banner.Provider
            type="notice"
            icon={
              <Banner.Icon
                name="sparkles"
                customColor="var(--color-base-purple--700)"
                backgroundColor="base-purple--100"
              />
            }
            UNSAFE_style={{
              container: {
                backgroundColor: "var(--color-surface)",
                border: "var(--border-base) solid var(--color-border)",
                color: "var(--color-text--secondary)",
              },
            }}
          >
            <Banner.Content>This is a sparkly purple banner!</Banner.Content>
            <Banner.Action
              label="Take action"
              onClick={() => alert("Take action")}
              UNSAFE_style={{
                button: {
                  buttonLabel: {
                    textStyle: {
                      color: "var(--color-base-white)",
                    },
                  },
                  container: {
                    backgroundColor: "var(--color-base-purple--900)",
                  },
                },
              }}
            />
          </Banner.Provider>
        </section>
      </Stack>
    </Box>
  );
};
