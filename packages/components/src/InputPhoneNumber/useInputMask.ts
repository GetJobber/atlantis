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
   * Callback function to be called with the masked value on change.
   */
  onChange?: (maskedValue: string) => void;
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
   * Handler for input change events that formats the input and calls the onChange prop
   */
  maskedOnChange: (newValue: string) => void;

  /**
   * Raw input value from the user without formatting characters
   */
  inputValue: string;
}

export function useInputMask({
  value = "",
  pattern,
  delimiter = "*",
  strict = true,
  onChange,
}: UseInputMaskParams): UseInputMaskResult {
  const [isMasking, setIsMasking] = useState(!value);

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

  const inputValue = useMemo(() => {
    return value
      .split("")
      .filter(char => !patternInfo.specialChars.includes(char))
      .join("");
  }, [value, patternInfo.specialChars]);

  const formatValue = useCallback(
    (unformattedValue: string): string => {
      const { patternChars, specialChars, maxCleanChars } = patternInfo;

      const cleanValueChars = unformattedValue
        .split("")
        .filter(char => !specialChars.includes(char));

      const isOverCharLimit = cleanValueChars.length > maxCleanChars;

      if (!strict && isOverCharLimit) {
        return cleanValueChars.join("");
      } else {
        const formattedValue = patternChars.reduce(
          getMaskedValue([...cleanValueChars], specialChars),
          "",
        );

        return formattedValue;
      }
    },
    [patternInfo, strict],
  );

  const maskedOnChange = useCallback(
    (newValue: string): void => {
      const formatted = formatValue(newValue);
      onChange?.(formatted);
    },
    [formatValue, onChange],
  );

  const formattedValue = useMemo(
    () => formatValue(value),
    [formatValue, value],
  );

  useEffect(() => {
    const maxCleanChars = patternInfo.patternChars.filter(
      char => char === delimiter,
    ).length;
    setIsMasking(inputValue.length < maxCleanChars);
  }, [inputValue, patternInfo, delimiter]);

  const placeholderMask = useMemo(
    () =>
      pattern
        .replace(new RegExp(`\\${delimiter}`, "g"), "_")
        .slice(value.length),
    [pattern, delimiter, value],
  );

  return {
    formattedValue,
    placeholderMask,
    isMasking,
    maskedOnChange,
    inputValue,
  };
}

function getMaskedValue(cleanVal: string[], specialChars: string[]) {
  return (result: string, nextCharacter: string) => {
    if (!cleanVal.length) return result;
    if (specialChars.includes(nextCharacter)) return result + nextCharacter;

    const nextValue = cleanVal.shift();

    return result + (nextValue !== undefined ? nextValue : "");
  };
}
