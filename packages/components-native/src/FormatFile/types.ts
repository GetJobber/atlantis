export enum StatusCode {
  Pending,
  Started,
  InProgress,
  Completed,
  Failed,
}

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
  cancel: () => void;

  /**
   * Number of retries to upload
   */
  retries?: number;

  /**
   * Error message when upload fails
   */
  errorMessage?: string;
}

export interface File {
  contentType?: string;
  fileName?: string;
  thumbnailUrl?: string;
  url?: string;
  fileSize: number;
}

export interface FormattedFile {
  showPreview: boolean;
  source?: string;
  thumbnailUrl?: string;
  name?: string;
  size: number;
  external: boolean;
  progress: number;
  status: StatusCode;
  error: boolean;
  type?: string;
  isMedia?: boolean;
  showFileTypeIndicator: boolean;
}

export interface CreateThumbnailResponse {
  readonly thumbnail: string | undefined;
  readonly error: boolean;
}
export type CreateThumbnail = (
  formattedFile: FormattedFile,
) => Promise<CreateThumbnailResponse>;
