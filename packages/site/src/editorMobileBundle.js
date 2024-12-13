/**
 *
 * Associated to editorMobileBundle.rollup.config.ts one level up.
 *
 * This is the bundle file that is loaded into the iframe when the user clicks on the "Mobile" tab in the Live Editor.
 *
 * These are all the things that we make available to the iframe.
 *
 * All of Jobber Components,
 * some of the hooks we use (export more if needed + rebuild),
 * and the React/ReactDOM that we use.
 *
 */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { View } from "react-native-web";
import { Modalize } from "react-native-modalize";
import { IntlProvider } from "react-intl";
import { useFormState, useIsMounted } from "@jobber/hooks";

window.React = React;
window.ReactDOM = ReactDOM;
window.IntlProvider = IntlProvider;

export * from "@jobber/components-native";
export * from "react-native-portalize";

export {
  ReactDOM,
  forwardRef,
  React,
  Modalize,
  useRef,
  useFormState,
  useIsMounted,
  useEffect,
  useState,
  View,
  IntlProvider,
};
