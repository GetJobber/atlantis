import { v4 } from "react-native-uuid";
import { buildFileUpload } from "./buildFileUpload";
import { StatusCode } from "../types";

jest.mock("react-native-uuid");

const mockFileSize = 300000;
const mockFileName = "myFile.pdf";
const mockFileType = "application/pdf";
const mockUri = `file://path/to/${mockFileName}`;
const mockBatchId = "BATCHID";
const mockHeight = 2440;
const mockWidth = 1440;

const mockBatchCount = 1;
const mockUUID = "00000000-0000-0000-0000-000000000000";
(v4 as jest.Mock).mockReturnValue(mockUUID);

const mockSourceFile = {
  size: mockFileSize,
  name: mockFileName,
  type: mockFileType,
};

const expectedFileUpload = {
  uuid: mockUUID,
  name: mockFileName,
  type: mockFileType,
  size: mockFileSize,
  progress: 0,
  status: StatusCode.Pending,
  batchContext: {
    batchId: mockBatchId,
    batchCount: mockBatchCount,
  },
};

describe("buildFileUpload", () => {
  it("creates a FileUpload with the correct parameters", () => {
    const result = buildFileUpload(mockSourceFile, mockBatchId, mockBatchCount);

    expect(result).toMatchObject(expectedFileUpload);
  });
  it("creates a FileUpload with a dimension and uri when provided", () => {
    const mockSourceFileWithExtras = {
      ...mockSourceFile,
      dimension: { height: mockHeight, width: mockWidth },
      uri: mockUri,
    };

    const result = buildFileUpload(
      mockSourceFileWithExtras,
      mockBatchId,
      mockBatchCount,
    );

    const expectedFileUploadWithExtras = {
      ...expectedFileUpload,
      dimension: { height: mockHeight, width: mockWidth },
      sourcePath: mockUri,
    };
    expect(result).toMatchObject(expectedFileUploadWithExtras);
  });

  it("creates a FileUpload with uri for the name when SourceFile has no name", () => {
    const mockSourceFileWithNoName = {
      ...mockSourceFile,
      name: "",
      uri: mockUri,
    };

    const result = buildFileUpload(
      mockSourceFileWithNoName,
      mockBatchId,
      mockBatchCount,
    );

    const expectedFileUploadWithUriName = {
      ...expectedFileUpload,
      name: mockFileName,
    };
    expect(result).toMatchObject(expectedFileUploadWithUriName);
  });
  it("creates a FileUpload with a UUID for the name when SourceFile has no name or uri", () => {
    const mockSourceFileWithNoNameNoUri = {
      ...mockSourceFile,
      name: "",
      uri: undefined,
    };

    const result = buildFileUpload(
      mockSourceFileWithNoNameNoUri,
      mockBatchId,
      mockBatchCount,
    );

    const expectedFileUploadWithUUIDName = {
      ...expectedFileUpload,
      name: mockUUID,
    };
    expect(result).toMatchObject(expectedFileUploadWithUUIDName);
  });
});
