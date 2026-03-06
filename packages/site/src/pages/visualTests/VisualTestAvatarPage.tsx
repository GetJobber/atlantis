import {
  AtlantisThemeContextProvider,
  Avatar,
  Box,
  Cluster,
  Heading,
  Stack,
  Text,
} from "@jobber/components";

const CUSTOM_COLORS = [
  "var(--color-black)",
  "var(--color-grey)",
  "var(--color-red)",
  "var(--color-red--dark)",
  "var(--color-green)",
  "var(--color-green--dark)",
  "var(--color-blue)",
  "var(--color-base-blue--600)",
  "var(--color-blue--dark)",
  "var(--color-lightBlue)",
  "var(--color-lightBlue--light)",
  "var(--color-greyBlue)",
  "var(--color-greyBlue--dark)",
  "var(--color-navy)",
  "var(--color-orange)",
  "var(--color-orange--dark)",
  "var(--color-orange--light)",
  "var(--color-brown)",
  "var(--color-brown--dark)",
  "var(--color-purple)",
  "var(--color-base-purple--700)",
  "var(--color-pink)",
  "var(--color-lime)",
  "var(--color-lime--lighter)",
  "var(--color-yellow)",
  "var(--color-yellow--light)",
  "var(--color-yellow--dark)",
  "var(--color-yellowGreen)",
  "var(--color-interactive)",
  "var(--color-interactive--subtle)",
  "var(--color-quote)",
  "var(--color-task)",
  "var(--color-client)",
  "var(--color-indigo)",
  "var(--color-indigo--light)",
  "var(--color-indigo--dark)",
];

export const VisualTestAvatarPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Avatar Examples</Heading>

        <Stack gap="larger">
          <section>
            <Heading level={2}>Default (no color)</Heading>
            <Text>
              Interactive subtle background with hover state. Sizes, initials,
              and icon fallback.
            </Text>
            <Stack gap="large">
              <div>
                <Heading level={3}>Light</Heading>
                <AtlantisThemeContextProvider dangerouslyOverrideTheme="light">
                  <Box background="surface" padding="large">
                    <Cluster gap="large">
                      <Avatar size="small" initials="ST" />
                      <Avatar size="base" initials="ST" />
                      <Avatar size="large" initials="ST" />
                      <Avatar initials="" name="Icon fallback" />
                    </Cluster>
                  </Box>
                </AtlantisThemeContextProvider>
              </div>
              <div>
                <Heading level={3}>Dark</Heading>
                <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
                  <Box background="surface" padding="large">
                    <Cluster gap="large">
                      <Avatar size="small" initials="ST" />
                      <Avatar size="base" initials="ST" />
                      <Avatar size="large" initials="ST" />
                      <Avatar initials="" name="Icon fallback" />
                    </Cluster>
                  </Box>
                </AtlantisThemeContextProvider>
              </div>
            </Stack>
          </section>

          <section>
            <Heading level={2}>Custom colors</Heading>
            <Text>
              Product calendar colors: tokens where available, hex where no
              token exists. Includes non-overlapping examples from above.
            </Text>
            <Stack gap="large">
              <div>
                <Heading level={3}>Light</Heading>
                <AtlantisThemeContextProvider dangerouslyOverrideTheme="light">
                  <Box background="surface" padding="large">
                    <Cluster gap="base">
                      {CUSTOM_COLORS.map(color => (
                        <Avatar
                          key={color}
                          color={color}
                          initials="AB"
                          name={color}
                        />
                      ))}
                    </Cluster>
                  </Box>
                </AtlantisThemeContextProvider>
              </div>
              <div>
                <Heading level={3}>Dark</Heading>
                <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
                  <Box background="surface" padding="large">
                    <Cluster gap="base">
                      {CUSTOM_COLORS.map(color => (
                        <Avatar
                          key={color}
                          color={color}
                          initials="AB"
                          name={color}
                        />
                      ))}
                    </Cluster>
                  </Box>
                </AtlantisThemeContextProvider>
              </div>
            </Stack>
          </section>

          <section>
            <Heading level={2}>With images</Heading>
            <Cluster gap="large">
              <Avatar
                imageUrl="https://placehold.co/300x300?text=User"
                name="User"
              />
              <Avatar
                imageUrl="https://placehold.co/300x300?text=User"
                name="User"
                color="var(--color-green)"
              />
            </Cluster>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
