import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { MediaView } from "./MediaView";
import type { FormattedFile } from "../../types";
import { StatusCode } from "../../types";
import { AtlantisFormatFileContext } from "../../context/FormatFileContext";

jest.mock("../../../hooks/useAtlantisI18n", () => ({
  useAtlantisI18n: () => ({ t: (key: string) => key }),
}));

describe("MediaView", () => {
  const mockFile: FormattedFile = {
    showPreview: true,
    source: "https://example.com/image1.jpg",
    thumbnailUrl: undefined,
    name: "test.jpg",
    size: 1024,
    external: false,
    progress: 0,
    status: StatusCode.Completed,
    error: false,
    type: "image/jpeg",
    isMedia: true,
    showFileTypeIndicator: false,
  };

  const defaultProps = {
    accessibilityLabel: "Test image",
    showOverlay: false,
    showError: false,
    file: mockFile,
    styleInGrid: false,
    onUploadComplete: jest.fn(),
  };

  const mockContextValue = {
    useCreateThumbnail: () => ({ thumbnail: undefined, error: false }),
  };

  const renderWithContext = (props = defaultProps) => {
    return render(
      <AtlantisFormatFileContext.Provider value={mockContextValue}>
        <MediaView {...props} />
      </AtlantisFormatFileContext.Provider>,
    );
  };

  describe("Normal loading flow", () => {
    it("shows loading indicator when onLoadStart fires", () => {
      const { getByTestId, queryByTestId } = renderWithContext();
      const image = getByTestId("test-image");

      expect(queryByTestId("ActivityIndicator")).toBeNull();

      fireEvent(image, "loadStart");

      expect(queryByTestId("ActivityIndicator")).toBeTruthy();
    });

    it("hides loading indicator when onLoadEnd fires", () => {
      const { getByTestId, queryByTestId } = renderWithContext();
      const image = getByTestId("test-image");

      fireEvent(image, "loadStart");
      expect(queryByTestId("ActivityIndicator")).toBeTruthy();

      fireEvent(image, "loadEnd");

      expect(queryByTestId("ActivityIndicator")).toBeNull();
    });
  });

  describe("Race condition handling (cached images)", () => {
    it("does not get stuck loading when onLoadEnd fires before onLoadStart", () => {
      const { getByTestId, queryByTestId } = renderWithContext();
      const image = getByTestId("test-image");

      // Simulate cached image: LoadEnd fires BEFORE LoadStart
      fireEvent(image, "loadEnd");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      fireEvent(image, "loadStart");

      expect(queryByTestId("ActivityIndicator")).toBeNull();
    });

    it("does not show infinite spinner when load events fire out of order", () => {
      const { getByTestId, queryByTestId } = renderWithContext();
      const image = getByTestId("test-image");

      // Race condition scenario
      fireEvent(image, "loadEnd");
      fireEvent(image, "loadStart");
      fireEvent(image, "loadEnd");

      expect(queryByTestId("ActivityIndicator")).toBeNull();
    });
  });

  describe("URI changes", () => {
    it("shows loading indicator when URI changes to a new image", async () => {
      const { getByTestId, queryByTestId, rerender } = renderWithContext();
      const image = getByTestId("test-image");

      // First image: simulate cached load (LoadEnd before LoadStart)
      fireEvent(image, "loadEnd");
      fireEvent(image, "loadStart");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      // Change URI to a new image
      const newFile = {
        ...mockFile,
        source: "https://example.com/image2.jpg",
      };

      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={newFile} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const updatedImage = getByTestId("test-image");

        // New image starts loading
        fireEvent(updatedImage, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();
      });
    });

    it("shows loading indicator on second URI change", async () => {
      const { getByTestId, queryByTestId, rerender } = renderWithContext();

      const image1 = getByTestId("test-image");
      fireEvent(image1, "loadStart");
      fireEvent(image1, "loadEnd");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      const file2 = { ...mockFile, source: "https://example.com/image2.jpg" };
      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={file2} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const image2 = getByTestId("test-image");
        fireEvent(image2, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();
      });
    });

    it("shows loading indicator on third URI change", async () => {
      const { getByTestId, queryByTestId, rerender } = renderWithContext();

      const image1 = getByTestId("test-image");
      fireEvent(image1, "loadStart");
      fireEvent(image1, "loadEnd");

      const file2 = { ...mockFile, source: "https://example.com/image2.jpg" };
      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={file2} />
        </AtlantisFormatFileContext.Provider>,
      );
      const image2 = getByTestId("test-image");
      fireEvent(image2, "loadEnd");

      const file3 = { ...mockFile, source: "https://example.com/image3.jpg" };
      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={file3} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const image3 = getByTestId("test-image");
        fireEvent(image3, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();
      });
    });

    it("handles URI change from cached to uncached image correctly", async () => {
      const { getByTestId, queryByTestId, rerender } = renderWithContext();

      // First image: cached (LoadEnd before LoadStart)
      const image1 = getByTestId("test-image");
      fireEvent(image1, "loadEnd");
      fireEvent(image1, "loadStart");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      // Second image: uncached (normal LoadStart then LoadEnd)
      const file2 = { ...mockFile, source: "https://example.com/image2.jpg" };
      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={file2} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const image2 = getByTestId("test-image");
        fireEvent(image2, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();

        fireEvent(image2, "loadEnd");
        expect(queryByTestId("ActivityIndicator")).toBeNull();
      });
    });
  });

  describe("thumbnailUrl changes", () => {
    it("shows loading indicator when thumbnailUrl changes", async () => {
      const { getByTestId, queryByTestId, rerender } = renderWithContext();

      // First load completes
      const image1 = getByTestId("test-image");
      fireEvent(image1, "loadStart");
      fireEvent(image1, "loadEnd");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      // Thumbnail URL changes (common when thumbnail generation completes)
      const fileWithThumbnail = {
        ...mockFile,
        thumbnailUrl: "https://example.com/thumbnail.jpg",
      };

      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} file={fileWithThumbnail} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const image2 = getByTestId("test-image");
        fireEvent(image2, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();
      });
    });
  });

  describe("Context thumbnail changes", () => {
    it("shows loading indicator when context thumbnail changes", async () => {
      const mockContextWithThumbnail = {
        useCreateThumbnail: () => ({
          thumbnail: "https://example.com/context-thumbnail.jpg",
          error: false,
        }),
      };

      const { getByTestId, queryByTestId, rerender } = render(
        <AtlantisFormatFileContext.Provider value={mockContextValue}>
          <MediaView {...defaultProps} />
        </AtlantisFormatFileContext.Provider>,
      );

      // First load completes
      const image1 = getByTestId("test-image");
      fireEvent(image1, "loadStart");
      fireEvent(image1, "loadEnd");
      expect(queryByTestId("ActivityIndicator")).toBeNull();

      // Context provides a new thumbnail
      rerender(
        <AtlantisFormatFileContext.Provider value={mockContextWithThumbnail}>
          <MediaView {...defaultProps} />
        </AtlantisFormatFileContext.Provider>,
      );

      await waitFor(() => {
        const image2 = getByTestId("test-image");
        fireEvent(image2, "loadStart");

        expect(queryByTestId("ActivityIndicator")).toBeTruthy();
      });
    });
  });
});
