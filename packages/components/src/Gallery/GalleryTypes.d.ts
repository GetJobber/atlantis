import { IconNames } from "../Icon";

export type Sizes = "small" | "base" | "large" | "extraLarge";

export type FileIconsNames = Extract<
  IconNames,
  "file" | "excel" | "pdf" | "video" | "word"
>;

export interface GalleryProps {
  /**
   * The size of the Gallery and it's files
   * @default "base"
   */
  size?: "base" | "large";

  /**
   * The files for the gallery to display
   */
  files: File[];

  /**
   * The max number of thumbnails before no more thumbnails are displayed
   * unless the user clicks an action to display the rest
   */
  max?: number;
}

export interface File {
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
  src: string;

  /**
   * onDelete callback - this function will be called when the delete action is triggered on a gallery image
   */
  onDelete?: () => void;
}

interface GalleryItem extends File {
  icon?: FileIconsNames;
}
