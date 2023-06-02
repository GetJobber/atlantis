import React from "react";
import {
  EdgeInsets,
  Rect,
  SafeAreaProvider,
} from "react-native-safe-area-context";

interface MockSafeAreaProviderProps {
  children: React.ReactNode;
  frame?: Rect;
  insets?: EdgeInsets;
}

export function MockSafeAreaProvider({
  frame,
  insets,
  children,
}: MockSafeAreaProviderProps): JSX.Element {
  const initialFrame: Rect = { x: 0, y: 0, width: 0, height: 0 };
  const initialInsets: EdgeInsets = { bottom: 50, top: 50, left: 0, right: 0 };

  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: frame || initialFrame,
        insets: insets || initialInsets,
      }}
    >
      {children}
    </SafeAreaProvider>
  );
}
