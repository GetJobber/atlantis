import { Platform } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { Asset } from "react-native-image-picker";
import { normalizeAndroidAsset } from "./normalizeAndroidAsset";
import { SourceFile } from "../types";

// unify the two picker library results into one source file for processing
export function buildSourceFile(
  file: Asset | DocumentPickerResponse,
): SourceFile {
  let filename, filesize, filetype, dimension;

  if ("fileName" in file && "fileSize" in file) {
    // Type of `file` is Asset
    filesize = file.fileSize;
    ({ filename, filetype } = Platform.select({
      android: normalizeAndroidAsset(file),
      default: { filename: file.fileName, filetype: file.type },
    }));
  } else if ("name" in file && "size" in file) {
    // Type of `file` is DocumentPickerResponse
    filename = file.name;
    filesize = file.size;
    filetype = file.type;
  }

  if ("width" in file && file.width && "height" in file && file.height) {
    dimension = { width: file.width, height: file.height };
  }

  return {
    size: filesize || 0,
    name: filename || "",
    type: filetype || "unknown",
    ...(file.uri && { uri: file.uri }),
    dimension: dimension,
  };
}
