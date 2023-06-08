// Types

import { ImageLibraryOptions } from "react-native-image-picker";

// A common interface for on-device files
export interface SourceFile {
  size: number;
  name: string;
  type: string;
  uri?: string;
  dimension?: {
    width: number;
    height: number;
  };
}

export enum FileSource {
  gallery = 0,
  camera = 1,
  video = 2,
  document = 3,
}

export enum StatusCode {
  Pending,
  Started,
  InProgress,
  Completed,
  Failed,
}

export type CancelCallback = () => void;

export interface FileUpload {
  /**
   * File Identifier
   */
  key?: string;

  /**
   * Universally unique identifier
   */
  readonly uuid: string;

  /**
   * The name of the file.
   */
  readonly name: string;

  /**
   * The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file
   */
  readonly type: string;

  /**
   * The size of the file in bytes.
   */
  readonly size: number;

  /**
   * The progress of a file upload between 0 and 1.
   * - `0` represents Upload just started.
   * - `1` represents a complete upload.
   */
  readonly progress: number;

  /**
   * The upload status of the file
   */

  status: StatusCode;

  /**
   * Represents the width and height for images
   */
  readonly dimension?: {
    width: number;
    height: number;
  };

  /**
   * Provides context about multi-file upload batch
   */
  readonly batchContext: {
    /**
     * Batch id
     */
    readonly batchId: string;

    /**
     * Number of files in batch
     */
    readonly batchCount: number;
  };

  /**
   * Url file was uploaded to, used to send in mutation to JO
   */
  uploadUrl?: string;

  /**
   * The url of the file.
   */
  sourcePath: string;

  /**
   * Cancel uploading this file
   */
  cancel: CancelCallback;

  /**
   * Number of retries to upload
   */
  retries?: number;

  /**
   * Error message when upload fails
   */
  errorMessage?: string;
}

export interface UploadParams {
  /**
   * Url to POST file to.
   */
  readonly url: string;

  /**
   * Key to identify file.
   * If unspecified a `uuid` will be used.
   */
  readonly key?: string;

  /**
   * Any extra fields to send with the upload POST.
   * If unspecified only the file will be included.
   */
  readonly fields?: { [field: string]: string };
}

export type ResizeOptions = Pick<
  ImageLibraryOptions,
  Required<"maxWidth" | "maxHeight" | "quality">
>;

export const excludedFileExtensions = [
  "exe",
  "dll",
  "dmp",
  "msp",
  "so",
  "scf",
  "sys",
  "class",
  "cmd",
  "bat",
  "com",
  "bin",
  "enc",
  "hex",
  "hqx",
  "dmg",
  "iso",
  "mdf",
  "nri",
  "pvm",
  "vcd",
  "vmdk",
];
