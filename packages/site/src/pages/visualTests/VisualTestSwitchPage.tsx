import {
  AtlantisThemeContextProvider,
  Box,
  Cluster,
  Heading,
  Stack,
  Switch,
  Text,
  useAtlantisTheme,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestSwitchPage = () => {
  const [namedValue, setNamedValue] = useState(false);

  const { theme } = useAtlantisTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Switch Examples</Heading>

        <Stack gap="larger">
          <Heading level={2}>States</Heading>
          <Cluster>
            <Text>On</Text>
            <Switch value={true} ariaLabel="Toggle notifications" />
          </Cluster>
          <Cluster>
            <Text>Off</Text>
            <Switch value={false} ariaLabel="Toggle notifications" />
          </Cluster>
          <Cluster>
            <Text>On & disabled</Text>
            <Switch disabled value={true} ariaLabel="Toggle notifications" />
          </Cluster>
          <Cluster>
            <Text>Off & disabled</Text>
            <Switch disabled value={false} ariaLabel="Toggle notifications" />
          </Cluster>

          <Heading level={2}>Inverse theme</Heading>
          <div>
            <AtlantisThemeContextProvider
              dangerouslyOverrideTheme={inverseTheme}
            >
              <Box background="surface" gap="larger" padding="large">
                <Cluster>
                  <Text>On</Text>
                  <Switch value={true} ariaLabel="Toggle notifications" />
                </Cluster>
                <Cluster>
                  <Text>Off</Text>
                  <Switch value={false} ariaLabel="Toggle notifications" />
                </Cluster>
                <Cluster>
                  <Text>On & disabled</Text>
                  <Switch
                    disabled
                    value={true}
                    ariaLabel="Toggle notifications"
                  />
                </Cluster>
                <Cluster>
                  <Text>Off & disabled</Text>
                  <Switch
                    disabled
                    value={false}
                    ariaLabel="Toggle notifications"
                  />
                </Cluster>
              </Box>
            </AtlantisThemeContextProvider>
          </div>

          <Heading level={2}>With named label</Heading>
          <Cluster>
            <div>
              <label htmlFor="namedSwitch">Enable notifications</label>
            </div>
            <Switch
              value={namedValue}
              onChange={setNamedValue}
              name="namedSwitch"
            />
          </Cluster>
        </Stack>
      </Stack>
    </Box>
  );
};
