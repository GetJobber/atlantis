/* eslint-disable max-statements */
import { isMediaFile, parseFile } from "./parseFile";
import type { File, FileUpload } from "../types";
import { StatusCode } from "../types";

const makeFileUpload = (overrides: Partial<FileUpload> = {}): FileUpload => ({
  uuid: "uuid-123",
  key: "path/test.txt",
  name: "test.txt",
  type: "application/txt",
  size: 1024,
  progress: 0.5,
  status: StatusCode.InProgress,
  sourcePath: "path/test.txt",
  batchContext: { batchId: "batch-1", batchCount: 1 },
  cancel: jest.fn(),
  ...overrides,
});

const makeFile = (overrides: Partial<File> = {}): File => ({
  fileName: "document.txt",
  fileSize: 2048,
  contentType: "text/plain",
  url: "https://example.com/file.txt",
  thumbnailUrl: "https://example.com/thumb.txt",
  ...overrides,
});

describe("isMediaFile", () => {
  it.each`
    fileType             | expected
    ${"image/png"}       | ${true}
    ${"image/jpeg"}      | ${true}
    ${"video/mp4"}       | ${true}
    ${"video/quicktime"} | ${true}
    ${"application/pdf"} | ${false}
    ${"text/plain"}      | ${false}
    ${""}                | ${false}
  `("returns $expected for '$fileType'", ({ fileType, expected }) => {
    expect(isMediaFile(fileType)).toBe(expected);
  });
});

describe("parseFile", () => {
  describe("with a FileUpload (local upload)", () => {
    it("maps basic fields", () => {
      const file = makeFileUpload({
        sourcePath: "local/image.png",
        name: "image.png",
        size: 5000,
        progress: 0.7,
        status: StatusCode.InProgress,
        type: "image/png",
      });

      const result = parseFile(file, true);

      expect(result).toMatchObject({
        source: "local/image.png",
        name: "image.png",
        size: 5000,
        progress: 0.7,
        status: StatusCode.InProgress,
        external: false,
        showFileTypeIndicator: true,
      });
    });

    it("sets error to true when status is Failed", () => {
      const file = makeFileUpload({ status: StatusCode.Failed });
      const result = parseFile(file, true);

      expect(result.error).toBe(true);
    });

    it("sets error to false when status is not Failed", () => {
      const file = makeFileUpload({ status: StatusCode.Completed });
      const result = parseFile(file, true);

      expect(result.error).toBe(false);
    });

    it("uses file.key as type fallback when type is empty", () => {
      const file = makeFileUpload({ type: "", key: "path/fallback.png" });
      const result = parseFile(file, true);

      expect(result.type).toBe("path/fallback.png");
    });

    it("identifies an image upload as media", () => {
      const file = makeFileUpload({ type: "image/png" });
      const result = parseFile(file, true);

      expect(result.isMedia).toBe(true);
    });

    it("identifies a video upload as media", () => {
      const file = makeFileUpload({ type: "video/mp4" });
      const result = parseFile(file, true);

      expect(result.isMedia).toBe(true);
    });

    it("identifies a text file upload as non-media", () => {
      const file = makeFileUpload({ type: "application/txt" });
      const result = parseFile(file, true);

      expect(result.isMedia).toBe(false);
    });

    it("sets showPreview for media files", () => {
      const file = makeFileUpload({ type: "image/jpeg" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(true);
    });

    it("sets showPreview for accepted non-media extensions (pdf)", () => {
      const file = makeFileUpload({ type: "file/pdf" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(true);
    });

    it("sets showPreview for accepted non-media extensions (docx)", () => {
      const file = makeFileUpload({ type: "application/docx" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(true);
    });

    it("does not set showPreview for unrecognized file types", () => {
      const file = makeFileUpload({ type: "application/txt" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(false);
    });

    it("passes showFileTypeIndicator through", () => {
      const file = makeFileUpload();

      expect(parseFile(file, true).showFileTypeIndicator).toBe(true);
      expect(parseFile(file, false).showFileTypeIndicator).toBe(false);
    });
  });

  describe("with a File (external/remote file)", () => {
    it("maps basic fields", () => {
      const file = makeFile({
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg",
        fileName: "photo.jpg",
        fileSize: 3000,
        contentType: "image/jpeg",
      });

      const result = parseFile(file, true);

      expect(result).toMatchObject({
        source: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg",
        name: "photo.jpg",
        size: 3000,
        external: true,
        progress: 1,
        status: StatusCode.Completed,
        error: false,
        showFileTypeIndicator: true,
      });
    });

    it("identifies an image file as media", () => {
      const file = makeFile({ contentType: "image/png" });
      const result = parseFile(file, true);

      expect(result.isMedia).toBe(true);
    });

    it("identifies a non-media file as non-media", () => {
      const file = makeFile({ contentType: "text/plain" });
      const result = parseFile(file, true);

      expect(result.isMedia).toBe(false);
    });

    it("detects video content type from file extension (.mp4)", () => {
      const file = makeFile({ fileName: "clip.mp4", contentType: undefined });
      const result = parseFile(file, true);

      expect(result.type).toBe("video");
      expect(result.isMedia).toBe(true);
    });

    it("detects video content type from file extension (.mov)", () => {
      const file = makeFile({ fileName: "clip.mov", contentType: undefined });
      const result = parseFile(file, true);

      expect(result.type).toBe("video");
    });

    it("detects video content type from file extension (.hevc)", () => {
      const file = makeFile({ fileName: "clip.hevc", contentType: undefined });
      const result = parseFile(file, true);

      expect(result.type).toBe("video");
    });

    it("detects video content type from file extension (.3gpp)", () => {
      const file = makeFile({ fileName: "clip.3gpp", contentType: undefined });
      const result = parseFile(file, true);

      expect(result.type).toBe("video");
    });

    it("falls back to contentType when extension is not a video", () => {
      const file = makeFile({
        fileName: "report.pdf",
        contentType: "application/pdf",
      });
      const result = parseFile(file, true);

      expect(result.type).toBe("application/pdf");
    });

    it("falls back to 'unknown' when both fileName and contentType are missing", () => {
      const file = makeFile({
        fileName: undefined,
        contentType: undefined,
      });
      const result = parseFile(file, true);

      expect(result.type).toBe("unknown");
    });

    it("sets showPreview for media files", () => {
      const file = makeFile({ contentType: "image/jpeg" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(true);
    });

    it("sets showPreview for accepted extension types", () => {
      const file = makeFile({ contentType: "application/pdf" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(true);
    });

    it("does not set showPreview for unrecognized types", () => {
      const file = makeFile({ contentType: "text/plain" });
      const result = parseFile(file, true);

      expect(result.showPreview).toBe(false);
    });

    it("handles video extension detection case-insensitively", () => {
      const file = makeFile({ fileName: "CLIP.MP4", contentType: undefined });
      const result = parseFile(file, true);

      expect(result.type).toBe("video");
    });
  });
});
