import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { useFormState, useIsMounted } from "@jobber/hooks";
import { View } from "react-native-web";
import { Modalize } from "react-native-modalize";

window.React = React;
window.ReactDOM = ReactDOM;

export * from "@jobber/components-native";
export * from "react-native-portalize";

export {
  ReactDOM,
  useFormState,
  useIsMounted,
  forwardRef,
  React,
  Modalize,
  useRef,
  useEffect,
  useState,
  View,
};
