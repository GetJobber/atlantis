import type React from "react";
import type {
  AutocompleteRebuiltProps,
  OptionLike,
} from "@jobber/components/Autocomplete";

// Local alias to match extra props shape used by v2
type ExtraProps = Record<string, unknown>;

// Concrete v2 props for docgen
export type V2DocgenProps = AutocompleteRebuiltProps<
  OptionLike,
  boolean,
  ExtraProps,
  ExtraProps
>;

// No runtime render: used only for Storybook prop extraction
export const AutocompleteV2Docgen: React.FC<V2DocgenProps> = () => null;
