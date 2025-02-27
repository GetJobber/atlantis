import React, { useState } from "react";
import {
  // Need to use iOS style button
  Button,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./SelectDefaultPicker.style";
import { SelectInternalPickerProps } from "../../types";
import { SelectPressable } from "../SelectPressable/SelectPressable";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

type SelectDefaultPickerProps = SelectInternalPickerProps;

export function SelectDefaultPicker({
  children,
  options,
  onChange,
}: SelectDefaultPickerProps): JSX.Element {
  const [show, setShow] = useState(false);
  const { t } = useAtlantisI18n();
  const selectedLanguage = options.find(option => option.isActive);

  return (
    <>
      <SelectPressable onPress={showPicker}>{children}</SelectPressable>
      <Modal
        visible={show}
        transparent
        animationType="slide"
        onRequestClose={hidePicker}
      >
        <TouchableOpacity style={styles.overlay} onPress={hidePicker} />
        <View style={styles.actionBar}>
          <Button title={t("done")} onPress={hidePicker} />
        </View>
        <View style={styles.pickerContainer} testID="select-wheel-picker">
          <SafeAreaView edges={["bottom"]}>
            <Picker
              selectedValue={selectedLanguage?.value}
              onValueChange={onChange}
            >
              {options.map(({ label, value }, i) => (
                <Picker.Item key={i} label={label} value={value} />
              ))}
            </Picker>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );

  function showPicker() {
    setShow(true);
  }

  function hidePicker() {
    setShow(false);
  }
}
