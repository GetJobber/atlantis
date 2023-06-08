import { v4 } from "react-native-uuid";
import { normalizeAndroidAsset } from "./normalizeAndroidAsset";

jest.mock("react-native-uuid");

describe("normalizeAndroidAsset", () => {
  it("passes through a well-formed video attachment", () => {
    const result = normalizeAndroidAsset({
      fileName: "rn_image_picker_lib_temp_9983b4c5-ee.mp4",
      type: "video/mp4",
    });

    expect(result.filename).toBe("rn_image_picker_lib_temp_9983b4c5-ee.mp4");
    expect(result.filetype).toBe("video/mp4");
  });

  it("passes through a well-formed image attachment", () => {
    const result = normalizeAndroidAsset({
      fileName: "PXL_20220612_021402210.jpg",
      type: "image/jpg",
    });

    expect(result.filename).toBe("PXL_20220612_021402210.jpg");
    expect(result.filetype).toBe("image/jpg");
  });

  it("defaults to mp4 if missing filetype and that cannot be determined by extension", () => {
    const result = normalizeAndroidAsset({
      fileName: "video:123",
      type: undefined,
    });

    expect(result.filename).toBe("video:123.mp4");
    expect(result.filetype).toBe("video/mp4");
  });

  it("applies mkv extension if filetype is matroska", () => {
    const result = normalizeAndroidAsset({
      fileName: "video:123",
      type: "video/x-matroska",
    });

    expect(result.filename).toBe("video:123.mkv");
    expect(result.filetype).toBe("video/x-matroska");
  });

  it("applies jpeg extension if filetype is image/jpeg", () => {
    const result = normalizeAndroidAsset({
      fileName: "image:123",
      type: "image/jpeg",
    });

    expect(result.filename).toBe("image:123.jpeg");
    expect(result.filetype).toBe("image/jpeg");
  });

  it("generates a new filename if one was not provided", () => {
    const mockUUID = "00000000-0000-0000-0000-000000000000";
    (v4 as jest.Mock).mockReturnValueOnce(mockUUID);

    const result = normalizeAndroidAsset({
      fileName: undefined,
      type: undefined,
    });

    expect(result.filename).toBe(`${mockUUID}.mp4`);
    expect(result.filetype).toBe("video/mp4");
  });

  it("infers the filetype from filename if possible", () => {
    const result = normalizeAndroidAsset({
      fileName: "a_downloaded_quicktime_video.mov",
      type: undefined,
    });

    expect(result.filename).toBe("a_downloaded_quicktime_video.mov");
    expect(result.filetype).toBe("video/quicktime");
  });
});
