import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFormState } from "@jobber/hooks";
import { updateTheme } from "@jobber/components/AtlantisThemeContext";

window.React = React;
window.ReactDOM = ReactDOM;
window.updateTheme = updateTheme;

export * from "@jobber/components";

export { React, ReactDOM, useEffect, useRef, useState, useFormState };
