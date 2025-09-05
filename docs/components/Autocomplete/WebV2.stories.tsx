import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useDebounce } from "@jobber/hooks";
import { Autocomplete } from "@jobber/components/Autocomplete";
import type { OptionLike } from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Icon } from "@jobber/components/Icon";
import { InputText } from "@jobber/components/InputText";
import { Modal } from "@jobber/components/Modal";
import { Button } from "@jobber/components/Button";
import { AutocompleteV2Docgen } from "./V2.docgen";

export default {
  title: "Components/Forms and Inputs/Autocomplete/Web (v2)",
  component: AutocompleteV2Docgen,
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

const sectionedMenu = [
  { type: "section" as const, label: "Indoor", options: simpleOptions },
  {
    type: "section" as const,
    label: "Outdoor",
    options: simpleOptionsSecondSection,
  },
  {
    type: "section" as const,
    label: "Extras",
    options: simpleOptionsThirdSection,
  },
];

const TemplateFlat: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Flat, default layout</Heading>
      <Autocomplete
        version={2}
        placeholder="Search for a service"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={[{ type: "options", options: flatOptions }]}
      />
    </Content>
  );
};

const TemplateSectioned: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Sectioned</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
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
        menu={[
          {
            type: "section" as const,
            label: "Services",
            options: simpleOptions,
            actions: [
              {
                type: "action" as const,
                label: "Add Service",
                onClick: () => alert("Add Service"),
              },
            ],
          },
          {
            type: "section" as const,
            label: "Outdoor",
            options: simpleOptionsSecondSection,
            actions: [
              {
                type: "action" as const,
                label: "Add Outdoor Service",
                onClick: () => alert("Add Outdoor Service"),
              },
            ],
          },
          {
            type: "section" as const,
            label: "Extras",
            options: simpleOptionsThirdSection,
            actions: [
              {
                type: "action" as const,
                label: "Add Extras Service",
                onClick: () => alert("Add Extras Service"),
              },
            ],
          },
        ]}
      />
    </Content>
  );
};

const TemplateEmptyStateAndActions: ComponentStory<
  typeof Autocomplete
> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("zzz");
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
          menu={[{ type: "options", options: [] }]}
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

const noop = () => undefined;

const TemplateLoading: ComponentStory<typeof Autocomplete> = () => (
  <Content>
    <Heading level={4}>Loading</Heading>
    <Autocomplete
      version={2}
      placeholder="Loading..."
      value={undefined}
      onChange={noop}
      inputValue={"Loading..."}
      onInputChange={noop}
      loading
      menu={[]}
    />
  </Content>
);

const TemplateCustomRenderOption: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
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
        menu={[{ type: "options", options: serviceOptions }]}
        customRenderOption={({ value: v, isActive, isSelected }) => (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isSelected && <Icon name="checkmark" />}
            <Text variation={isActive ? "info" : "default"}>{v.label}</Text>
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
        menu={[
          { type: "header", label: "Pinned header", shouldClose: false },
          { type: "options", options: simpleOptions },
          {
            type: "footer",
            label: "Pinned footer",
            onClick: () => alert("Footer"),
          },
        ]}
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
        menu={[{ type: "options", options: simpleOptions }]}
      />
      <Text>Try typing an option not in the list, and blurring the input</Text>
      <Heading level={5}>Selected value: {value?.label}</Heading>
    </Content>
  );
};

const TemplateDebounce0: ComponentStory<typeof Autocomplete> = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Debounce disabled</Heading>
      <Autocomplete
        version={2}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        debounce={0}
        menu={[{ type: "options", options: simpleOptions }]}
      />
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
        menu={[{ type: "options", options }]}
      />
    </Content>
  );
};

export const Flat = TemplateFlat.bind({});
export const Sectioned = TemplateSectioned.bind({});
export const WithActions = TemplateWithActions.bind({});
export const EmptyStateAndActions = TemplateEmptyStateAndActions.bind({});
export const Loading = TemplateLoading.bind({});
export const CustomRenderOption = TemplateCustomRenderOption.bind({});
export const HeaderFooter = TemplateHeaderFooter.bind({});
export const FreeForm = TemplateFreeForm.bind({});
export const DebounceDisabled = TemplateDebounce0.bind({});
export const AsyncUserManaged = TemplateAsyncUserManaged.bind({});
