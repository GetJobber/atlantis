import { Autocomplete, Box, Heading, Stack } from "@jobber/components";
import { useCallback, useState } from "react";
import {
  CustomGroupOption,
  CustomOptionForGroup,
} from "./AdvancedAutocomplete";
import { CustomMenuContent, CustomOption } from "./CustomMenuContent";

const AdvancedOptions: CustomOption[] = [
  {
    value: 1,
    label: "Plumbing Tape",
    description: "Plumbing tape is neat",
    cost: 100,
    section: "Products",
  },
  {
    value: 2,
    label: "Electrical Tape",
    description: "Electrical tape is also neat",
    cost: 150.22,
  },
  {
    value: 3,
    label: "Super Tape",
    description: "Super tape is the best",
    cost: 99.99,
  },
  {
    value: 4,
    label: "Plumbing",
    description: "Plumbing is a service",
    cost: 100,
    section: "Services",
  },
  {
    value: 5,
    label: "Super Plumbing",
    description: "Super plumbing is the best",
    cost: 200,
  },
];

const HomeDepotOptions: CustomOption[] = [
  {
    value: 1,
    label: "Home Depot Plumbing Tape",
    description: "Home Depot plumbing tape is neat",
    cost: 120,
    section: "Plumbing",
  },
  {
    value: 2,
    label: "Home Depot Plubming Stumps",
    description: "Home Depot plubming stumps are also neat",
    cost: 110.12,
  },
  {
    value: 3,
    label: "Home Depot Plumbing Welding",
    description: "Home Depot plumbing welding is the best",
    cost: 129.99,
  },
  {
    value: 4,
    label: "Home Depot Electrical Tape",
    description: "Home Depot electrical tape is also neat",
    cost: 120,
    section: "Electical",
  },
  {
    value: 5,
    label: "Home Depot Electrical Welding",
    description: "Home Depot electrical welding is the best",
    cost: 200,
  },
];

export const VisualTestAutocompletePage = () => {
  const [activeType, setActiveType] = useState<string | undefined>("default");
  const [customValue, setCustomValue] = useState<
    CustomOptionForGroup | undefined
  >(undefined);
  const [value, setValue] = useState<CustomOption | undefined>();

  const getOptions = useCallback(
    (text: string) => {
      if (text === "" && activeType === "default") {
        return AdvancedOptions;
      }

      if (text === "" && activeType === "catalog") {
        return HomeDepotOptions;
      }

      if (activeType === "catalog") {
        const filterRegex = new RegExp(text, "i");

        return HomeDepotOptions.filter(
          option =>
            option.label.match(filterRegex) ||
            option.description?.match(filterRegex) ||
            option.cost?.toString().match(filterRegex),
        );
      } else {
        const filterRegex = new RegExp(text, "i");

        return AdvancedOptions.filter(
          option =>
            option.label.match(filterRegex) ||
            option.description?.match(filterRegex) ||
            option.cost?.toString().match(filterRegex),
        );
      }
    },
    [activeType],
  );

  const handleUpdateOptions = (query: { type: string; to: string }) => {
    if (query.to) {
      setActiveType(query.to);
    }

    if (query.type == "switch" && query.to === "catalog") {
      return HomeDepotOptions;
    }

    return AdvancedOptions;
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Autocomplete Examples</Heading>

        <Stack gap="large">
          {/* Autocomplete with Async Options */}

          <section>
            <Autocomplete
              placeholder="Search for something"
              initialOptions={AdvancedOptions}
              value={value}
              onChange={newValue => {
                setValue(newValue);
              }}
              customRenderMenu={props => <CustomMenuContent {...props} />}
              getOptions={getOptions}
              updateOptions={handleUpdateOptions}
            />
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
