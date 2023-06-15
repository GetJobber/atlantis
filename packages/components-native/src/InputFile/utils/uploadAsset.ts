import { Platform } from "react-native";
import { SourceFile } from "../types";

const XHR_TIMEOUT = 60000;
const MAX_RETRIES = 4;

interface Headers {
  [field: string]: string;
}

interface LoadEvent {
  status: number;
  statusText: string;
  responseText: string;
}

interface ErrorEvent {
  type: "timeout" | "error";
  message: string;
}

export type UploadError = LoadEvent | ErrorEvent;

export function uploadAsset(
  asset: SourceFile,
  url: string,
  headers: Headers,
  onUploadStart: (cancel: () => void, retries?: number) => void,
  onUploadProgress: (
    fileSize: number,
    progress: number,
    cancel: () => void,
  ) => void,
  onUploadComplete: (fileSize: number) => void,
  onUploadError: (error: UploadError) => void,
): void {
  let retries = MAX_RETRIES;
  let fileSize = asset.size;

  const run = (retry = false) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    const formData = buildFormData(headers, asset);

    function cancelling() {
      xhr.abort();
    }

    if (retry) {
      onUploadStart(cancelling, MAX_RETRIES - retries);
    } else {
      onUploadStart(cancelling);
    }

    xhr.upload.addEventListener("progress", (event: ProgressEvent) => {
      // iOS inflates the file size once it starts to get uploaded. This should
      // help us in determining the correct file size.
      if (Platform.OS === "ios") {
        fileSize = event.total;
      }
      const progress = event.loaded / event.total;
      onUploadProgress(fileSize, progress, cancelling);
    });

    xhr.onload = () => {
      const xhrData = {
        status: xhr.status,
        statusText: xhr.statusText,
        responseText: xhr.responseText,
      };

      if (xhr.status >= 400) {
        onUploadError(xhrData);
      } else {
        onUploadComplete(fileSize);
      }
    };

    xhr.onerror = () => {
      const errData: ErrorEvent = {
        type: "error",
        message: xhr.responseText,
      };

      if (xhr.responseText === "Stream Closed") {
        if (retries--) {
          return run(true);
        } else {
          return onUploadError({
            type: "error",
            message: `Stream Closed - Attempts:  ${
              MAX_RETRIES + 1
            }, no more retries.`,
          });
        }
      }

      onUploadError(errData);
    };

    handleTimeout(xhr, onUploadError);

    xhr.send(formData);
  };

  run();
}

function buildFormData(headers: Headers, asset: SourceFile) {
  const formData = new FormData();
  Object.entries(headers).forEach(([field, value]) =>
    formData.append(field, value),
  );
  formData.append("file", asset);
  return formData;
}

function handleTimeout(
  xhr: XMLHttpRequest,
  onUploadError: (error: UploadError) => void,
) {
  xhr.ontimeout = () => {
    onUploadError({
      type: "timeout",
      message: `timeout occurred after ${XHR_TIMEOUT} ms when uploading asset to S3`,
    });
  };
  xhr.timeout = XHR_TIMEOUT;
}
