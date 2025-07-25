import { createContext, useContext } from "react";
import { BannerType } from "./Banner.types";

interface BannerContextValue {
  /**
   * The status-based theme of the Banner.
   */
  readonly type: BannerType;
  /**
   * Whether the Banner is currently visible.
   */
  readonly isVisible: boolean;

  /**
   * Sets the visibility of the Banner.
   */
  readonly setIsVisible: (visible: boolean) => void;
}

export const BannerContext = createContext<BannerContextValue>({
  type: "success",
  isVisible: true,
  setIsVisible: () => {
    // noop
  },
});

export function useBanner() {
  return useContext(BannerContext);
}
