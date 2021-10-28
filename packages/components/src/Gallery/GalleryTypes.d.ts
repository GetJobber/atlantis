import { IconNames } from "../Icon";

export type Sizes = "small" | "base" | "large";

export type FileIconsNames = Extract<
  IconNames,
  "file" | "excel" | "pdf" | "video" | "word"
>;

export interface GalleryProps {
  /**
   * The size of the Gallery and it's files
   * @default "base"
   */
  size?: "small" | "base" | "large";
  files: File[];
}

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
  readonly src: string;
}

interface GalleryItem extends File {
  icon?: FileIconsNames;
}
