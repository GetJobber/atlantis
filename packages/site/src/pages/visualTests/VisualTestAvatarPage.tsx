import {
  AtlantisThemeContextProvider,
  Avatar,
  Box,
  Cluster,
  Heading,
  Stack,
  Text,
} from "@jobber/components";

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
            <Heading level={2}>Custom dark colors</Heading>
            <Text>White initials and icon on dark backgrounds.</Text>
            <Cluster gap="large">
              <Avatar initials="JD" color="black" />
              <Avatar initials="MS" color="var(--color-navy)" />
              <Avatar
                initials=""
                name="Icon on dark"
                color="var(--color-interactive)"
              />
            </Cluster>
          </section>

          <section>
            <Heading level={2}>Custom light colors</Heading>
            <Text>Dark initials and icon on light backgrounds.</Text>
            <Cluster gap="large">
              <Avatar initials="AB" color="yellow" />
              <Avatar initials="CD" color="var(--color-green--lightest)" />
              <Avatar
                initials=""
                name="Icon on light"
                color="var(--color-yellow--lightest)"
              />
            </Cluster>
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
