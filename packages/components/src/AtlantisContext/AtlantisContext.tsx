/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";

export interface AtlantisContextProps {
  /**
   * The date format Atlantis components would use
   */
  readonly dateFormat: string;

  /**
   * The time format Atlantis components would use
   */
  readonly timeFormat: string;

  /**
   * Time zone used in converting the date and time formats
   */
  readonly timeZone: string;

  /**
   * Grabs the decimal separator and group separator based on locale
   */
  readonly floatSeparators: Record<"decimal" | "group", string>;

  /**
   * The currency symbol Atlantis components will use
   */
  readonly currencySymbol: string;

  /**
   * Change the locale of the components. This updates the strings that comes
   * with the components, updates the date and time formats, and/or the
   * native 3rd-party packages.
   *
   * @default "en"
   */
  readonly locale: string;
}

export const atlantisContextDefaultValues: AtlantisContextProps = {
  dateFormat: "P",
  // The system time is "p"
  timeFormat: "p",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  floatSeparators: { group: ",", decimal: "." },
  currencySymbol: "$",
  locale: "en",
};

export const AtlantisContext = createContext(atlantisContextDefaultValues);

export function useAtlantisContext(): AtlantisContextProps {
  return useContext(AtlantisContext);
}
