import React, { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { AtlantisFormContextProps } from "./types";
import {
  AtlantisFormContext,
  defaultValues,
  useAtlantisFormContext,
} from "./AtlantisFormContext";

const useConfirmBeforeBackMock = jest.fn();
const useInternalFormLocalCacheMock = jest.fn();

const providerValues: AtlantisFormContextProps = {
  useConfirmBeforeBack: useConfirmBeforeBackMock,
  useInternalFormLocalCache: useInternalFormLocalCacheMock,
  headerHeight: 50,
};

describe("AtlantisFormContext", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("No Provider", () => {
    it("should get the default values", () => {
      const { result } = renderHook(() => useAtlantisFormContext());

      expect(result.current).toMatchObject(defaultValues);
    });
  });

  describe("With Provider", () => {
    it("should get the provider values", () => {
      const { result } = renderHook(() => useAtlantisFormContext(), {
        wrapper: ({ children }: PropsWithChildren) => (
          <AtlantisFormContext.Provider value={providerValues}>
            {children}
          </AtlantisFormContext.Provider>
        ),
      });

      expect(result.current).toMatchObject(providerValues);
    });
  });
});
