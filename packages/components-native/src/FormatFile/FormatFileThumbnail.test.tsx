import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { FormatFileThumbnail } from "./FormatFileThumbnail";
import {
  FILE_MOCK_FILE,
  FILE_MOCK_IMAGE,
  FILE_MOCK_VIDEO,
  FILE_UPLOAD_MOCK_FILE,
  FILE_UPLOAD_MOCK_IMAGE,
} from "./components/_mocks/mockFiles";
import type { File, FileUpload } from "./types";
import { StatusCode } from "./types";
import { tokens } from "../utils/design";

const mockCreateThumbnail = jest.fn(async () => ({
  thumbnail: "thumbnail",
  error: false,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("FormatFileThumbnail", () => {
  describe("rendering media files", () => {
    it("renders an image file upload", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByTestId } = renderThumbnail(file);

      expect(getByTestId("test-image")).toBeDefined();
    });

    it("renders an external image file", () => {
      const { getByTestId } = renderThumbnail(FILE_MOCK_IMAGE);

      expect(getByTestId("test-image")).toBeDefined();
    });

    it("creates a thumbnail for media files", () => {
      renderThumbnail(
        FILE_UPLOAD_MOCK_IMAGE({
          progress: 1,
          status: StatusCode.Completed,
        }),
      );

      expect(mockCreateThumbnail).toHaveBeenCalledTimes(1);
    });

    it("does not create a thumbnail for non-media files", () => {
      renderThumbnail(
        FILE_UPLOAD_MOCK_FILE({
          progress: 1,
          status: StatusCode.Completed,
        }),
      );

      expect(mockCreateThumbnail).not.toHaveBeenCalled();
    });
  });

  describe("rendering non-media files", () => {
    it("renders a file upload", () => {
      const file = FILE_UPLOAD_MOCK_FILE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByTestId } = renderThumbnail(file);

      expect(getByTestId("test-file")).toBeDefined();
    });

    it("renders an external file", () => {
      const { getByTestId } = renderThumbnail(FILE_MOCK_FILE);

      expect(getByTestId("test-file")).toBeDefined();
    });
  });

  describe("upload progress", () => {
    it("shows a progress bar when upload is in progress", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({ progress: 0.5 });
      const { getByTestId } = renderThumbnail(file);

      expect(getByTestId("format-file-progress-bar-container")).toBeDefined();
    });

    it("shows a progress overlay with correct styles", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({ progress: 0.5 });
      const { getByTestId } = renderThumbnail(file);
      const progressBarContainer = getByTestId(
        "format-file-progress-bar-container",
      );
      const overlayStyles = progressBarContainer.props.style;

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

    it("renders a progress bar that advances with upload percentage", async () => {
      jest.useFakeTimers();
      const file = FILE_UPLOAD_MOCK_IMAGE({ progress: 0.9 });
      const { getByTestId } = renderThumbnail(file);
      jest.advanceTimersByTime(500);
      const innerProgressBar = await waitFor(() =>
        getByTestId("format-file-inner-progress-bar"),
      );
      const width = parseInt(innerProgressBar.props.style.width, 10);

      expect(width).toBeGreaterThan(20);

      jest.useRealTimers();
    });
  });

  describe("error state", () => {
    it("renders an error icon for a failed image upload", () => {
      const file = {
        ...FILE_UPLOAD_MOCK_IMAGE({
          progress: 0.9,
          status: StatusCode.Failed,
        }),
      };
      const { getByTestId } = renderThumbnail(file);

      expect(getByTestId("format-file-error-icon")).toBeDefined();
    });

    it("renders a helpful error accessibility label", () => {
      const file = {
        ...FILE_UPLOAD_MOCK_IMAGE({
          progress: 0.9,
          status: StatusCode.Failed,
        }),
      };
      const tree = renderThumbnail(file);

      expect(tree.getByLabelText("Failed to upload.")).toBeDefined();
    });
  });

  describe("accessibility", () => {
    it("renders with a custom accessibility label", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByLabelText } = renderThumbnail(file);

      expect(getByLabelText("Custom Label")).toBeDefined();
    });
  });

  describe("size prop", () => {
    it("applies size dimensions to the outer container", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByTestId } = render(
        <FormatFileThumbnail
          file={file}
          accessibilityLabel="Custom Label"
          createThumbnail={mockCreateThumbnail}
          size={{ width: 100, height: 100 }}
          testID="thumbnail-container"
        />,
      );

      const container = getByTestId("thumbnail-container");
      const containerStyle = container.props.style;

      expect(containerStyle).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ width: 100, height: 100 }),
        ]),
      );
    });

    it("applies container visual styles (border, radius, overflow)", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByTestId } = render(
        <FormatFileThumbnail
          file={file}
          accessibilityLabel="Custom Label"
          createThumbnail={mockCreateThumbnail}
          size={{ width: 100, height: 100 }}
          testID="thumbnail-container"
        />,
      );

      const container = getByTestId("thumbnail-container");
      const containerStyle = container.props.style;

      expect(containerStyle).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            borderWidth: tokens["border-base"],
            borderColor: tokens["color-border"],
            borderRadius: tokens["radius-base"],
            overflow: "hidden",
          }),
        ]),
      );
    });

    it("does not apply marginBottom from the base container styles", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { getByTestId } = render(
        <FormatFileThumbnail
          file={file}
          accessibilityLabel="Custom Label"
          createThumbnail={mockCreateThumbnail}
          size={{ width: 100, height: 100 }}
          testID="thumbnail-container"
        />,
      );

      const container = getByTestId("thumbnail-container");
      const containerStyle = container.props.style;

      // marginBottom is overridden to 0 since spacing is a layout concern
      expect(containerStyle).toEqual(
        expect.arrayContaining([expect.objectContaining({ marginBottom: 0 })]),
      );
    });
  });

  describe("video files", () => {
    it("shows the play icon for video files by default", () => {
      const { getByTestId } = renderThumbnail(FILE_MOCK_VIDEO);

      expect(getByTestId("video")).toBeDefined();
    });

    it("hides the play icon when showFileTypeIndicator is false", () => {
      const { queryByTestId } = render(
        <FormatFileThumbnail
          file={FILE_MOCK_VIDEO}
          accessibilityLabel="Custom Label"
          createThumbnail={mockCreateThumbnail}
          showFileTypeIndicator={false}
          size={{ width: 100, height: 100 }}
        />,
      );

      expect(queryByTestId("video")).toBeNull();
    });
  });

  describe("does NOT render BottomSheet or TouchableOpacity", () => {
    it("does not render a bottom sheet", () => {
      const file = FILE_UPLOAD_MOCK_IMAGE({
        progress: 1,
        status: StatusCode.Completed,
      });
      const { queryByLabelText } = renderThumbnail(file);

      // BottomSheet options should not exist
      expect(queryByLabelText("Remove image")).toBeNull();
      expect(queryByLabelText("Preview image")).toBeNull();
    });
  });
});

function renderThumbnail(file: FileUpload | File) {
  return render(
    <FormatFileThumbnail
      file={file}
      accessibilityLabel="Custom Label"
      createThumbnail={mockCreateThumbnail}
      size={{ width: 100, height: 100 }}
    />,
  );
}
