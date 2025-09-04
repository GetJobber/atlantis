import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFormState } from "@jobber/hooks";
import { updateTheme } from "@jobber/components/AtlantisThemeContext";

window.React = React;
window.ReactDOM = ReactDOM;
window.updateTheme = updateTheme;

export * from "@jobber/components";
// Force the Autocomplete export to use the package subpath which contains the runtime shim
// that switches between v1 and v2 based on the `version` prop. The root export currently
// points at the legacy-only build.
export { Autocomplete } from "@jobber/components/Autocomplete";

export { React, ReactDOM, useEffect, useRef, useState, useFormState };
