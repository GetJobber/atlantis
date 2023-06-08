import { Asset } from "react-native-image-picker";

export function uploadAssetToS3(
  _asset: Asset,
  url: string,
  _headers: { [field: string]: string },
  onUploadStart: (cancel: () => void) => void,
  onUploadProgress: (
    fileSize: number,
    progress: number,
    cancel: () => void,
  ) => void,
  onUploadComplete: (fileSize: number) => void,
  onUploadError: () => void,
): void {
  const cancel = jest.fn();
  switch (url) {
    case "start":
      onUploadStart(cancel);
      break;
    case "progress":
      onUploadStart(cancel);
      onUploadProgress(100, 0.5, cancel);
      break;
    case "error":
      onUploadStart(cancel);
      onUploadProgress(100, 0.5, cancel);
      onUploadError();
      break;
    default:
      onUploadStart(cancel);
      onUploadProgress(100, 0.5, cancel);
      onUploadComplete(100);
  }
}
