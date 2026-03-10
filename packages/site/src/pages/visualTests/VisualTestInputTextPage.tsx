import { Box, Grid, Heading, InputText, Stack, Text } from "@jobber/components";
import { useState } from "react";

export const VisualTestInputTextPage = () => {
  const [value, setValue] = useState("");
  const [multilineValue, setMultilineValue] = useState("");
  const [multilineResizeValue, setMultilineResizeValue] = useState(
    "First line of text\nSecond line of text\nThird line of text",
  );
  const [multilineResizeV2Value, setMultilineResizeV2Value] = useState(
    "First line of text\nSecond line of text\nThird line of text",
  );

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>InputText Examples</Heading>

        <Stack gap="large">
          {/* Basic InputText */}
          <section>
            <Text size="large">Basic InputText</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="Enter text"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputText with validation */}
          <section>
            <Text size="large">InputText with validation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="Required field"
                  validations={{ required: "This field is required" }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputText with description */}
          <section>
            <Text size="large">InputText with description</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With description"
                  description="This is a helpful description"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Disabled InputText */}
          <section>
            <Text size="large">Disabled InputText</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value="Disabled input"
                  onChange={newValue => setValue(newValue as string)}
                  disabled={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multiline InputText */}
          <section>
            <Text size="large">Multiline InputText</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={multilineValue}
                  onChange={newValue => setMultilineValue(newValue as string)}
                  placeholder="Enter multiple lines"
                  multiline={true}
                  rows={{ min: 3, max: 6 }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputText with prefix and suffix */}
          <section>
            <Text size="large">InputText with prefix and suffix</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With prefix and suffix"
                  prefix={{ icon: "search", label: "Search" }}
                  suffix={{ icon: "trash", label: "Clear" }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Text size="large">InputText v1 with maxLength</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With maxLength"
                  maxLength={200}
                />
              </Grid.Cell>
            </Grid>
          </section>
          <section>
            <Text size="large">InputText v1 (multiline) with maxLength</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  multiline={true}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With maxLength"
                  maxLength={200}
                />
              </Grid.Cell>
            </Grid>
          </section>
          <section>
            <Text size="large">InputText v2 with maxLength</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  version={2}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With maxLength"
                  maxLength={200}
                />
              </Grid.Cell>
            </Grid>
          </section>
          <section>
            <Text size="large">InputText v2 (multiline) with maxLength</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={value}
                  version={2}
                  multiline={true}
                  onChange={newValue => setValue(newValue as string)}
                  placeholder="With maxLength"
                  maxLength={200}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Multiline InputText for resize testing.
              The Playwright test will programmatically resize the wrapper
              to verify text stays anchored to the top. */}
          <section data-testid="multiline-resize-section">
            <Text size="large">Multiline InputText (resize test)</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={multilineResizeValue}
                  onChange={newValue =>
                    setMultilineResizeValue(newValue as string)
                  }
                  placeholder="Resize me"
                  multiline={true}
                  rows={{ min: 3, max: 10 }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section data-testid="multiline-resize-v2-section">
            <Text size="large">Multiline InputText v2 (resize test)</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputText
                  value={multilineResizeV2Value}
                  version={2}
                  onChange={newValue =>
                    setMultilineResizeV2Value(newValue as string)
                  }
                  placeholder="Resize me (v2)"
                  multiline={true}
                  rows={{ min: 3, max: 10 }}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
