import { Box, Grid, Heading, Link, Stack, Text } from "@jobber/components";

export const VisualTestCatchAll = () => {
  const visualTests = [
    { path: "components", label: "Components" },
    { path: "layout", label: "Layout" },
    { path: "modal", label: "Modal" },
    { path: "datalist", label: "Data List" },
    { path: "autocomplete", label: "Autocomplete" },
    { path: "card", label: "Card" },
    { path: "chip", label: "Chip" },
    { path: "chips", label: "Chips" },
    { path: "combobox", label: "Combobox" },
    { path: "datepicker", label: "Date Picker" },
    { path: "description-list", label: "Description List" },
    { path: "disclosure", label: "Disclosure" },
    { path: "divider", label: "Divider" },
    { path: "emphasis", label: "Emphasis" },
    { path: "drawer", label: "Drawer" },
    { path: "feature-switch", label: "Feature Switch" },
    { path: "form-field", label: "Form Field" },
    { path: "gallery", label: "Gallery" },
    { path: "glimmer", label: "Glimmer" },
    { path: "grid", label: "Grid" },
    { path: "heading", label: "Heading" },
    { path: "icon", label: "Icon" },
    { path: "inline-label", label: "Inline Label" },
    { path: "input-date", label: "Input Date" },
    { path: "input-email", label: "Input Email" },
    { path: "input-file", label: "Input File" },
    { path: "input-group", label: "Input Group" },
    { path: "input-number", label: "Input Number" },
    { path: "input-password", label: "Input Password" },
    { path: "input-phone-number", label: "Input Phone Number" },
    { path: "input-text", label: "Input Text" },
    { path: "input-time", label: "Input Time" },
    { path: "input-validation", label: "Input Validation" },
    { path: "lightbox", label: "Light Box" },
    { path: "link", label: "Link" },
    { path: "list", label: "List" },
    { path: "markdown", label: "Markdown" },
    { path: "menu", label: "Menu" },
    { path: "popover", label: "Popover" },
    { path: "progress-bar", label: "Progress Bar" },
    { path: "radio-group", label: "Radio Group" },
    { path: "segmented-control", label: "Segmented Control" },
    { path: "select", label: "Select" },
    { path: "side-drawer", label: "Side Drawer" },
    { path: "spinner", label: "Spinner" },
    { path: "switch", label: "Switch" },
    { path: "table", label: "Table" },
    { path: "data-table", label: "Data Table" },
    { path: "tabs", label: "Tabs" },
    { path: "toast", label: "Toast" },
    { path: "tooltip", label: "Tooltip" },
    { path: "typography", label: "Typography" },
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Visual Test Pages</Heading>
        <Text>Click on any component below to view its visual test page.</Text>

        <Grid>
          {visualTests.map(test => (
            <Grid.Cell key={test.path} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Box padding="small">
                <Link url={`/visual-tests/${test.path}`}>{test.label}</Link>
              </Box>
            </Grid.Cell>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};
