import React from "react";
import type { PropsWithChildren } from "react";
import {
  Text as RNText,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  AtlantisContext,
  AtlantisContextProps,
  Card,
  Heading,
} from "@jobber/components-native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { IntlProvider } from "react-intl";
import { ActionLabelShowCase } from "./components/ActionLabelShowcase";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { InputTextShowcase } from "./components/InputTextShowcase";
import { IconShowcase } from "./components/IconShowcase";
import { ListShowcase } from "./components/ListShowcase";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const defaultValues: AtlantisContextProps = {
  dateFormat: "PP",
  // The system time is "p"
  timeFormat: "p",
  timeZone: "UTC",
  isOnline: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLogError: _ => {
    return;
  },
  floatSeparators: { group: ",", decimal: "." },
  currencySymbol: "$",
  headerHeight: 0,
};

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <RNText
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </RNText>
      <RNText
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </RNText>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <IntlProvider locale="en-us">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AtlantisContext.Provider value={defaultValues}>
            <SafeAreaView style={backgroundStyle}>
              <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
              >
                <View
                  style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                  }}
                >
                  <Section title="Welcome to Atlantis! 🔱">
                    <Heading level="subtitle">
                      This package contains the base set of React components for
                      Atlantis.
                    </Heading>
                  </Section>
                  <Card>
                    <ActionLabelShowCase />
                    <ButtonShowcase />
                    <InputTextShowcase />
                    <IconShowcase />
                    <ListShowcase />
                  </Card>
                </View>
              </ScrollView>
            </SafeAreaView>
          </AtlantisContext.Provider>
        </GestureHandlerRootView>
      </IntlProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

// eslint-disable-next-line import/no-default-export
export default App;
