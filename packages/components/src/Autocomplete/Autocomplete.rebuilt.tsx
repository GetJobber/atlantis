import React, { Ref, RefAttributes, forwardRef } from "react";
import {
  AnyOption,
  AutocompleteRebuiltProps,
  Option,
} from "./Autocomplete.types";
import { InputTextRef } from "../InputText";

function AutocompleteRebuiltInternal<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  {
    ...props
  }: AutocompleteRebuiltProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  console.log(ref);
  console.log(props);

  return <div data-testid="ATL-AutocompleteRebuilt">AutocompleteRebuilt</div>;
}

// Casts the Generics to the forward ref so autocomplete works as expected for consumers
export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteRebuiltProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteRebuiltInternal>;
