import {
  Box,
  Button,
  Grid,
  Heading,
  IconNames,
  Menu,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestMenuPage = () => {
  const basicItems = [
    {
      label: "Section 1",
      actions: [
        { label: "Item 1", onPress: () => console.log("Item 1 clicked") },
        { label: "Item 2", onPress: () => console.log("Item 2 clicked") },
      ],
    },
  ];

  const complexItems = [
    {
      label: "Actions",
      actions: [
        {
          label: "Edit",
          icon: "edit" as IconNames,
          onPress: () => console.log("Edit clicked"),
        },
        {
          label: "Delete",
          icon: "trash" as IconNames,
          onPress: () => console.log("Delete clicked"),
          destructive: true,
        },
      ],
    },
    {
      label: "More Options",
      actions: [
        {
          label: "Share",
          icon: "arrowRight" as IconNames,
          onPress: () => console.log("Share clicked"),
        },
        {
          label: "Download",
          icon: "arrowDown" as IconNames,
          onPress: () => console.log("Download clicked"),
        },
      ],
    },
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Menu Examples</Heading>

        <Stack gap="large">
          {/* Basic Menu */}
          <section>
            <Text size="large">Basic Menu</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Menu items={basicItems} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Menu with Custom Activator */}
          <section>
            <Text size="large">Menu with Custom Activator</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Menu
                  items={basicItems}
                  activator={<Button label="Open Menu" icon="menu" />}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Menu with Icons and Sections */}
          <section>
            <Text size="large">Menu with Icons and Sections</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Menu items={complexItems} />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
