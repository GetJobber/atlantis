import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useDebounce } from "@jobber/hooks";
import {
  Autocomplete,
  type MenuAction,
  type MenuFooter,
  type MenuHeader,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Icon, type IconNames } from "@jobber/components/Icon";
import { InputText } from "@jobber/components/InputText";
import { Modal } from "@jobber/components/Modal";
import { Button } from "@jobber/components/Button";
import { Emphasis } from "@jobber/components/Emphasis";
import { Flex } from "@jobber/components/Flex";
import { Typography } from "@jobber/components/Typography";
import { AutocompleteV2Docgen } from "./V2.docgen";

export default {
  title: "Components/Forms and Inputs/Autocomplete/Web (v2)",
  component: AutocompleteV2Docgen,
  argTypes: {
    clearable: {
      control: { type: "select" },
      options: ["never", "while-editing", "always"],
    },
    size: { control: { type: "select" }, options: ["small", "base", "large"] },
  },
  args: {
    clearable: "never",
    openOnFocus: true,
    allowFreeForm: false,
    disabled: false,
    readOnly: false,
    size: undefined,
    debounce: 300,
    placeholder: "Search for a service",
  },
} as ComponentMeta<typeof AutocompleteV2Docgen>;

// Larger demo data (migrated from v1 file)
const simpleOptions: OptionLike[] = [
  { label: "Drain Cleaning" },
  { label: "Pipe Replacement" },
  { label: "Sewer Line Repair" },
  { label: "Seasonal Refreshment" },
  { label: "Window Cleaning" },
  { label: "Roof Inspection" },
  { label: "Flooring Installation" },
  { label: "Baseboard Installation" },
  { label: "HVAC Repair" },
  { label: "HVAC Installation" },
];

const simpleOptionsSecondSection: OptionLike[] = [
  { label: "Grout Cleaning" },
  { label: "Tile Cleaning" },
  { label: "Lock Repair" },
  { label: "Window Repair" },
  { label: "Door Repair" },
];

const simpleOptionsThirdSection: OptionLike[] = [
  { label: "Yard Work" },
  { label: "Lawn Care" },
  { label: "Tree Removal" },
  { label: "Snow Removal" },
  { label: "Gutter Cleaning" },
];

interface ServiceOption extends OptionLike {
  description: string;
  details: string;
  price: number;
  id: React.Key;
}

const serviceOptions: ServiceOption[] = [
  {
    label: "Drain Cleaning",
    description: "Clear drains of accumulated debris and build up",
    details: "Recommended every 3 months",
    price: 100,
    id: "dc1",
  },
  {
    label: "Pipe Replacement",
    description: "Replace old poly-b pipes with new PVC",
    details: "Recommended every 10 years",
    price: 10_000,
    id: "pr1",
  },
  {
    label: "Sewer Line Repair",
    description: "Repair damaged sewer lines",
    details: "Recommended every 10 years",
    price: 2000,
    id: "slr1",
  },
];

const flatOptions: OptionLike[] = [
  { label: "Drain Cleaning" },
  { label: "Pipe Replacement" },
  { label: "Sewer Line Repair" },
  { label: "Window Cleaning" },
];

const sectionedMenu = defineMenu<OptionLike>([
  { type: "section", label: "Indoor", options: simpleOptions },
  {
    type: "section",
    label: "Outdoor",
    options: simpleOptionsSecondSection,
  },
  {
    type: "section",
    label: "Extras",
    options: simpleOptionsThirdSection,
  },
]);

const TemplateFlat: ComponentStory<typeof Autocomplete> = args => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Flat, default layout</Heading>
      <Autocomplete
        {...args}
        version={2}
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={[{ type: "options", options: flatOptions }]}
      />
    </Content>
  );
};

const TemplateSectioned: ComponentStory<typeof Autocomplete> = args => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Sectioned</Heading>
      <Autocomplete
        {...args}
        version={2}
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={sectionedMenu}
      />
    </Content>
  );
};

