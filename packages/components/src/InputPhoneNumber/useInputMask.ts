import { useCallback, useEffect, useMemo, useState } from "react";

interface UseInputMaskParams {
  /**
   * The current value of the input
   */
  value: string;

  /**
   * A pattern to specify the format (e.g. "(***) ***-****")
   */
  pattern: string;

  /**
   * Character in the pattern that will be replaced with input values
   * @default "*"
   */
  delimiter?: string;

  /**
   * Whether to restrict input to the pattern length
   * @default true
   */
  strict?: boolean;

  /**
   * Whether to filter to numeric characters only (useful for phone numbers)
   * @default true
   */
  numericOnly?: boolean;
}

interface UseInputMaskResult {
  /**
   * The formatted value according to the pattern
   */
  formattedValue: string;

  /**
   * The masked placeholder text (portion of pattern not yet filled)
   */
  placeholderMask: string;

  /**
   * Whether masking is currently active
   */
  isMasking: boolean;

  /**
   * Handler for input change events that formats the input
   */
  handleInputChange: (newValue: string) => string;

  /**
   * Raw value without formatting characters
   */
  rawValue: string;

  /**
   * Calculate cursor position after formatting
   */
  getNextCursorPosition: (
    previousPosition: number,
    previousValue: string,
    newValue: string,
  ) => number;
}

/**
 * Hook that handles input masking functionality for formatted inputs
 * like phone numbers, credit cards, etc.
 */
export function useInputMask({
  value,
  pattern,
  delimiter = "*",
  strict = true,
  numericOnly = true,
}: UseInputMaskParams): UseInputMaskResult {
  const [isMasking, setIsMasking] = useState(!value);
  const stringifiedValue = String(value || "");

  // Extract pattern info - memoize to prevent recalculations
  const patternInfo = useMemo(() => {
    const patternChars = pattern.split("");
    const specialChars = patternChars.filter(char => char !== delimiter);
    const maxCleanChars = patternChars.filter(
      char => char === delimiter,
    ).length;

    return {
      patternChars,
      specialChars,
      maxCleanChars,
    };
  }, [pattern, delimiter]);

  // Get raw value (without formatting characters)
  const rawValue = useMemo(() => {
    return stringifiedValue
      .split("")
      .filter(char => !patternInfo.specialChars.includes(char))
      .join("");
  }, [stringifiedValue, patternInfo.specialChars]);

  // Memoize formatValue to prevent recreating on each render
  const formatValue = useCallback(
    (inputValue: string): string => {
      const { patternChars, specialChars, maxCleanChars } = patternInfo;

      // Clean the input value by removing special characters
      let cleanValueChars = inputValue
        .split("")
        .filter(char => !specialChars.includes(char));

      // Apply numeric-only filter if enabled
      if (numericOnly) {
        cleanValueChars = cleanValueChars.filter(char => /^\d$/.test(char));
      }

      const isOverCharLimit = cleanValueChars.length > maxCleanChars;

      // Don't update state during render - will be handled in useEffect
      if (!strict && isOverCharLimit) {
        return cleanValueChars.join("");
      } else {
        // Format the value according to the pattern using a fresh copy of cleanValueChars
        // to avoid mutation during reduce
        const formattedValue = patternChars.reduce(
          getMaskedValue([...cleanValueChars], specialChars),
          "",
        );

        return formattedValue;
      }
    },
    [patternInfo, strict, numericOnly],
  );

  // Memoize the handler to prevent recreating on each render
  const handleInputChange = useCallback(
    (newValue: string): string => {
      return formatValue(newValue);
    },
    [formatValue],
  );

  // Memoize formatted value to prevent recalculation on each render
  const formattedValue = useMemo(
    () => formatValue(stringifiedValue),
    [formatValue, stringifiedValue],
  );

  // Update masking state based on the raw value length
  useEffect(() => {
    // isMasking is true if the number of raw chars is less than the max allowed
    const maxCleanChars = patternInfo.patternChars.filter(
      char => char === delimiter,
    ).length;
    setIsMasking(rawValue.length < maxCleanChars);
  }, [rawValue, patternInfo, delimiter]); // Depend on rawValue now

  // Create a placeholder mask showing the unfilled portion of the pattern
  const placeholderMask = useMemo(
    () =>
      pattern
        .replace(new RegExp(`\\${delimiter}`, "g"), "_")
        .slice(stringifiedValue.length),
    [pattern, delimiter, stringifiedValue],
  );

  /**
   * Helper to calculate the next cursor position after formatting
   */
  const getNextCursorPosition = useCallback(
    (
      previousPosition: number,
      previousValue: string,
      newValue: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): number => {
      // Simple case: if at end, keep at end
      if (previousPosition >= previousValue.length) {
        // If at end, keep at end (use actual formatted value)
        return formattedValue.length;
      }

      // Count special chars up to cursor position in the old value
      const specialCharsBeforeCursor = countSpecialChars(
        previousValue.substring(0, previousPosition),
        patternInfo.specialChars,
      );

      // Count raw chars up to cursor position
      const rawCharsBeforeCursor = previousPosition - specialCharsBeforeCursor;

      // Find the position in the new value with the same number of raw chars
      let rawCharCount = 0;
      let newPosition = 0;

      while (
        rawCharCount < rawCharsBeforeCursor &&
        newPosition < formattedValue.length
      ) {
        if (!patternInfo.specialChars.includes(formattedValue[newPosition])) {
          rawCharCount++;
        }
        newPosition++;
      }

      return newPosition;
    },
    [formattedValue, patternInfo.specialChars],
  );

  return {
    formattedValue,
    placeholderMask,
    isMasking,
    handleInputChange,
    rawValue,
    getNextCursorPosition,
  };
}

/**
 * Helper function to apply the masked value formatting
 */
function getMaskedValue(cleanVal: string[], specialChars: string[]) {
  return (result: string, nextCharacter: string) => {
    if (!cleanVal.length) return result;
    if (specialChars.includes(nextCharacter)) return result + nextCharacter;

    const nextValue = cleanVal.shift();

    return result + (nextValue !== undefined ? nextValue : "");
  };
}

/**
 * Count special characters in a string
 */
function countSpecialChars(str: string, specialChars: string[]): number {
  return str.split("").filter(char => specialChars.includes(char)).length;
}
