import getHumanReadableFileSize from "filesize";
import { FormatFileProps } from "./types";

export const useFormatFile = ({ file }: FormatFileProps) => {
  const isComplete = file.progress >= 1;
  const fileSize = getHumanReadableFileSize(file.size);

  return {
    isComplete,
    fileSize,
  };
};
