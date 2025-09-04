import type React from "react";
import type {
  AnyOption,
  AutocompleteLegacyProps,
  Option,
} from "@jobber/components/Autocomplete";

// Concrete, non-overloaded v1 props for docgen
export type V1DocgenProps = AutocompleteLegacyProps<
  AnyOption,
  Option,
  AnyOption
>;

// No runtime render: used only for Storybook prop extraction
export const AutocompleteV1Docgen: React.FC<V1DocgenProps> = () => null;
