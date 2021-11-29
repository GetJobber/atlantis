import React from "react";
import { FormField, FormFieldProps } from "../FormField";

export interface RegionSettings {
  countryCode?: number;
  format?: string;
}

export interface AllowedRegions {
  NorthAmerica: RegionSettings;
  GreatBritain: RegionSettings;
  Unknown: RegionSettings;
}

const REGION_SETTINGS: AllowedRegions = {
  NorthAmerica: { countryCode: 1, format: "(###) ###-####" },
  GreatBritain: { countryCode: 44 },
  Unknown: {},
};

// should it be form field or common form field?
export interface InputPhoneNumberProps extends FormFieldProps {
  alwaysShowMask?: boolean;
  region?: keyof AllowedRegions;
  placeholder?: string;
  showCountryCode?: boolean;
}

export function InputPhoneNumber({
  region = "NorthAmerica",
  placeholder,
  alwaysShowMask = true,
  showCountryCode = false,
  ...rest
}: InputPhoneNumberProps) {
  const regionSettings = REGION_SETTINGS[region];

  return (
    <FormField
      value={rest.value}
      onChange={rest.onChange}
      type="maskedNumber"
      maskingProperties={getMaskingProperties(regionSettings)}
      placeholder={placeholder}
      {...rest}
    />
  );

  function getDisplayedCountryCode(settings: RegionSettings) {
    if (showCountryCode && settings.countryCode) {
      return `+${settings.countryCode} `;
    }

    return "";
  }

  function getMaskingProperties(
    settings: RegionSettings,
  ): FormFieldProps["maskingProperties"] {
    const hasFormat = !!settings.format;
    const countryCodeString = getDisplayedCountryCode(regionSettings);

    if (!hasFormat) {
      return {
        prefix: countryCodeString,
      };
    }

    return {
      format: `${countryCodeString}${regionSettings.format}`,
      allowEmptyFormatting: alwaysShowMask,
      mask: "_",
    };
  }
}
