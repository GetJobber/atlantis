import { DocumentPickerResponse } from "react-native-document-picker";
import {
  getFileExtensions,
  partitionFilesBySafety,
} from "./fileExtensionSafetyUtils";

const mockUnusedProperties = {
  uri: "",
  fileCopyUri: "",
  type: "",
  size: 0,
};
const unsafeFile: DocumentPickerResponse = {
  name: "dobadthings.exe",
  ...mockUnusedProperties,
};
const unsafeFile2: DocumentPickerResponse = {
  name: "dobadthings.vmdk",
  ...mockUnusedProperties,
};
const safeFile: DocumentPickerResponse = {
  name: "aSafeImage.jpeg",
  ...mockUnusedProperties,
};
const safeFile2: DocumentPickerResponse = {
  name: "aSafeFile.docx",
  ...mockUnusedProperties,
};
const safeFile3: DocumentPickerResponse = {
  name: "anotherSafeFile.docx",
  ...mockUnusedProperties,
};
const safeNoExtensionFile: DocumentPickerResponse = {
  name: "aSafeFile",
  ...mockUnusedProperties,
};
const safeButWeirdFile: DocumentPickerResponse = {
  name: "exe",
  ...mockUnusedProperties,
};
const unsafeButWeirdFile: DocumentPickerResponse = {
  name: ".docx.dmg",
  ...mockUnusedProperties,
};

describe("partitionFilesBySafety", () => {
  it("returns an empty result if the list is empty", () => {
    const result = partitionFilesBySafety([]);

    expect(result.safe).toEqual([]);
    expect(result.unsafe).toEqual([]);
  });

  it("partitions a list of safe and unsafe files", () => {
    const result = partitionFilesBySafety([
      unsafeFile,
      safeFile,
      unsafeFile2,
      safeFile2,
    ]);

    expect(result.safe.length).toEqual(2);
    expect(result.safe.includes(safeFile)).toBe(true);
    expect(result.safe.includes(safeFile2)).toBe(true);

    expect(result.unsafe.length).toEqual(2);
    expect(result.unsafe.includes(unsafeFile)).toBe(true);
    expect(result.unsafe.includes(unsafeFile2)).toBe(true);
  });

  it("returns a list of all safe ones", () => {
    const result = partitionFilesBySafety([safeFile2, safeFile]);

    expect(result.safe.length).toEqual(2);
    expect(result.safe.includes(safeFile)).toBe(true);
    expect(result.safe.includes(safeFile2)).toBe(true);

    expect(result.unsafe.length).toEqual(0);
    expect(result.unsafe).toEqual([]);
  });
  it("returns a list of all unsafe ones", () => {
    const result = partitionFilesBySafety([unsafeFile, unsafeFile2]);

    expect(result.safe.length).toEqual(0);
    expect(result.safe).toEqual([]);

    expect(result.unsafe.length).toEqual(2);
    expect(result.unsafe.includes(unsafeFile)).toBe(true);
    expect(result.unsafe.includes(unsafeFile2)).toBe(true);
  });
  it("handles weird filenames", () => {
    const result = partitionFilesBySafety([
      safeNoExtensionFile,
      safeButWeirdFile,
      unsafeButWeirdFile,
    ]);

    expect(result.safe.length).toEqual(2);
    expect(result.safe.includes(safeNoExtensionFile)).toBe(true);
    expect(result.safe.includes(safeButWeirdFile)).toBe(true);

    expect(result.unsafe.length).toEqual(1);
    expect(result.unsafe.includes(unsafeButWeirdFile)).toBe(true);
  });
});

describe("getFileExtensions", () => {
  it("returns nothing from an empty list", () => {
    const result = getFileExtensions([]);

    expect(result).toEqual([]);
  });
  it("returns nothing from a list of files with no extensions", () => {
    const result = getFileExtensions([safeNoExtensionFile, safeButWeirdFile]);

    expect(result).toEqual([]);
  });
  it("returns extensions for a list of files", () => {
    const result = getFileExtensions([
      safeFile,
      safeFile2,
      unsafeFile,
      unsafeButWeirdFile,
    ]);

    expect(result.length).toEqual(4);
    expect(result.includes("exe")).toBe(true);
    expect(result.includes("dmg")).toBe(true);
    expect(result.includes("docx")).toBe(true);
    expect(result.includes("jpeg")).toBe(true);
  });
  it("returns only 1 extension when multiple files have the same extension", () => {
    const result = getFileExtensions([safeFile2, safeFile3]);

    expect(result.length).toEqual(1);
    expect(result.includes("docx")).toBe(true);
  });
});
