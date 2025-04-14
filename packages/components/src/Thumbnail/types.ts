import { FileUpload } from "../InputFile";

export interface ThumbnailProps {
  file: FileUpload;
  size: "base" | "large";
  readonly compact: boolean;
}
