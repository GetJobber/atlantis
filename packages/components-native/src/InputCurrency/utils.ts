export function countDecimal(value: number): number {
  const convertedValue = value.toString();
  if (convertedValue.includes(".")) {
    return convertedValue.split(".")[1].length;
  }

  return 0;
}

export function limitInputWholeDigits(
  value: number,
  maxInputLength: number,
): number {
  let convertedValue = value.toString();
  if (convertedValue.length > maxInputLength) {
    convertedValue = convertedValue.slice(0, maxInputLength);
    return parseFloat(convertedValue);
  }
  return value;
}

export function configureDecimal(
  decimalCount: number,
  maxDecimalPlaces: number,
  transformedValue: string,
  decimalPlaces: number,
): number {
  const targetDecimalPlaces = Math.min(
    Math.max(decimalCount, decimalPlaces),
    maxDecimalPlaces,
  );
  const precision = 10 ** targetDecimalPlaces;
  const convertedValue =
    Math.round(parseFloat(transformedValue) * precision) / precision;
  return convertedValue;
}

export function convertToNumber(value: string): string | number {
  const regexValidation = /^[0-9]*$/;
  if (value?.match?.(regexValidation)) {
    return parseFloat(value);
  }
  return value;
}

export const checkLastChar = (stringValue: string): boolean => {
  const lastChar = stringValue[stringValue.length - 1];
  return Boolean(Number(stringValue)) && lastChar !== "0" && lastChar !== ".";
};

export const isValidNumber = (
  numberedValue: string | number | undefined,
): boolean => {
  return (
    typeof numberedValue === "number" &&
    !isNaN(numberedValue) &&
    numberedValue !== 0
  );
};

export const getDecimalNumbers = (
  value: string,
  decimalSeparator: string,
): string => {
  const decimalValue = value.split(".")[1];

  if (!decimalValue) {
    return decimalSeparator;
  }

  return `${decimalSeparator}${decimalValue}`;
};

export const parseGivenInput = (
  value: string | undefined,
  decimalSeparator: string,
): [number, string | undefined, string] => {
  let decimalCount = 0;
  let decimalNumbers = "";
  let wholeIntegerValue = value;

  if (value?.includes(".")) {
    const splittedValue = value?.split(".");
    decimalCount = splittedValue[1].length;
    wholeIntegerValue = splittedValue[0];
    decimalNumbers = getDecimalNumbers(value, decimalSeparator);
  }
  return [decimalCount, wholeIntegerValue, decimalNumbers];
};

export const NUMBER_VALIDATION_REGEX =
  /^[-+]?(([0-9]*\.[0-9]+)|([0-9]+)|([0-9]+(\.?[0-9]+)?e[-+]?[0-9]+))$/;
