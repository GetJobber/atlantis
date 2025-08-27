import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Autocomplete } from "@jobber/components/Autocomplete";
import type { OptionLike } from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Icon } from "@jobber/components/Icon";
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
          },
          {
            type: "section" as const,
            label: "Extras",
            options: simpleOptionsThirdSection,
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

  return (
    <Content>
      <Heading level={4}>Empty state with actions</Heading>
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
            onClick: () => alert("Create"),
          },
        ]}
        menu={[{ type: "options", options: [] }]}
      />
    </Content>
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

export const Flat = TemplateFlat.bind({});
export const Sectioned = TemplateSectioned.bind({});
export const WithActions = TemplateWithActions.bind({});
export const EmptyStateAndActions = TemplateEmptyStateAndActions.bind({});
export const Loading = TemplateLoading.bind({});
export const CustomRenderOption = TemplateCustomRenderOption.bind({});
export const HeaderFooter = TemplateHeaderFooter.bind({});
export const FreeForm = TemplateFreeForm.bind({});
export const DebounceDisabled = TemplateDebounce0.bind({});
