import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useIntl } from "react-intl";
import { styles } from "./InternalFormMessage.style";
import { messages } from "./messages";
import { EmptyState, EmptyStateProps } from "../../../../../EmptyState";

interface FormMessageProps {
  readonly data: EmptyStateProps;
  readonly onRequestClose: () => void;
}

export function InternalFormMessage({
  data,
  onRequestClose,
}: FormMessageProps): JSX.Element {
  const { formatMessage } = useIntl();
  const emptyStateData: EmptyStateProps = useMemo(() => {
    if (data.secondaryAction) {
      return data;
    } else {
      return {
        ...data,
        secondaryAction: {
          label: formatMessage(messages.goBackButton),
          onPress: onRequestClose,
        },
      };
    }
  }, [data, formatMessage, onRequestClose]);

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
