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

  /**
   * Change the locale of the components. This updates the strings that comes
   * with the components, updates the date and time formats, and/or the
   * native 3rd-party packages.
   *
   * @default "en"
   */
  readonly locale: string;

  /**
   * The `setHeaderHeight` method allows you to set the height of the app header in Atlantis.
   * Adjusting this height is essential for ensuring the correct positioning and alignment of various elements within the app.
   * By setting this value accurately, Atlantis can dynamically adjust the layout of its components based on the specified header height.
   */
  readonly setHeaderHeight: (height: number) => void;
}

export const atlantisContextDefaultValues: AtlantisContextProps = {
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
  setHeaderHeight: _ => {
    return;
  },
};

export const AtlantisContext = createContext(atlantisContextDefaultValues);

export function useAtlantisContext(): AtlantisContextProps {
  return useContext(AtlantisContext);
}
