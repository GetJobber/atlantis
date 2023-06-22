import { FormattedFile } from "../types";

export interface UseCreateThumbnailResponse {
  readonly thumbnail: string | undefined;
  readonly error: boolean;
}
export type UseCreateThumbnail = (
  formattedFile: FormattedFile,
) => UseCreateThumbnailResponse;
export interface AtlantisFormatFileContextProps {
  useCreateThumbnail: UseCreateThumbnail;
}
