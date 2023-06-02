import { HostComponent, requireNativeComponent } from "react-native";
import {
  SelectInternalPickerProps,
  SelectOnOptionPressEvent,
} from "../../types";

interface NativeSelectIOSPickerProps
  extends Pick<SelectInternalPickerProps, "options" | "children"> {
  /**
   * Callback when one of the option is pressed
   */
  readonly onOptionPress: (event: SelectOnOptionPressEvent) => void;
}

export const SelectIOSPicker: HostComponent<NativeSelectIOSPickerProps> =
  requireNativeComponent?.<NativeSelectIOSPickerProps>("RCTPicker");