const TemplateWithActions: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Section with Actions</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={defineMenu<OptionLike>([
          {
            type: "section",
            label: "Services",
            options: simpleOptions,
            actions: [
              {
                type: "action",
                label: "Add Service",
                onClick: () => alert("Add Service"),
              },
            ],
          },
          {
            type: "section",
            label: "Outdoor",
            options: simpleOptionsSecondSection,
            actions: [
              {
                type: "action",
                label: "Add Outdoor Service",
                onClick: () => alert("Add Outdoor Service"),
              },
            ],
          },
          {
            type: "section",
            label: "Extras",
            options: simpleOptionsThirdSection,
            actions: [
              {
                type: "action",
                label: "Add Extras Service",
                onClick: () => alert("Add Extras Service"),
              },
            ],
          },
        ])}
      />
    </Content>
  );
};

const TemplateEmptyStateAndActions: ComponentStory<
  typeof Autocomplete
> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState("");

  return (
    <>
      <Content>
        <Heading level={4}>Empty state with empty action</Heading>
        <Autocomplete
          version={2}
          placeholder="Try a term with no matches"
          value={value}
          onChange={setValue}
          inputValue={inputValue}
          onInputChange={setInputValue}
          emptyStateMessage="No services found"
          emptyActions={[
            {
              type: "action",
              label: "Create service",
              onClick: () => setModalOpen(true),
            },
          ]}
          menu={[{ type: "options", options: simpleOptions }]}
        />
      </Content>
      <Modal open={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <Content>
          <Heading level={4}>Create service</Heading>
          <InputText
            value={serviceValue}
            onChange={(val: string) => setServiceValue(val)}
          />
          <Button label="Create" onClick={() => setModalOpen(false)} />
        </Content>
      </Modal>
    </>
  );
};

const TemplateCustomRenderOption: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<ServiceOption | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Custom option renderer</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        UNSAFE_styles={{
          option: {
            borderBottom: "1px solid var(--color-border)",
          },
        }}
        menu={defineMenu<ServiceOption>([
          { type: "options", options: serviceOptions },
        ])}
        customRenderOption={({ value: v, isSelected }) => (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {isSelected && <Icon name="checkmark" />}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text variation={"default"}>{v.label}</Text>
              <Text variation="subdued">{v.details}</Text>
              <Emphasis variation="bold">${v.price}</Emphasis>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Text variation="subdued">{v.description}</Text>
            </div>
          </div>
        )}
      />
    </Content>
  );
};

const TemplateHeaderFooter: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Persistent header/footer actions</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={defineMenu<OptionLike>([
          { type: "header", label: "Pinned header", shouldClose: false },
          { type: "options", options: simpleOptions },
          {
            type: "footer",
            label: "Pinned footer",
            onClick: () => alert("Footer"),
          },
        ])}
      />
    </Content>
  );
};

const TemplateFreeForm: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Free-form create</Heading>
      <Autocomplete
        version={2}
        placeholder="Type anything"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        allowFreeForm
        createFreeFormValue={label => ({ label })}
        menu={defineMenu<OptionLike>([
          { type: "options", options: simpleOptions },
        ])}
      />
      <Text>Try typing an option not in the list, and blurring the input</Text>
      <Heading level={5}>Selected value: {value?.label}</Heading>
    </Content>
  );
};

// Helpers for async story
const withKeys = (opts: OptionLike[], prefix: string): OptionLike[] =>
  opts.map((o, i) => ({ ...o, key: o.key ?? `${prefix}-${o.label}-${i}` }));

const SERVICE_DATASET: OptionLike[] = [
  ...withKeys(simpleOptions, "indoor"),
  ...withKeys(simpleOptionsSecondSection, "outdoor"),
  ...withKeys(simpleOptionsThirdSection, "extras"),
  { label: "Lawn Mowing", key: "seed-lawn-mowing" },
  { label: "Pressure Washing", key: "seed-pressure-washing" },
  { label: "House Cleaning", key: "seed-house-cleaning" },
  { label: "Pest Control", key: "seed-pest-control" },
  { label: "Deck Staining", key: "seed-deck-staining" },
  { label: "Fence Repair", key: "seed-fence-repair" },
  { label: "Gutter Repair", key: "seed-gutter-repair" },
  { label: "Appliance Installation", key: "seed-appliance-installation" },
];

const INITIAL_OPTIONS: OptionLike[] = SERVICE_DATASET.slice(0, 12);

