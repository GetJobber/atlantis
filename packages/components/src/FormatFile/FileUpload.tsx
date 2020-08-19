export interface FileUpload {
  /**
   * File Identifier
   */
  readonly key: string;
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
   * The data url of the file.
   */
  src?(): Promise<string>;
}
