import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  Platform,
  // eslint-disable-next-line no-restricted-imports
  Button as RNButton,
  View,
  useColorScheme,
} from "react-native";
import { v4 } from "react-native-uuid";
import { InputAccessoriesContext } from "./InputAccessoriesContext";
import { styles } from "./InputAccessoriesProvider.style";

export function InputAccessoriesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const inputAccessoryID = useRef(v4()).current;
  const {
    focusedInput,
    setFocusedInput,
    canFocusNext,
    canFocusPrevious,
    elements,
    setElements,
    previousKey,
    nextKey,
  } = useInputAccessoriesProviderState();

  const colorScheme = useColorScheme();

  return (
    <InputAccessoriesContext.Provider
      value={{
        elements,
        focusedInput,
        canFocusNext,
        canFocusPrevious,
        inputAccessoryID,
        register,
        unregister,
        onFocusNext,
        onFocusPrevious,
        setFocusedInput,
      }}
    >
      {children}
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={inputAccessoryID}>
          <View
            testID="ATL-InputAccessory"
            style={[
              styles.container,
              colorScheme === "dark" ? styles.darkTheme : styles.lightTheme,
            ]}
          >
            <RNButton
              onPress={Keyboard.dismiss}
              title="Done"
              testID="ATL-InputAccessory-Done"
              color={colorScheme === "dark" ? "white" : undefined}
            />
          </View>
        </InputAccessoryView>
      )}
    </InputAccessoriesContext.Provider>
  );

  function register(name: string, onFocus: () => void) {
    elements[name] = onFocus;
    setElements(elements);
  }

  function unregister(name: string) {
    delete elements[name];
    setElements(elements);
  }

  function onFocusNext() {
    const nextElement = elements[nextKey];
    nextElement?.();
  }

  function onFocusPrevious() {
    const previousElement = elements[previousKey];
    previousElement?.();
  }
}

function useInputAccessoriesProviderState() {
  const [focusedInput, setFocusedInput] = useState("");
  const [canFocusNext, setCanFocusNext] = useState(false);
  const [canFocusPrevious, setCanFocusPrevious] = useState(false);
  const [elements, setElements] = useState<Record<string, () => void>>({});

  const keys = Object.keys(elements);
  const selectedIndex = keys.findIndex(key => key === focusedInput);

  const nextKey = keys[selectedIndex + 1];
  const previousKey = keys[selectedIndex - 1];

  useEffect(() => {
    setCanFocusNext(Boolean(nextKey));
    setCanFocusPrevious(Boolean(previousKey));
  }, [previousKey, nextKey]);

  return {
    previousKey,
    nextKey,
    focusedInput,
    setFocusedInput,
    canFocusNext,
    setCanFocusNext,
    canFocusPrevious,
    setCanFocusPrevious,
    elements,
    setElements,
  };
}
