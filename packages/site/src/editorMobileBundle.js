import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { useFormState, useIsMounted } from "@jobber/hooks";

window.React = React;
window.ReactDOM = ReactDOM;

export * from "@jobber/components-native";

export {
  ReactDOM,
  useFormState,
  useIsMounted,
  React,
  useRef,
  useEffect,
  useState,
};
