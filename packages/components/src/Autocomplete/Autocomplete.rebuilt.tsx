import React, { Ref, forwardRef } from "react";
import { AutocompleteProposedProps, OptionLike } from "./Autocomplete.types";
import { InputTextRef } from "../InputText";

function AutocompleteRebuiltInternal<Value extends OptionLike = OptionLike>(
  { ...props }: AutocompleteProposedProps<Value>,
  ref: Ref<InputTextRef>,
) {
  console.log(ref);
  console.log("yeah");
  console.log(props);

  return <div data-testid="ATL-AutocompleteRebuilt">AutocompleteRebuilt</div>;
}

export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal);
