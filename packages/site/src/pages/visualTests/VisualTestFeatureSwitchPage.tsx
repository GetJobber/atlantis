import {
  Box,
  FeatureSwitch,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestFeatureSwitchPage = () => {
  const [isBasicEnabled, setIsBasicEnabled] = useState(false);
  const [isControlledEnabled, setIsControlledEnabled] = useState(false);
  const [isEditableEnabled, setIsEditableEnabled] = useState(false);

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>FeatureSwitch Examples</Heading>

        <Stack space="large">
          {/* Basic FeatureSwitch */}
          <section>
            <Text size="large">Basic FeatureSwitch</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <FeatureSwitch
                  title="Basic Feature"
                  description="This is a basic feature switch that can be toggled on and off."
                  enabled={isBasicEnabled}
                  onSwitch={setIsBasicEnabled}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* FeatureSwitch with Save Indicator */}
          <section>
            <Text size="large">FeatureSwitch with Save Indicator</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <FeatureSwitch
                  title="Auto-save Feature"
                  description="This feature switch shows a save indicator when toggled."
                  enabled={isControlledEnabled}
                  onSwitch={setIsControlledEnabled}
                  hasSaveIndicator={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* FeatureSwitch with Edit Button */}
          <section>
            <Text size="large">FeatureSwitch with Edit Button</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <FeatureSwitch
                  title="Editable Feature"
                  description="This feature switch includes an edit button for additional configuration."
                  enabled={isEditableEnabled}
                  onSwitch={setIsEditableEnabled}
                  onEdit={() => alert("Edit button clicked!")}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Disabled FeatureSwitch */}
          <section>
            <Text size="large">Disabled FeatureSwitch</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <FeatureSwitch
                  title="Disabled Feature"
                  description="This feature switch is disabled and cannot be interacted with."
                  enabled={false}
                  disabled={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* FeatureSwitch with Markdown Description */}
          <section>
            <Text size="large">FeatureSwitch with Markdown Description</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <FeatureSwitch
                  title="Rich Text Feature"
                  description="This description supports _italic_, **bold**, and [external links](https://example.com)."
                  enabled={false}
                  externalLink={true}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
