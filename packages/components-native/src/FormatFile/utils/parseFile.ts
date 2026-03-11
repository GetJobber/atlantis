import { acceptedExtensions, videoExtensions } from "../constants";
import type { File, FileUpload, FormattedFile } from "../types";
import { StatusCode } from "../types";

export function isMediaFile(fileType: string): boolean {
  return fileType.includes("image") || fileType.includes("video");
}

function isVideo(fileName: string): boolean {
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

  return videoExtensions.some(({ type }) => type === extension.toLowerCase());
}

function getContentType(fileName = "", fileType = "unknown"): string {
  if (isVideo(fileName)) {
    return "video";
  }

  return fileType;
}

function isAcceptedExtension(file: FormattedFile): boolean {
  return acceptedExtensions.some(extension =>
    // type property may return undefined on M1 Systems running iOS Simulator
    (file.type || "").includes(extension.name),
  );
}

export function parseFile(
  file: File | FileUpload,
  showFileTypeIndicator: boolean,
): FormattedFile {
  let formattedFile: FormattedFile;

  if ("progress" in file) {
    formattedFile = {
      source: file.sourcePath,
      name: file.name,
      size: file.size,
      external: false,
      progress: file.progress,
      status: file.status,
      error: file.status === StatusCode.Failed,
      type: file.type || file.key,
      isMedia: false,
      showPreview: false,
      showFileTypeIndicator: showFileTypeIndicator,
    };
  } else {
    formattedFile = {
      source: file.url,
      thumbnailUrl: file.thumbnailUrl,
      name: file.fileName,
      size: file.fileSize,
      external: true,
      progress: 1,
      status: StatusCode.Completed,
      error: false,
      type: getContentType(file.fileName, file.contentType),
      isMedia: false,
      showPreview: false,
      showFileTypeIndicator: showFileTypeIndicator,
    };
  }

  formattedFile.isMedia = isMediaFile(formattedFile.type || "");
  formattedFile.showPreview =
    formattedFile.isMedia || isAcceptedExtension(formattedFile);

  return formattedFile;
}
