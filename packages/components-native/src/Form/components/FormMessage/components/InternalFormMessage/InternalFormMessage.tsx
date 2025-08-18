import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useStyles } from "./InternalFormMessage.style";
import type { EmptyStateProps } from "../../../../../EmptyState";
import { EmptyState } from "../../../../../EmptyState";
import { useAtlantisI18n } from "../../../../../hooks/useAtlantisI18n";

interface FormMessageProps {
  readonly data: EmptyStateProps;
  readonly onRequestClose: () => void;
}

export function InternalFormMessage({
  data,
  onRequestClose,
}: FormMessageProps): JSX.Element {
  const { t } = useAtlantisI18n();
  const styles = useStyles();
  const emptyStateData: EmptyStateProps = useMemo(() => {
    if (data.secondaryAction) {
      return data;
    } else {
      return {
        ...data,
        secondaryAction: {
          label: t("goBack"),
          onPress: onRequestClose,
        },
      };
    }
  }, [data, t, onRequestClose]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            style={styles.scrollWrapper}
            contentContainerStyle={styles.scrollWrapperContent}
            centerContent={true}
          >
            <EmptyState {...emptyStateData} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
