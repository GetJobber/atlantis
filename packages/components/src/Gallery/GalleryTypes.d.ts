import { IconNames } from "../Icon";

export type FileIconsNames = Extract<
  IconNames,
  "file" | "excel" | "pdf" | "video" | "word"
>;

export interface File {
  /**
   * The name of the file.
   */
  readonly name: string;

  /**
   * The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file
   */
  readonly type: string;

  /**
   * The data url of the file.
   */
  src: string;
}
