import { DocumentPickerResponse } from "react-native-document-picker";
import { Asset } from "react-native-image-picker";
import { validateFiles, validateFilesReturnType } from "./validateFiles";
import { MAX_SELECTED_FILES } from "../constants";

function generateMockDocPickerResponses(
  count: number,
): DocumentPickerResponse[] {
  const mockProperties = {
    uri: "",
    fileCopyUri: "",
    type: "",
    size: 20000000, // 20MB in Bytes
  };
  const mockDocPickerList: DocumentPickerResponse[] = [];

  for (let i = 0; i < count; i++) {
    mockDocPickerList.push({ ...mockProperties, name: `mockFile%{i + 1}.doc` });
  }

  return mockDocPickerList;
}
function generateMockAssets(count: number): Asset[] {
  const mockProperties = {
    uri: "",
    type: "",
    fileSize: 20000000, // 20MB in Bytes
  };
  const mockAssetList: Asset[] = [];

  for (let i = 0; i < count; i++) {
    mockAssetList.push({
      ...mockProperties,
      fileName: `mockImage%{i + 1}.jpeg`,
    });
  }

  return mockAssetList;
}
describe("validateFiles for an empty list", () => {
  it("correctly returns a valid result", () => {
    const result = validateFiles([]);
    expect(result).toBe(validateFilesReturnType.FilesValid);
  });
});

describe("validateFiles for a list of Image Picker Assets", () => {
  describe("with a valid list", () => {
    it("correctly returns a valid result", () => {
      const result = validateFiles(generateMockAssets(2));
      expect(result).toBe(validateFilesReturnType.FilesValid);
    });
  });
  describe("with a list of more files than allowed", () => {
    it("returns the correct too many files error", () => {
      const mockTooManyList = generateMockAssets(MAX_SELECTED_FILES + 1);
      const result = validateFiles(mockTooManyList);
      expect(result).toBe(validateFilesReturnType.TooManyFilesError);
    });
  });
  describe("with a list of files bigger than the maximum size allowed", () => {
    it("returns the correct too many files error", () => {
      const mockSizeTooBigList = generateMockAssets(26);
      const result = validateFiles(mockSizeTooBigList);
      expect(result).toBe(validateFilesReturnType.FileSizeExceededError);
    });
  });
});

describe("validateFiles for a list of Document Picker DocumentPickerResponses", () => {
  describe("with a valid list", () => {
    it("returns the correct valid response", () => {
      const mockNormalList = generateMockDocPickerResponses(2);
      const result = validateFiles(mockNormalList);
      expect(result).toBe(validateFilesReturnType.FilesValid);
    });
  });

  describe("with a list of more files than allowed", () => {
    it("returns the correct too many files error", () => {
      const mockTooManyList = generateMockDocPickerResponses(
        MAX_SELECTED_FILES + 1,
      );
      const result = validateFiles(mockTooManyList);
      expect(result).toBe(validateFilesReturnType.TooManyFilesError);
    });
  });
  describe("with a list of files bigger than the maximum size allowed", () => {
    it("returns the correct too many files error", () => {
      const mockSizeTooBigList = generateMockDocPickerResponses(26);
      const result = validateFiles(mockSizeTooBigList);
      expect(result).toBe(validateFilesReturnType.FileSizeExceededError);
    });
  });
});
