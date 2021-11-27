import React from "react";
import { FormField, FormFieldProps } from "../FormField";

interface AllowedCountries {
  NorthAmerica: { countryCode: number; format: string };
  GreatBritain: { countryCode: number; format: string };
}
//TODO decide on this number formatting if it is best for the UK
const countries: AllowedCountries = {
  NorthAmerica: { countryCode: 1, format: "(###) ###-####" },
  GreatBritain: { countryCode: 44, format: "(###) #### ####" },
};

// should it be form field or common form field?
interface InputPhoneNumberProps extends FormFieldProps {
  alwaysShowMask?: boolean;
  country: keyof AllowedCountries;
  placeholder?: string;
  showCountryCode?: boolean;
}

export function InputPhoneNumber({
  country,
  placeholder,
  alwaysShowMask = true,
  showCountryCode = false,
  ...rest
}: InputPhoneNumberProps) {
  const displayedCountryCode = showCountryCode
    ? `+${countries[country].countryCode}`
    : "";
  const maskingProperties = {
    allowEmptyFormatting: alwaysShowMask,
    format: `${displayedCountryCode} ${countries[country].format}`,
    mask: "_",
    prefix: `${displayedCountryCode}`,
  };
  return (
    <FormField
      value={rest.value}
      onChange={rest.onChange}
      type="maskedNumber"
      maskingProperties={maskingProperties}
      placeholder={placeholder}
      {...rest}
    />
  );
}
