import React from "react";
import { FormField, FormFieldProps } from "../FormField";

export interface RegionSettings {
  countryCode?: number;
  format: string;
  mask: string;
}

export interface AllowedRegions {
  NorthAmerica: RegionSettings;
  GreatBritain: RegionSettings;
  Unknown: RegionSettings;
}

const REGION_SETTINGS: AllowedRegions = {
  NorthAmerica: { countryCode: 1, format: "(###) ###-####", mask: "_" },
  // Allows a max of 12 digits (not including country code) which is the max in the UK.
  GreatBritain: { countryCode: 44, format: "############", mask: "" },
  // Allowing for up to 16 digits. That should be enough for all numbers
  Unknown: { format: "################", mask: "" },
};

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
    const countryCodeString = getDisplayedCountryCode(settings);
    return {
      format: `${countryCodeString}${settings.format}`,
      allowEmptyFormatting: alwaysShowMask,
      mask: settings.mask,
    };
  }
}
