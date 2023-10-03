/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from "react";
import { cleanup, renderHook } from "@testing-library/react-hooks";
import {
  AtlantisContext,
  AtlantisContextProps,
  atlantisContextDefaultValues,
  useAtlantisContext,
} from "./AtlantisContext";

afterEach(cleanup);

const providerValues: AtlantisContextProps = {
  dateFormat: "MM/DD/YYYY",
  timeFormat: "hh:mm a",
  timeZone: "America/Edmonton",
  locale: "en",
  isOnline: false,
  onLogError: _ => {
    return;
  },
  floatSeparators: { decimal: ".", group: "," },
  currencySymbol: "€",
  headerHeight: 50,
  setHeaderHeight: _ => {
    return;
  },
};

describe("AtlantisContext", () => {
  describe("No Provider", () => {
    it("should get the default values", () => {
      const { result } = renderHook(() => useAtlantisContext());

      expect(result.current).toMatchObject(atlantisContextDefaultValues);
    });
  });

  describe("With Provider", () => {
    it("should get the provider values", () => {
      const { result } = renderHook(() => useAtlantisContext(), {
        wrapper: ({ children }: PropsWithChildren) => (
          <AtlantisContext.Provider value={providerValues}>
            {children}
          </AtlantisContext.Provider>
        ),
      });

      expect(result.current).toMatchObject(providerValues);
    });
  });
});
