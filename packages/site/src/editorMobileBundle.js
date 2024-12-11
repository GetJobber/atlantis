import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { View } from "react-native-web";
import { Modalize } from "react-native-modalize";
import { IntlProvider } from "react-intl";

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
  useEffect,
  useState,
  View,
  IntlProvider,
};
