import { FileUpload } from "../InputFile";

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
   * Function to execute when format file is clicked
   */
  onClick?(event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void;

  /**
   * onDelete callback - this function will be called when the delete action is triggered
   */
  onDelete?(): void;

  /**
   * Available Component Overrides
   */
  slots?: {
    thumbnail?: React.FC;
    progress?: React.FC;
    expanded?: React.FC;
    deleteButton?: React.FC;
  };
}

export type UseFormatFileStylesProps = Pick<
  FormatFileProps,
  "display" | "displaySize"
> & { onClick: boolean; isComplete: boolean; onDelete: boolean };

export type UseFormatFileProps = Pick<FormatFileProps, "file" | "onClick">;
