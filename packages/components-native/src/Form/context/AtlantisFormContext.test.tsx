import type { PropsWithChildren } from "react";
import React from "react";
import { renderHook } from "@testing-library/react-native";
import type { AtlantisFormContextProps } from "./types";
import {
  AtlantisFormContext,
  atlantisFormContextDefaultValues,
  useAtlantisFormContext,
} from "./AtlantisFormContext";

const useConfirmBeforeBackMock = jest.fn();
const useInternalFormLocalCacheMock = jest.fn();

const providerValues: AtlantisFormContextProps = {
  useConfirmBeforeBack: useConfirmBeforeBackMock,
  useInternalFormLocalCache: useInternalFormLocalCacheMock,
};

describe("AtlantisFormContext", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("No Provider", () => {
    it("should get the default values", () => {
      const { result } = renderHook(() => useAtlantisFormContext());

      expect(result.current).toMatchObject(atlantisFormContextDefaultValues);
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