const SERVICE_TEMPLATES: string[] = [
  "Lawn Mowing",
  "Gutter Repair",
  "Pressure Washing",
  "Fence Painting",
  "Garage Cleanup",
  "Window Tinting",
  "Siding Repair",
  "Roof Shingle Replacement",
  "Driveway Sealing",
  "Tile Regrouting",
  "Deck Refinishing",
  "Concrete Patching",
];

const generateQueryOptions = (query: string): OptionLike[] => {
  const raw = query.trim();
  if (!raw) return INITIAL_OPTIONS;

  const q = raw.toLowerCase();
  const cap = raw.charAt(0).toUpperCase() + raw.slice(1);

  return SERVICE_TEMPLATES.slice(0, 10).map((service, i) => ({
    label: `${cap} ${service}`,
    key: `gen-${q}-${i}`,
  }));
};

const fakeFetch = (query: string): Promise<OptionLike[]> => {
  const latency = 400 + Math.floor(Math.random() * 400);

  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(generateQueryOptions(query));
    }, latency);
  });
};

const TemplateAsyncUserManaged: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OptionLike[]>(INITIAL_OPTIONS);
  const [loading, setLoading] = useState(false);

  // Track requests to avoid race conditions from stale responses
  const requestIdRef = useRef(0);
  // Track when a selection was just made to avoid triggering a new search
  const selectionJustMadeRef = useRef(false);

  const debouncedSearch = useDebounce(async (query: string) => {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const results = await fakeFetch(query);
      if (currentRequestId !== requestIdRef.current) return;
      setOptions(results);
    } finally {
      if (currentRequestId === requestIdRef.current) setLoading(false);
    }
  }, 300);

  const handleInputChange = (next: string) => {
    setInputValue(next);

    // Skip triggering a search if the input change was caused by a selection
    if (selectionJustMadeRef.current) {
      selectionJustMadeRef.current = false;

      return;
    }

    if (!next.trim()) {
      setOptions(INITIAL_OPTIONS);
      setLoading(false);

      return;
    }

    debouncedSearch(next);
  };

  return (
    <Content>
      <Heading level={4}>Async user-managed options</Heading>
      <Autocomplete
        version={2}
        placeholder="Type to search"
        value={value}
        onChange={newValue => {
          setValue(newValue);
          // Mark that a selection occurred so the next inputValue change doesn't trigger a new search
          selectionJustMadeRef.current = true;

          // Ensure the selected option is present in the list when the menu is re-opened
          if (newValue) {
            setOptions([
              newValue,
              ...INITIAL_OPTIONS.filter(o => o.key !== newValue.key),
            ]);
          } else {
            setOptions(INITIAL_OPTIONS);
          }
        }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        // We manage filtering and debouncing ourselves
        filterOptions={false}
        debounce={0}
        loading={loading}
        emptyStateMessage="No services found"
        isOptionEqualToValue={(option, selected) => option.key === selected.key}
        menu={defineMenu<OptionLike>([{ type: "options", options }])}
      />
    </Content>
  );
};

interface CustomOption extends OptionLike {
  description: string;
}

interface ActionExtraProps {
  icon?: IconNames;
}

const customOptions: CustomOption[] = [
  {
    label: "Drain Cleaning",
    description: "Clear drains of accumulated debris and build up",
  },
  {
    label: "Pipe Replacement",
    description: "Replace old poly-b pipes with new PVC",
  },
  { label: "Sewer Line Repair", description: "Repair damaged sewer lines" },
  {
    label: "Window Cleaning",
    description: "Clean windows of accumulated debris and build up",
  },
  {
    label: "Roof Inspection",
    description: "Inspect roofs for damage and wear",
  },
];

const customOptions2: CustomOption[] = [
  {
    label: "Lawn Mowing",
    description: "Mow the lawn",
  },
  {
    label: "Gutter Repair",
    description: "Repair damaged gutters",
  },
  { label: "Pressure Washing", description: "Pressure wash the house" },
  {
    label: "Fence Painting",
    description: "Paint the fence",
  },
  {
    label: "Garage Cleanup",
    description: "Clean the garage",
  },
];

const customActions: MenuAction<ActionExtraProps>[] = [
  {
    type: "action",
    label: "Add Service",
    icon: "plus",
    onClick: () => alert("Add"),
  },
];

