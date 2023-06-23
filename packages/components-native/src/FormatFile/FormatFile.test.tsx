import React from "react";
import { RenderAPI, fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { Alert } from "react-native";
import { useIntl } from "react-intl";
import { File, FormatFile } from ".";
import {
  FILE_MOCK_FILE,
  FILE_MOCK_IMAGE,
  FILE_MOCK_PDF,
  FILE_MOCK_VIDEO,
  FILE_UPLOAD_MOCK_FILE,
  FILE_UPLOAD_MOCK_IMAGE,
  FILE_UPLOAD_MOCK_PDF,
} from "./components/_mocks/mockFiles";
import { messages } from "./components/FormatFileBottomSheet/messages";
import { messages as formatFileMessages } from "./messages";
import { BottomSheetOptionsSuffix } from "./components/FormatFileBottomSheet";
import { FileUpload, StatusCode } from "./types";
import { tokens } from "../utils/design";

let Platform: { OS: "ios" | "android" };

const onRemove = jest.fn();
const mockOnPreview = jest.fn();
const mockCreateThumbnail = jest.fn(async () => ({
  thumbnail: "thumbnail",
  error: false,
}));

beforeEach(() => {
  Platform = require("react-native").Platform;
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderFormatFile = (
  file: FileUpload | File,
  bottomSheetOptionsSuffix?: BottomSheetOptionsSuffix,
  showFileTypeIndicator?: boolean,
) => {
  return render(
    <Host>
      <FormatFile
        file={file}
        accessibilityLabel="Custom Label"
        accessibilityHint="Custom Hint Text"
        onTap={() => Alert.alert("alert")}
        onRemove={onRemove}
        bottomSheetOptionsSuffix={bottomSheetOptionsSuffix}
        showFileTypeIndicator={showFileTypeIndicator}
        onPreviewPress={mockOnPreview}
        createThumbnail={mockCreateThumbnail}
      />
    </Host>,
  );
};

function basicRenderTestWithValue() {
  const progressBarAnimationTime = 500;

  it.each([
    [
      "file",
      FILE_UPLOAD_MOCK_FILE({ progress: 1, status: StatusCode.Completed }),
    ],
    [
      "image",
      FILE_UPLOAD_MOCK_IMAGE({ progress: 1, status: StatusCode.Completed }),
    ],
  ])(
    "renders a %s with custom label and hint",
    (bottomSheetOptionsSuffix, file) => {
      const { getByLabelText, getByHintText } = renderFormatFile(
        file,
        bottomSheetOptionsSuffix as BottomSheetOptionsSuffix,
      );
      expect(getByLabelText("Custom Label")).toBeDefined();
      expect(getByHintText("Custom Hint Text")).toBeDefined();
    },
  );

  describe.each([
    ["file", FILE_UPLOAD_MOCK_FILE({ progress: 0.9 })],
    ["image", FILE_UPLOAD_MOCK_IMAGE({ progress: 0.9 })],
  ])("when a local %s is being uploaded", (testIdType, file) => {
    const testId = `test-${testIdType}`;
    it("renders ProgressBar state when upload status is not completed", () => {
      const { getByTestId } = renderFormatFile(file);
      expect(getByTestId("format-file-progress-bar")).toBeDefined();
    });

    it("renders a helpful accessibility label", () => {
      const tree = renderFormatFile(file);
      expect(
        tree.getByLabelText(
          formatFileMessages.inProgressAccessibilityLabel.defaultMessage,
        ),
      ).toBeDefined();
    });

    it("renders an overlay on the image when upload status is not completed", () => {
      const { getByTestId } = renderFormatFile(file);
      const progressBarContainer = getByTestId(
        "format-file-progress-bar-container",
      );
      const overlayStyles = progressBarContainer.props.style;

      // The container needs to have a height and color in order to show the overlay
      expect(overlayStyles).toEqual(
        expect.arrayContaining([expect.objectContaining({ height: "100%" })]),
      );
      expect(overlayStyles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: tokens["color-overlay--dimmed"],
          }),
        ]),
      );
    });

    it("renders ProgressBar state advancing with the upload percentage", () => {
      jest.useFakeTimers();
      const { getByTestId } = renderFormatFile(file);
      jest.advanceTimersByTime(progressBarAnimationTime);
      const formatFileInnerProgressBar = getByTestId(
        "format-file-inner-progress-bar",
      );
      const innerProgressBarWidth = parseInt(
        formatFileInnerProgressBar.props.style.width,
        10,
      );
      expect(innerProgressBarWidth).toBeGreaterThan(20);
    });

    it("shows an alert for on tap", () => {
      const { getByTestId } = renderFormatFile(file);
      const spy = jest.spyOn(Alert, "alert");
      fireEvent.press(getByTestId(testId));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe.each([
    [
      "file",
      {
        ...FILE_UPLOAD_MOCK_FILE({ progress: 0.9, status: StatusCode.Failed }),
        status: StatusCode.Failed,
      },
    ],
    [
      "image",
      {
        ...FILE_UPLOAD_MOCK_IMAGE({ progress: 0.9, status: StatusCode.Failed }),
        status: StatusCode.Failed,
      },
    ],
  ])("when a local %s upload has failed", (testIdType, file) => {
    it("renders an error icon", () => {
      const tree = renderFormatFile(file);
      expect(tree.getByTestId("format-file-error-icon")).toBeDefined();
    });

    it("renders a helpful accessibility label", () => {
      const tree = renderFormatFile(file);
      expect(
        tree.getByLabelText(
          formatFileMessages.errorAccessibilityLabel.defaultMessage,
        ),
      ).toBeDefined();
    });

    it("does not render an overlay", () => {
      const tree = renderFormatFile(file);
      expect(
        tree.queryByTestId("format-file-progress-bar-container"),
      ).toBeNull();
    });

    it("shows an alert for on tap", () => {
      const testId = `test-${testIdType}`;
      const tree = renderFormatFile(file);
      const spy = jest.spyOn(Alert, "alert");
      fireEvent.press(tree.getByTestId(testId));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe.each([
    [
      "local file",
      "test-file",
      FILE_UPLOAD_MOCK_FILE({ progress: 1, status: StatusCode.Completed }),
    ],
    [
      "local image",
      "test-image",
      FILE_UPLOAD_MOCK_IMAGE({ progress: 1, status: StatusCode.Completed }),
    ],
    ["external file", "test-file", FILE_MOCK_FILE],
    ["external image", "test-image", FILE_MOCK_IMAGE],
  ])(
    "when a uploaded %s is being used",
    (bottomSheetOptionsSuffix, testId, file) => {
      let tree: RenderAPI;
      const { formatMessage } = useIntl();
      const removeLabel = formatMessage(messages.removeButton, {
        bottomSheetOptionsSuffix: bottomSheetOptionsSuffix,
      });

      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        tree = renderFormatFile(
          file,
          bottomSheetOptionsSuffix as BottomSheetOptionsSuffix,
        );
        jest.advanceTimersByTime(progressBarAnimationTime);
      });

      it("shows a BottomSheet with a remove option when tapped", () => {
        const { getByTestId, getByLabelText } = tree;
        fireEvent.press(getByTestId(testId));
        expect(getByLabelText(removeLabel)).toBeDefined();
      });

      describe("when the BottomSheet remove option is tapped", () => {
        it("calls the onRemove action", () => {
          const { getByTestId, getByLabelText } = tree;
          fireEvent.press(getByTestId(testId));
          fireEvent.press(getByLabelText(removeLabel));
          expect(onRemove).toHaveBeenCalledTimes(1);
        });
      });
    },
  );

  describe("when the preview option is tapped", () => {
    const { formatMessage } = useIntl();

    it("calls onPreview with a valid image", () => {
      const previewLabel = formatMessage(messages.lightBoxPreviewButton, {
        bottomSheetOptionsSuffix: "image",
      });
      const { getByTestId, getByLabelText } = renderFormatFile(
        FILE_UPLOAD_MOCK_IMAGE({ progress: 1, status: StatusCode.Completed }),
        "image",
      );
      fireEvent.press(getByTestId("test-image"));
      fireEvent.press(getByLabelText(previewLabel));
      expect(mockOnPreview).toHaveBeenCalledTimes(1);
    });

    it("calls onPreview with a valid pdf file", () => {
      const previewLabel = formatMessage(messages.lightBoxPreviewButton, {
        bottomSheetOptionsSuffix: "file",
      });
      const { getByTestId, getByLabelText } = renderFormatFile(
        FILE_UPLOAD_MOCK_PDF({ progress: 1, status: StatusCode.Completed }),
        "file",
      );
      fireEvent.press(getByTestId("test-file"));
      fireEvent.press(getByLabelText(previewLabel));
      expect(mockOnPreview).toHaveBeenCalledTimes(1);
    });

    it("calls onPreview with a valid external PDF file", () => {
      const previewLabel = formatMessage(messages.lightBoxPreviewButton, {
        bottomSheetOptionsSuffix: "file",
      });
      const { getByTestId, getByLabelText } = renderFormatFile(
        FILE_MOCK_PDF,
        "file",
      );
      fireEvent.press(getByTestId("test-file"));
      fireEvent.press(getByLabelText(previewLabel));
      expect(mockOnPreview).toHaveBeenCalledTimes(1);
    });

    it("does not show the preview option with an unaccepted file", () => {
      const previewLabel = formatMessage(messages.lightBoxPreviewButton, {
        bottomSheetOptionsSuffix: "file",
      });
      const { getByTestId, queryByLabelText } = renderFormatFile(
        FILE_UPLOAD_MOCK_FILE({ progress: 1, status: StatusCode.Completed }),
        "file",
      );

      fireEvent.press(getByTestId("test-file"));
      expect(queryByLabelText(previewLabel)).toBeNull();
    });
  });

  describe("when an uploaded video is being viewed", () => {
    it("shows the play icon if the file type indicator is not specified", () => {
      const { getByTestId } = renderFormatFile(FILE_MOCK_VIDEO, "video");
      expect(getByTestId("video")).toBeDefined();
    });

    it("does not show the play icon if the file type indicator is set to false", () => {
      const { queryByTestId } = renderFormatFile(
        FILE_MOCK_VIDEO,
        "video",
        false,
      );
      expect(queryByTestId("video")).toBeNull();
    });
  });

  describe("when an image is used", () => {
    it("creates a thumbnail", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      renderFormatFile(file, "image");

      expect(mockCreateThumbnail).toHaveBeenCalledTimes(1);
    });
  });
}

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
