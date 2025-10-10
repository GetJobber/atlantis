import {
  Box,
  Button,
  Grid,
  Heading,
  InputText,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestInputTextPage = () => {
  const [value, setValue] = useState("");
  const [multilineValue, setMultilineValue] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

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

          {/* Multiline InputText with toolbar */}
          <Stack>
            <Text size="large">Multiline InputText with toolbar</Text>
            <InputText
              value={buttonClicked ? "Button was clicked" : ""}
              name="Toolbar example"
              multiline={true}
              placeholder="Toolbar example"
              rows={{ min: 1, max: 5 }}
              toolbar={
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    label="Rewrite"
                    size="small"
                    icon="sparkles"
                    fullWidth={false}
                  />
                  <Button
                    ariaLabel="Undo"
                    size="small"
                    icon="redo"
                    type="tertiary"
                    fullWidth={false}
                  />
                </div>
              }
            />
            <div>
              <Button
                label="Test toolbar stays open"
                onClick={() => setButtonClicked(true)}
              />
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