const customActions2: MenuAction<ActionExtraProps>[] = [
  {
    type: "action",
    label: "Add Other",
    icon: "plus",
    onClick: () => alert("Add"),
  },
];

const customHeader: MenuHeader<ActionExtraProps> = {
  type: "header",
  label: "The prices of each service is in CAD",
};

const emptyActions: MenuAction<ActionExtraProps>[] = [
  {
    type: "action",
    label: "Favorite",
    icon: "star",
    onClick: () => alert("Add"),
  },
];

const customFooter: MenuFooter<ActionExtraProps> = {
  type: "footer",
  label: "Adjust prices",
  icon: "edit",
  onClick: () => alert("Footer"),
};

interface SectionExtraProps {
  icon: IconNames;
}

const sectionedMenuCustomized = defineMenu<
  CustomOption,
  SectionExtraProps,
  ActionExtraProps
>([
  {
    type: "section",
    label: "Indoor",
    icon: "home",
    options: customOptions,
    actions: customActions,
  },
  {
    type: "section",
    label: "Off-site",
    icon: "fuel",
    options: customOptions2,
    actions: customActions2,
  },
  customHeader,
  customFooter,
]);

const TemplateEverythingCustomized: ComponentStory<
  typeof Autocomplete
> = () => {
  const [value, setValue] = useState<CustomOption | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Everything customized</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={sectionedMenuCustomized}
        emptyActions={emptyActions}
        filterOptions={(options, searchTerm) => {
          return options.filter(option => {
            // Search both label and description
            return (
              option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
              option.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          });
        }}
        customRenderAction={({ origin, value: actionValue }) => {
          if (origin === "empty") {
            return (
              <Flex template={["shrink", "grow"]}>
                {actionValue.icon ? <Icon name={actionValue.icon} /> : null}
                <Typography textColor="interactive">
                  {actionValue.label}
                </Typography>
              </Flex>
            );
          }

          const iconName = actionValue.icon;

          return (
            <Flex template={["shrink", "grow"]}>
              {iconName ? <Icon name={iconName} /> : null}
              <Typography textColor="interactive">
                {actionValue.label}
              </Typography>
            </Flex>
          );
        }}
        customRenderHeader={({ value: headerValue }) => {
          return <Emphasis variation="italic">{headerValue.label}</Emphasis>;
        }}
        customRenderFooter={({ value: footerValue }) => {
          return (
            <Flex template={["shrink", "grow"]}>
              {footerValue.icon ? <Icon name={footerValue.icon} /> : null}
              <Typography textColor="interactive">
                {footerValue.label}
              </Typography>
            </Flex>
          );
        }}
        customRenderSection={sectionValue => {
          return (
            <Flex template={["shrink", "grow"]}>
              <Icon name={sectionValue.icon} />
              <Typography fontWeight="bold">{sectionValue.label}</Typography>
            </Flex>
          );
        }}
        customRenderOption={({ value: optionValue, isSelected }) => {
          return (
            <Flex template={["grow", "shrink"]}>
              {isSelected ? (
                <Emphasis variation="bold">{optionValue.label}</Emphasis>
              ) : (
                <Text>{optionValue.label}</Text>
              )}
              {isSelected ? (
                <Emphasis variation="bold">{optionValue.description}</Emphasis>
              ) : (
                <Text>{optionValue.description}</Text>
              )}
            </Flex>
          );
        }}
        customRenderInput={({ inputRef, inputProps }) => {
          return (
            <InputText
              ref={inputRef}
              {...inputProps}
              size="small"
              suffix={{
                icon: "search",
                ariaLabel: "Search",
                onClick: () => alert("Search"),
              }}
            />
          );
        }}
      />
    </Content>
  );
};

export const Flat = TemplateFlat.bind({});
export const Sectioned = TemplateSectioned.bind({});
export const WithActions = TemplateWithActions.bind({});
export const EmptyStateAndActions = TemplateEmptyStateAndActions.bind({});
export const CustomRenderOption = TemplateCustomRenderOption.bind({});
export const HeaderFooter = TemplateHeaderFooter.bind({});
export const FreeForm = TemplateFreeForm.bind({});
export const AsyncUserManaged = TemplateAsyncUserManaged.bind({});
export const EverythingCustomized = TemplateEverythingCustomized.bind({});
