import { createContext, useContext } from "react";
import { AtlantisFormatFileContextProps } from "./types";

export const formatFileContextDefaultValues = {
  useCreateThumbnail: () => ({ thumbnail: undefined, error: false }),
};

export const AtlantisFormatFileContext =
  createContext<AtlantisFormatFileContextProps>(formatFileContextDefaultValues);

export function useAtlantisFormatFileContext(): AtlantisFormatFileContextProps {
  return useContext(AtlantisFormatFileContext);
}
