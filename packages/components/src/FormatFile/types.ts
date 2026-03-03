import type React from "react";
import type { FileUpload } from "../InputFile";

export interface FormatFileProps {
  /**
   * File upload details object. (See FileUpload type.)
   */
  readonly file: FileUpload;

  /**
   * To display as either a file row or thumbnail
   *
   * @default "expanded"
   */
  readonly display?: "expanded" | "compact";

  /**
   * The base dimensions of the thumbnail
   *
   * @default "base"
   */
  readonly displaySize?: "base" | "large";

  /**
   * Whether the format file is active. This will apply the focus styles to the thumbnail.
   *
   * @default false
   */
  readonly active?: boolean;

  /**
   * Function to execute when format file is clicked
   */
  onClick?(event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;

  /**
   * **Use at your own risk:** Custom styles for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    thumbnailContainer?: React.CSSProperties;
  };
}
