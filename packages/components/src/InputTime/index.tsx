import React, { ForwardedRef, forwardRef } from "react";
import { InputTimeLegacy } from "./InputTime"; // Legacy component from original file
import { InputTimeRebuilt } from "./InputTime.rebuilt";
import {
  InputTimeLegacyProps,
  InputTimeProps,
  InputTimeRebuiltProps,
} from "./InputTime.types";
import { InputTextRef } from "../InputText"; // Import InputTextRef for correct ref typing

function isNewInputTimeProps(
  props: InputTimeProps,
): props is InputTimeRebuiltProps {
  return props.version === 2;
}

// Export the types as well
export type { InputTimeProps, InputTimeLegacyProps, InputTimeRebuiltProps };

export const InputTime = forwardRef(function InputTimeShim(
  props: InputTimeProps,
  // The shim receives a ref that could point to either legacy (no ref) or rebuilt
  // Adjust the shim's accepted ref type to match the potential target
  ref: ForwardedRef<HTMLInputElement | InputTextRef>,
) {
  if (isNewInputTimeProps(props)) {
    // Pass the ref directly as its type now matches InputTimeRebuilt's expected type
    return <InputTimeRebuilt {...props} ref={ref} />;
  } else {
    // The legacy component doesn't accept a ref.
    if (ref) {
      console.warn(
        "Ref is not supported for legacy InputTime (version 1). The ref will be ignored.",
      );

      // Attempt to clear the ref if possible, though direct assignment might not work as expected
      if (typeof ref === "function") {
        ref(null);
      } else if (ref) {
        ref.current = null;
      }
    }

    // Cast props to legacy type for the old component
    return <InputTimeLegacy {...(props as InputTimeLegacyProps)} />;
  }
});
