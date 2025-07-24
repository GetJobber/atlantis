import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import classnames from "classnames";
import { BannerType } from "./Banner.types";
import styles from "./Banner.module.css";

interface BannerProviderProps {
  /**
   * Sets the status-based theme of the Banner
   */
  readonly type: BannerType;

  /**
   * When provided, Banner's visibility is controlled by this value
   */
  readonly visible?: boolean;
}

interface BannerContextValue {
  /**
   * The status-based theme of the Banner
   */
  readonly type: BannerType;
  /**
   * Whether the Banner is currently visible
   */
  readonly isVisible: boolean;

  /**
   * Sets the visibility of the Banner
   */
  readonly setIsVisible: (visible: boolean) => void;
}

const BannerContext = createContext<BannerContextValue>({
  type: "success",
  isVisible: true,
  setIsVisible: () => {
    // noop
  },
});

export function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({
  children,
  visible,
  type,
}: {
  readonly children: React.ReactNode;
} & BannerProviderProps) {
  const [isVisible, _setIsVisible] = useState(true);
  const showBanner = visible ?? isVisible;

  const setIsVisible = useCallback(
    (newValue: boolean) => {
      // Only update internal visibility if it's not controlled by the parent.
      if (typeof visible === "undefined") {
        _setIsVisible(newValue);
      }
    },
    [visible],
  );

  return (
    <BannerContext.Provider
      value={{
        type,
        isVisible: showBanner,
        setIsVisible,
      }}
    >
      <BannerWrapper>{children}</BannerWrapper>
    </BannerContext.Provider>
  );
}

function BannerWrapper({ children }: PropsWithChildren) {
  const { isVisible, type } = useBanner();

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  const bannerClassNames = classnames(styles.banner, [styles[type]], {
    [styles.medium]: bannerWidth >= bannerWidths.medium,
  });

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className={bannerClassNames}
      role={type === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
