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

  /**
   * Sets which day is considered the start of the week for calendar components.
   * 0 = Sunday, 1 = Monday, etc.
   *
   * @default 0
   */
  readonly calendarStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export const atlantisContextDefaultValues: AtlantisContextProps = {
  dateFormat: "P",
  // The system time is "p"
  timeFormat: "p",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  floatSeparators: { group: ",", decimal: "." },
  currencySymbol: "$",
  locale: "en",
  calendarStartDay: 0,
};

export const AtlantisContext = createContext(atlantisContextDefaultValues);

export function useAtlantisContext(): AtlantisContextProps {
  return useContext(AtlantisContext);
}
