import type { IconNames } from "../Icon";
import type { FileUpload } from "../InputFile";

export type Sizes = "small" | "base" | "large" | "extraLarge";

export type FileIconsNames = Extract<
  IconNames,
  "file" | "excel" | "pdf" | "video" | "word"
>;

export interface GalleryProps {
  /**
   * The size of the files and their spacing in the gallery
   * @default "base"
   */
  size?: "base" | "large";

  /**
   * The files for the Gallery to display
   */
  files: GalleryFile[];

  /**
   * The max number of thumbnails before no more thumbnails are displayed
   * unless the user clicks an action to display the rest
   */
  max?: number;

  /**
   * onDelete callback - this function will be called when the delete action is
   * triggered on a Gallery image
   */
  onDelete?(file: GalleryFile): void;
}

export interface GalleryFile
  extends Pick<FileUpload, "key" | "name" | "type" | "size" | "progress"> {
  /**
   * The thumbnail url of the file.
   */
  readonly thumbnailSrc?: string;

  /**
   * The data url of the file.
   */
  readonly src: string | (() => Promise<string>);
}
