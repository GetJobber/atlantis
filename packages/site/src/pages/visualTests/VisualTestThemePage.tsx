import {
  AtlantisThemeContextProvider,
  Box,
  Heading,
  InlineLabel,
  Stack,
  Text,
} from "@jobber/components";
import { ToggleThemeButton } from "../../components/ToggleThemeButton";

export const VisualTestThemePage = () => {
  const overrideTokens = {
    "color-text": "hsl(0, 100%, 50%)",
  } as Record<string, string>;

  return (
    <div>
      <Box padding="large">
        <Stack gap="extravagant">
          <Heading level={3}>Theme Visuals</Heading>

          <section>
            <Stack align="center" gap="large">
              <Text size="large">Dynamic Theme</Text>
              <ToggleThemeButton />
            </Stack>
            <Stack gap="base">
              <Text>Body text example</Text>
              <InlineLabel color="red">Past due</InlineLabel>
            </Stack>
          </section>

          <section>
            <Text size="large">Forced Dark Section</Text>
            <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
              <Stack gap="base">
                <Text>Forced dark body text</Text>
                <InlineLabel color="red">Past due</InlineLabel>
              </Stack>
            </AtlantisThemeContextProvider>
          </section>

          <section>
            <Text size="large">Overrides (Dynamic)</Text>
            <AtlantisThemeContextProvider overrideTokens={overrideTokens}>
              <Stack gap="base">
                <Text>Overridden body text color</Text>
                <InlineLabel color="red">Past due</InlineLabel>
              </Stack>
            </AtlantisThemeContextProvider>
          </section>

          <section>
            <Text size="large">Overrides (Forced Dark)</Text>
            <AtlantisThemeContextProvider
              dangerouslyOverrideTheme="dark"
              overrideTokens={overrideTokens}
            >
              <Stack gap="base">
                <Text>Overridden text inside forced dark</Text>
                <InlineLabel color="red">Past due</InlineLabel>
              </Stack>
            </AtlantisThemeContextProvider>
          </section>
        </Stack>
      </Box>
    </div>
  );
};
