import { FormattedFile } from "../types";

export interface UseCreateThumbnailResponse {
  readonly thumbnail: string | undefined;
  readonly error: boolean;
}
export interface AtlantisFormatFileContextProps {
  useCreateThumbnail: (
    formattedFile: FormattedFile,
  ) => UseCreateThumbnailResponse;
}
