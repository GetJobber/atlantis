import { StatusCode } from "../InputFile";

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
