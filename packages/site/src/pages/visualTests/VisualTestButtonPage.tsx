import {
  Box,
  Button,
  Cluster,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";

const TYPES = ["primary", "secondary", "tertiary"] as const;
const VARIATIONS = ["work", "learning", "subtle", "destructive"] as const;
const SIZES = ["small", "base", "large"] as const;

export const VisualTestButtonPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Button Visual Tests</Heading>

        {/* Type × Variation - Non-composable */}
        <section>
          <Text size="large">Types × Variations (non-composable)</Text>
          <Stack gap="base">
            {TYPES.map(type => (
              <Box key={type}>
                <Text variation="subdued">{type}</Text>
                <Cluster gap="base">
                  {VARIATIONS.map(variation => (
                    <Button
                      key={`${type}-${variation}`}
                      label={`${type} ${variation}`}
                      type={type}
                      variation={variation}
                    />
                  ))}
                </Cluster>
              </Box>
            ))}
          </Stack>
        </section>

        {/* Type × Variation - Composable */}
        <section>
          <Text size="large">Types × Variations (composable)</Text>
          <Stack gap="base">
            {TYPES.map(type => (
              <Box key={type}>
                <Text variation="subdued">{type}</Text>
                <Cluster gap="base">
                  {VARIATIONS.map(variation => (
                    <Button
                      key={`${type}-${variation}`}
                      type={type}
                      variation={variation}
                    >
                      <Button.Label>{`${type} ${variation}`}</Button.Label>
                    </Button>
                  ))}
                </Cluster>
              </Box>
            ))}
          </Stack>
        </section>

        {/* Sizes - Non-composable */}
        <section>
          <Text size="large">Sizes (non-composable)</Text>
          <Cluster gap="base">
            {SIZES.map(size => (
              <Button
                key={size}
                label={`${size} button`}
                type="primary"
                variation="work"
                size={size}
              />
            ))}
          </Cluster>
        </section>

        {/* Sizes - Composable */}
        <section>
          <Text size="large">Sizes (composable)</Text>
          <Cluster gap="base">
            {SIZES.map(size => (
              <Button key={size} type="primary" variation="work" size={size}>
                <Button.Label>{`${size} button`}</Button.Label>
              </Button>
            ))}
          </Cluster>
        </section>

        {/* Icons by size: icon left/right, composable/non-composable for each size */}
        <section>
          <Text size="large">
            Icons by size (left/right, composable/non-composable)
          </Text>
          {SIZES.map(size => (
            <Box key={size} padding="base">
              <Text variation="subdued">
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Text>
              <Stack gap="base">
                <Grid>
                  <Grid.Cell size={{ xs: 12, md: 6 }}>
                    <Text variation="subdued">Icon left – non-composable</Text>
                    <Cluster gap="base">
                      <Button
                        label="Add item"
                        type="primary"
                        variation="work"
                        size={size}
                        icon="add"
                      />
                      <Button
                        label="Add item"
                        type="secondary"
                        variation="work"
                        size={size}
                        icon="add"
                      />
                    </Cluster>
                  </Grid.Cell>
                  <Grid.Cell size={{ xs: 12, md: 6 }}>
                    <Text variation="subdued">Icon left – composable</Text>
                    <Cluster gap="base">
                      <Button type="primary" variation="work" size={size}>
                        <Button.Icon name="add" />
                        <Button.Label>Add item</Button.Label>
                      </Button>
                      <Button type="secondary" variation="work" size={size}>
                        <Button.Icon name="add" />
                        <Button.Label>Add item</Button.Label>
                      </Button>
                    </Cluster>
                  </Grid.Cell>
                </Grid>
                <Grid>
                  <Grid.Cell size={{ xs: 12, md: 6 }}>
                    <Text variation="subdued">Icon right – non-composable</Text>
                    <Cluster gap="base">
                      <Button
                        label="Next"
                        type="primary"
                        variation="work"
                        size={size}
                        icon="arrowRight"
                        iconOnRight
                      />
                      <Button
                        label="Next"
                        type="secondary"
                        variation="work"
                        size={size}
                        icon="arrowRight"
                        iconOnRight
                      />
                    </Cluster>
                  </Grid.Cell>
                  <Grid.Cell size={{ xs: 12, md: 6 }}>
                    <Text variation="subdued">Icon right – composable</Text>
                    <Cluster gap="base">
                      <Button type="primary" variation="work" size={size}>
                        <Button.Label>Next</Button.Label>
                        <Button.Icon name="arrowRight" />
                      </Button>
                      <Button type="secondary" variation="work" size={size}>
                        <Button.Label>Next</Button.Label>
                        <Button.Icon name="arrowRight" />
                      </Button>
                    </Cluster>
                  </Grid.Cell>
                </Grid>
              </Stack>
            </Box>
          ))}
        </section>

        {/* Icon only */}
        <section>
          <Text size="large">Icon only (ariaLabel)</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <Button
                  icon="cog"
                  ariaLabel="Settings"
                  type="primary"
                  variation="work"
                />
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <Button type="primary" variation="work" ariaLabel="Settings">
                  <Button.Icon name="cog" />
                </Button>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Loading state */}
        <section>
          <Text size="large">Loading state</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <Button
                  label="Loading"
                  type="primary"
                  variation="work"
                  loading
                />
                <Button
                  label="Loading"
                  type="secondary"
                  variation="work"
                  loading
                />
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <Button type="primary" variation="work" loading>
                  <Button.Label>Loading</Button.Label>
                </Button>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Disabled state */}
        <section>
          <Text size="large">Disabled state</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <Button
                  label="Disabled"
                  type="primary"
                  variation="work"
                  disabled
                />
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <Button type="primary" variation="work" disabled>
                  <Button.Label>Disabled</Button.Label>
                </Button>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Loading with icon */}
        <section>
          <Text size="large">Loading with icon</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <Button
                  label="Saving"
                  type="primary"
                  variation="work"
                  icon="add"
                  loading
                />
                <Button
                  label="Saving"
                  type="secondary"
                  variation="work"
                  icon="add"
                  loading
                />
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <Button type="primary" variation="work" loading>
                  <Button.Icon name="add" />
                  <Button.Label>Saving</Button.Label>
                </Button>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Full width */}
        <section>
          <Text size="large">Full width</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Stack gap="base">
                <Button
                  label="Full width primary"
                  type="primary"
                  variation="work"
                  fullWidth
                />
                <Button
                  label="Full width with icon"
                  type="secondary"
                  variation="work"
                  icon="add"
                  fullWidth
                />
              </Stack>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Stack gap="base">
                <Button type="primary" variation="work" fullWidth>
                  <Button.Icon name="add" />
                  <Button.Label>Full width composable</Button.Label>
                </Button>
              </Stack>
            </Grid.Cell>
          </Grid>
        </section>

        {/* As link (url) */}
        <section>
          <Text size="large">As link (url)</Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <Button
                  label="Link button"
                  type="primary"
                  variation="work"
                  url="#"
                />
                <Button
                  label="External link"
                  type="secondary"
                  variation="work"
                  url="https://example.com"
                  external
                />
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <Button type="primary" variation="work" url="#">
                  <Button.Icon name="arrowRight" />
                  <Button.Label>Composable link</Button.Label>
                </Button>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Button text wrapping to two lines */}
        <section>
          <Text size="large">Button text wrapping</Text>
          <Text variation="subdued">
            Narrow container to force label wrap (non-composable and composable)
          </Text>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Non-composable</Text>
              <Cluster gap="base">
                <div style={{ maxWidth: 180 }}>
                  <Button
                    label="Schedule follow-up visit"
                    type="primary"
                    variation="work"
                    fullWidth
                  />
                </div>
                <div style={{ maxWidth: 180 }}>
                  <Button
                    label="Schedule follow-up visit"
                    type="secondary"
                    variation="work"
                    fullWidth
                  />
                </div>
              </Cluster>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Text variation="subdued">Composable</Text>
              <Cluster gap="base">
                <div style={{ maxWidth: 180 }}>
                  <Button type="primary" variation="work" fullWidth>
                    <Button.Label>Schedule follow-up visit</Button.Label>
                  </Button>
                </div>
                <div style={{ maxWidth: 180 }}>
                  <Button type="secondary" variation="work" fullWidth>
                    <Button.Label>Schedule follow-up visit</Button.Label>
                  </Button>
                </div>
              </Cluster>
            </Grid.Cell>
          </Grid>
        </section>
      </Stack>
    </Box>
  );
};
