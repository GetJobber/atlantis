import React, { createRef } from "react";
import { RenderAPI, fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { useIntl } from "react-intl";
import { act } from "react-test-renderer";
import { BottomSheetRef } from "atlantis/BottomSheet/BottomSheet";
import {
  BottomSheetOptionsSuffix,
  FormatFileBottomSheet,
} from "./FormatFileBottomSheet";
import { messages } from "./messages";

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
      const { formatMessage } = useIntl();
      const previewLabel = formatMessage(messages.lightBoxPreviewButton, {
        bottomSheetOptionsSuffix,
      });
      const removeLabel = formatMessage(messages.removeButton, {
        bottomSheetOptionsSuffix,
      });
      let tree: RenderAPI;

      beforeEach(() => {
        tree = renderBottomSheet(
          bottomSheetOptionsSuffix as BottomSheetOptionsSuffix,
        );
        act(() => {
          bottomSheetRef.current?.open();
        });
      });
      afterEach(() => {
        jest.clearAllMocks();
      });

      describe("onPreviewPress", () => {
        it("renders the preview option", () => {
          const { getByLabelText } = tree;

          expect(getByLabelText(previewLabel)).toBeDefined();
        });

        it("is called when pressed", () => {
          const { getByLabelText } = tree;
          fireEvent.press(getByLabelText(previewLabel));
          expect(onPreview).toHaveBeenCalledTimes(1);
        });
      });

      describe("onRemovePress", () => {
        it("renders the remove option", () => {
          const { getByLabelText } = tree;

          expect(getByLabelText(removeLabel)).toBeDefined();
        });

        it("is called when pressed", () => {
          const { getByLabelText } = tree;
          fireEvent.press(getByLabelText(removeLabel));

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
