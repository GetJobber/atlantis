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
        </Stack>
      </Box>
    </div>
  );
};
