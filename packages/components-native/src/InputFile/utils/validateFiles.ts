import { DocumentPickerResponse } from "react-native-document-picker";
import { Asset } from "react-native-image-picker";
import { MAX_SELECTED_FILES, MAX_TOTAL_FILE_SIZE } from "../constants";

export enum validateFilesReturnType {
  TooManyFilesError = "TooManyFilesError",
  FileSizeExceededError = "FileSizeExceededError",
  FilesValid = "FilesValid",
}

export function validateFiles(
  files: Asset[] | DocumentPickerResponse[],
): validateFilesReturnType {
  if (files.length > MAX_SELECTED_FILES) {
    return validateFilesReturnType.TooManyFilesError;
  }

  let totalFileSize = 0;
  files.forEach((file: Asset | DocumentPickerResponse) => {
    if ("fileSize" in file) {
      totalFileSize += file.fileSize || 0;
    } else if ("size" in file) {
      totalFileSize += file.size || 0;
    }
  });

  if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
    return validateFilesReturnType.FileSizeExceededError;
  }

  return validateFilesReturnType.FilesValid;
}
