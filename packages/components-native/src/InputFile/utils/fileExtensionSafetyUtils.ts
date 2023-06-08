import partition from "lodash/partition";
import { DocumentPickerResponse } from "react-native-document-picker";
import { excludedFileExtensions } from "../types";

interface filesPartionedBySafety {
  safe: DocumentPickerResponse[];
  unsafe: DocumentPickerResponse[];
}
export function partitionFilesBySafety(
  files: DocumentPickerResponse[],
): filesPartionedBySafety {
  const filesPartioned = partition(files, isFileSafe);

  return {
    safe: filesPartioned[0],
    unsafe: filesPartioned[1],
  };
}

function isFileSafe(file: DocumentPickerResponse): boolean {
  const fileParts = file.name.split(".");
  const extension = fileParts[fileParts.length - 1];

  return fileParts.length === 1 || !excludedFileExtensions.includes(extension);
}

export function getFileExtensions(
  fileList: DocumentPickerResponse[],
): string[] {
  const extensions: Set<string> = new Set();

  fileList.forEach(file => {
    const fileParts = file.name.split(".");
    const extension = fileParts[fileParts.length - 1];

    if (fileParts.length > 1) {
      extensions.add(extension);
    }
  });

  return Array.from(extensions);
}
