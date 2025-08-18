import type { ReactNode, RefObject } from "react";
import React, { useState } from "react";
import type { NativeMethods, View } from "react-native";
import { AccessibilityInfo, findNodeHandle } from "react-native";
import { ErrorMessageContext } from "./ErrorMessageContext";
import type {
  Element,
  ErrorMessageContextProps,
  ErrorMessageContextRegisterParams,
} from "./types";

interface ErrorMessageProviderProps {
  readonly children: ReactNode;
}

export function ErrorMessageProvider({
  children,
}: ErrorMessageProviderProps): JSX.Element {
  const [elements, setElements] = useState<
    ErrorMessageContextProps["elements"]
  >({});

  return (
    <ErrorMessageContext.Provider
      value={{
        elements,
        register: handleRegister,
        unregister: handleUnregister,
      }}
    >
      {children}
    </ErrorMessageContext.Provider>
  );

  function handleRegister({
    id,
    ref,
    hasErrorMessage,
  }: ErrorMessageContextRegisterParams) {
    elements[id] = {
      measure: getMeasure(ref),
      accessibilityFocus: getAccessibilityFocus(ref),
      hasErrorMessage,
    };
    setElements(elements);
  }

  function handleUnregister(id: Element["id"]) {
    delete elements[id];
    setElements(elements);
  }
}

function getMeasure(ref: RefObject<View>) {
  return function measure(...args: Parameters<NativeMethods["measureLayout"]>) {
    ref.current?.measureLayout(...args);
  };
}

function getAccessibilityFocus(ref: RefObject<View>) {
  return function accessibilityFocus() {
    const reactTag = findNodeHandle(ref.current);
    reactTag &&
      setTimeout(() => {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }, 0);
  };
}
