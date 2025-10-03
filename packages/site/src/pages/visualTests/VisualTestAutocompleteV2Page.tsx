import { Box, Grid, Heading, Stack, Text } from "@jobber/components";
import {
  Autocomplete,
  type AutocompleteRebuiltProps,
  type OptionLike,
} from "@jobber/components/Autocomplete";
import { useMemo, useState } from "react";

type OptionV2 = OptionLike;
type MenuItemsV2 = AutocompleteRebuiltProps<OptionV2, false>["menu"];

function AutoV2Demo({
  placeholder,
  menu,
  initialValue,
  initialInputValue,
  loading,
  emptyStateMessage,
  disabled,
}: {
  readonly placeholder: string;
  readonly menu: AutocompleteRebuiltProps<OptionV2, false>["menu"];
  readonly initialValue?: OptionV2;
  readonly initialInputValue?: string;
  readonly loading?: boolean;
  readonly emptyStateMessage?: React.ReactNode | false;
  readonly disabled?: boolean;
}) {
  const [value, setValue] = useState<OptionV2 | undefined>(initialValue);
  const [inputValue, setInputValue] = useState<string>(
    initialInputValue ?? initialValue?.label ?? "",
  );

  return (
    <Autocomplete
      version={2}
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      inputValue={inputValue}
      onInputChange={setInputValue}
      menu={menu}
      loading={loading}
      emptyStateMessage={emptyStateMessage}
      disabled={disabled}
    />
  );
}

export const VisualTestAutocompleteV2Page = () => {
  const flatOptions = useMemo<OptionV2[]>(
    () => [
      { label: "Drain Cleaning" },
      { label: "Pipe Replacement" },
      { label: "Sewer Line Repair" },
      { label: "Window Cleaning" },
    ],
    [],
  );

  const flatOnlyMenu: MenuItemsV2 = useMemo(
    () => [{ type: "options", options: flatOptions }],
    [flatOptions],
  );

  const flatWithActionsMenu: MenuItemsV2 = useMemo(
    () => [
      {
        type: "options",
        options: flatOptions,
        actions: [
          {
            type: "action",
            label: "Create new",
            onClick: () => console.log("Create new clicked"),
          },
          {
            type: "action",
            label: "Browse templates",
            onClick: () => console.log("Browse templates clicked"),
          },
        ],
      },
    ],
    [flatOptions],
  );

  const flatWithFooterMenu: MenuItemsV2 = useMemo(
    () => [
      { type: "options", options: flatOptions },
      {
        type: "footer",
        label: "Interactive Footer",
        onClick: () => console.log("Footer clicked"),
      },
    ],
    [flatOptions],
  );

  const sectionedOnlyMenu: MenuItemsV2 = useMemo(
    () => [
      { type: "section", label: "Indoor", options: flatOptions },
      { type: "section", label: "Outdoor", options: flatOptions },
    ],
    [flatOptions],
  );

  const sectionedWithActionsMenu: MenuItemsV2 = useMemo(
    () => [
      {
        type: "section",
        label: "Indoor",
        options: flatOptions,
        actions: [
          {
            type: "action",
            label: "Create new",
            onClick: () => console.log("Create new clicked"),
          },
        ],
      },
      {
        type: "section",
        label: "Outdoor",
        options: flatOptions,
        actions: [
          {
            type: "action",
            label: "Browse templates",
            onClick: () => console.log("Browse templates clicked"),
          },
        ],
      },
    ],
    [flatOptions],
  );

  const sectionedWithHeaderFooterMenu: MenuItemsV2 = useMemo(
    () => [
      { type: "header", label: "Persistent Text Header" },
      {
        type: "section",
        label: "Indoor",
        options: flatOptions,
        actions: [
          {
            type: "action",
            label: "Create new",
            onClick: () => console.log("Create new clicked"),
          },
        ],
      },
      {
        type: "section",
        label: "Outdoor",
        options: flatOptions,
      },
      {
        type: "footer",
        label: "Interactive Footer",
        onClick: () => console.log("Footer clicked"),
      },
    ],
    [flatOptions],
  );

  const emptySimpleMenu: MenuItemsV2 = useMemo(
    () => [{ type: "options", options: [] }],
    [],
  );

  const emptyWithHeaderFooterMenu: MenuItemsV2 = useMemo(
    () => [
      { type: "header", label: "No results header" },
      { type: "options", options: [] },
      {
        type: "footer",
        label: "Add new item",
        onClick: () => console.log("Add new item clicked"),
      },
    ],
    [],
  );

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Autocomplete v2 (rebuilt)</Heading>

        <Stack gap="large">
          <section>
            <Text size="large">Flat lists</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo placeholder="Flat: options" menu={flatOnlyMenu} />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Flat: options + actions"
                  menu={flatWithActionsMenu}
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Flat: options + footer action"
                  menu={flatWithFooterMenu}
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Text size="large">Sectioned lists</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Sectioned: options only"
                  menu={sectionedOnlyMenu}
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Sectioned: options + actions"
                  menu={sectionedWithActionsMenu}
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Sectioned: header + options + actions + footer action"
                  menu={sectionedWithHeaderFooterMenu}
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Text size="large">States</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Loading state"
                  menu={flatOnlyMenu}
                  loading
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Empty: simple (no header/footer)"
                  menu={emptySimpleMenu}
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Empty: text header + interactive footer"
                  menu={emptyWithHeaderFooterMenu}
                />
              </Grid.Cell>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Disabled state"
                  menu={flatOnlyMenu}
                  disabled
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Text size="large">With selection</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <AutoV2Demo
                  placeholder="Flat: with selection"
                  menu={flatOnlyMenu}
                  initialValue={{ label: "Pipe Replacement" }}
                  initialInputValue="Pipe Replacement"
                />
              </Grid.Cell>
            </Grid>
          </section>

          <section>
            <Text size="large">Constrained space (flip/size behavior)</Text>
            <div
              style={{
                position: "relative",
                height: 260,
                border: "1px dashed var(--color-border)",
                borderRadius: "var(--radius-base)",
                overflow: "hidden",
              }}
            >
              <div
                style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}
              >
                <AutoV2Demo
                  placeholder="Constrained: near bottom"
                  menu={flatOnlyMenu}
                />
              </div>
            </div>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
