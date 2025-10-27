import React, { createRef } from "react";
import type { RenderAPI } from "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { act } from "react-test-renderer";
import type { BottomSheetOptionsSuffix } from "./FormatFileBottomSheet";
import { FormatFileBottomSheet } from "./FormatFileBottomSheet";
import type { BottomSheetRef } from "../../../BottomSheet/BottomSheet";

let Platform: { OS: "ios" | "android" };
const onRemove = jest.fn();
const onPreview = jest.fn();
const bottomSheetRef = createRef<BottomSheetRef>();

beforeEach(() => {
  Platform = require("react-native").Platform;
});

const renderBottomSheet = (
  bottomSheetOptionsSuffix: BottomSheetOptionsSuffix,
) => {
  return render(
    <Host>
      <FormatFileBottomSheet
        onPreviewPress={onPreview}
        onRemovePress={onRemove}
        bottomSheetRef={bottomSheetRef}
        bottomSheetOptionsSuffix={bottomSheetOptionsSuffix}
      />
    </Host>,
  );
};

const basicRenderTestWithValue = () => {
  describe.each([["image"], ["receipt"], ["file"], ["video"]])(
    "when FormatFileBottomSheet for %s is opened",
    bottomSheetOptionsSuffix => {
      const previewLabel = `Preview ${bottomSheetOptionsSuffix}`;
      const removeLabel = `Remove ${bottomSheetOptionsSuffix}`;
      let tree: RenderAPI;

      beforeEach(async () => {
        tree = renderBottomSheet(
          bottomSheetOptionsSuffix as BottomSheetOptionsSuffix,
        );
        await act(async () => {
          bottomSheetRef.current?.open();
        });
      });
      afterEach(() => {
        jest.clearAllMocks();
      });

      describe("onPreviewPress", () => {
        it("renders the preview option", async () => {
          const { findByLabelText } = tree;

          expect(await findByLabelText(previewLabel)).toBeDefined();
        });

        it("is called when pressed", async () => {
          const { findByLabelText } = tree;
          fireEvent.press(await findByLabelText(previewLabel));
          expect(onPreview).toHaveBeenCalledTimes(1);
        });
      });

      describe("onRemovePress", () => {
        it("renders the remove option", async () => {
          const { findByLabelText } = tree;

          expect(await findByLabelText(removeLabel)).toBeDefined();
        });

        it("is called when pressed", async () => {
          const { findByLabelText } = tree;
          fireEvent.press(await findByLabelText(removeLabel));

          expect(onRemove).toHaveBeenCalledTimes(1);
        });
      });
    },
  );
};

describe("ios", () => {
  beforeEach(() => {
    Platform.OS = "ios";
  });

  basicRenderTestWithValue();
});

describe("android", () => {
  beforeEach(() => {
    Platform.OS = "android";
  });

  basicRenderTestWithValue();
});
