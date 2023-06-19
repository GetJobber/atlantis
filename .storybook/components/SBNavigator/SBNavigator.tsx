import React, { Fragment } from "react";
import {
  NavigationHelpersContext,
  TabRouter,
  createNavigatorFactory,
  useNavigationBuilder,
} from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleSheet, StyleSheetProperties } from "react-native";

export const createSBNavigator = createNavigatorFactory(SBNavigator);

interface SBNavigatorProps {
  initialRouteName: string;
  children: JSX.Element;
  screenOptions: Record<string, unknown>;
}

function SBNavigator({
  initialRouteName,
  children,
  screenOptions,
}: SBNavigatorProps) {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const styles = {
    bar: {
      padding: "8px 16px",
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "max-content auto max-content",
    },
  };

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      {state.routes.map(route => {
        const options: StackNavigationOptions = descriptors[route.key].options;

        // if there's no title or headerLeft, don't render the app bar
        if (!options.headerLeft || !options.title) {
          return <Fragment key={route.key} />;
        }

        return (
          <div
            key={route.key}
            style={{
              ...(StyleSheet.flatten([
                options.headerStyle,
              ]) as StyleSheetProperties),
              ...styles.bar,
            }}
          >
            {options.headerLeft?.({ label: "hello" })}
            <div
              style={{
                ...(StyleSheet.flatten([
                  options.headerTitleStyle,
                ]) as StyleSheetProperties),
                color: options.headerTintColor,
                textAlign: options.headerTitleAlign,
              }}
            >
              {options.title}
            </div>
            {options.headerRight?.({ tintColor: options.headerTintColor })}
          </div>
        );
      })}

      {state.routes.map(route => {
        return <div key={route.key}>{descriptors[route.key].render()}</div>;
      })}
    </NavigationHelpersContext.Provider>
  );
}
