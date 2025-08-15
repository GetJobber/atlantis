import { StyleSheet } from "react-native";
import { useMemo } from "react";
import type { AtlantisThemeContextValue } from "./types";
import { useAtlantisTheme } from "./AtlantisThemeContext";

/**
 * Creates a hook that generates themed styles using the current theme tokens.
 * The hook will automatically update the styles when the theme changes.
 *
 * @example
 * ```tsx
 * const useStyles = buildThemedStyles(tokens => ({
 *   container: {
 *     backgroundColor: tokens["color-surface"],
 *     padding: tokens["space-base"],
 *   },
 * }));
 *
 * function MyComponent() {
 *   const styles = useStyles();
 *   return <View style={styles.container} />;
 * }
 * ```
 *
 * @param styleFactory - A function that receives theme tokens and returns a style object
 * @returns A hook function that returns the created styles
 *
 * @note
 * - Styles are memoized and only recalculated when tokens change
 * - Use this for components that need to respond to theme changes
 * - The returned styles are created using StyleSheet.create()
 *
 * @see Related functions: {@link useAtlantisTheme}
 */
export function buildThemedStyles<
  T extends Parameters<typeof StyleSheet.create>[0],
>(styleFactory: (tokens: AtlantisThemeContextValue["tokens"]) => T) {
  return function useStyles() {
    const { tokens } = useAtlantisTheme();

    return useMemo(() => StyleSheet.create(styleFactory(tokens)), [tokens]);
  };
}
