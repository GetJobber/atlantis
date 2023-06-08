import { Asset } from "react-native-image-picker";
import { DocumentPickerResponse } from "react-native-document-picker";
import { buildSourceFile } from "./buildSourceFile";
import { SourceFile } from "../types";

describe("buildSourceFile", () => {
  const mockFileSize = 200000;
  const mockFileName = "myFile.jpg";
  const mockFileType = "image/jpeg";
  const mockHeight = 1080;
  const mockWidth = 1440;
  const mockUri = "file://path/to/myFile.jpg";
  it("makes a SourceFile out of an Asset", () => {
    const mockAsset: Asset = {
      fileSize: mockFileSize,
      fileName: mockFileName,
      type: mockFileType,
      uri: mockUri,
    };
    const expectedSourceFile: SourceFile = {
      size: mockFileSize,
      name: mockFileName,
      type: mockFileType,
      uri: mockUri,
    };
    const result = buildSourceFile(mockAsset);

    expect(result).toMatchObject(expectedSourceFile);
  });
  it("makes a SourceFile with dimensions out of an Asset with dimensions", () => {
    const mockAsset: Asset = {
      fileSize: mockFileSize,
      fileName: mockFileName,
      type: mockFileType,
      height: mockHeight,
      width: mockWidth,
    };
    const expectedSourceFile: SourceFile = {
      size: mockFileSize,
      name: mockFileName,
      type: mockFileType,
      dimension: {
        height: mockHeight,
        width: mockWidth,
      },
    };
    const result = buildSourceFile(mockAsset);

    expect(result).toMatchObject(expectedSourceFile);
  });
  it("makes a SourceFile out of a DocumentPickerRespone", () => {
    const mockDocPickerResponse: DocumentPickerResponse = {
      size: mockFileSize,
      name: mockFileName,
      type: mockFileType,
      uri: mockUri,
      fileCopyUri: null,
    };
    const expectedSourceFile: SourceFile = {
      size: mockFileSize,
      name: mockFileName,
      type: mockFileType,
    };
    const result = buildSourceFile(mockDocPickerResponse);

    expect(result).toMatchObject(expectedSourceFile);
  });

  it("makes a default SourceFile when it has no other defined values", () => {
    const mockAsset: Asset = {};
    const expectedSourceFile: SourceFile = {
      size: 0,
      name: "",
      type: "unknown",
    };
    const result = buildSourceFile(mockAsset);

    expect(result).toMatchObject(expectedSourceFile);
  });
});
