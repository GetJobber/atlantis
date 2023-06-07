import { Platform } from "react-native";
import {
  SelectInternalPickerProps,
  SelectOnOptionPressEvent,
} from "../../types";

export function handlePress(onChange: SelectInternalPickerProps["onChange"]) {
  return ({ nativeEvent: { event } }: SelectOnOptionPressEvent): void => {
    return onChange(event);
  };
}

export function isIOS14AndUp(): boolean {
  if (Platform.OS === "ios") {
    const majorVersionIOS = parseInt(Platform.Version, 10);
    return majorVersionIOS >= 14;
  }

  return false;
}
