/**
 * This file polyfills any missing APIs from react-native-web with our own stubs.
 *
 * If you see an error like "The requested module ... does not provide an export named '...'",
 * then that's a sign you likely need to stub that export within this file.
 */
import type { InputAccessoryViewProps } from "react-native";

export * from "react-native-web";

export function PlatformColor() {
  return undefined;
}

export function InputAccessoryView({ children }: InputAccessoryViewProps) {
  return children;
}

export function requireNativeComponent() {
  return null;
}

export function findNodeHandle() {
  return null;
}
