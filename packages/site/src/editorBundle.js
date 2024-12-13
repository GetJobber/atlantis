/**
 *
 * Associated to editorBundle.rollup.config.ts one level up.
 *
 * This is the bundle file that is loaded into the iframe when the user clicks on the "Web" tab in the Live Editor.
 *
 * These are all the things that we make available to the iframe.
 *
 * All of Jobber Components,
 * some of the hooks we use (export more if needed + rebuild),
 * and the React/ReactDOM that we use.
 *
 */

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFormState } from "@jobber/hooks";

window.React = React;
window.ReactDOM = ReactDOM;

export * from "@jobber/components";

export { React, ReactDOM, useEffect, useRef, useState, useFormState };
