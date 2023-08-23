/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { DEFAULT_CURRENCY_SYMBOL } from "../InputCurrency/constants";

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
   * Determines how the component behaves when the app is online or offline.
   * This is set to `true` by default. If your usage doesn't require a different
   * experience, you can leave this as-is.
   */
  readonly isOnline: boolean;

  /**
   * Log errors to rollbar
   */
  readonly onLogError: (message: string) => void;

  /**
   * Grabs the decimal separator and group separator based on locale
   */
  readonly floatSeparators: Record<"decimal" | "group", string>;

  /**
   * The currency symbol Atlantis components will use
   */
  readonly currencySymbol: string;

  /**
   * The `headerHeight` property represents the height of the app header in Atlantis.
   * It plays a crucial role in determining the positioning of various elements within the app.
   * By accurately defining this value, Atlantis can effectively calculate the layout and alignment of its components.
   */
  readonly headerHeight: number;

  readonly locale: string;
}

export const defaultValues: AtlantisContextProps = {
  dateFormat: "PP",
  // The system time is "p"
  timeFormat: "p",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  isOnline: true,
  onLogError: _ => {
    return;
  },
  floatSeparators: { group: ",", decimal: "." },
  currencySymbol: DEFAULT_CURRENCY_SYMBOL,
  headerHeight: 0,
  locale: "en",
};

export const AtlantisContext = createContext(defaultValues);

export function useAtlantisContext(): AtlantisContextProps {
  return useContext(AtlantisContext);
}
