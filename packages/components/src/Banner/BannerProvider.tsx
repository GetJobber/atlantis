import React, { createContext, useContext, useState } from "react";
import { BannerType } from "./Banner.types";

interface BannerProviderProps {
  readonly type: BannerType;
}

interface BannerContextValue {
  readonly type: BannerType;
  readonly isVisible: boolean;
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
  ...providerProps
}: {
  readonly children: React.ReactNode;
} & BannerProviderProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <BannerContext.Provider
      value={{
        ...providerProps,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}
