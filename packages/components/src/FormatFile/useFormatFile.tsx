import getHumanReadableFileSize from "filesize";
import { UseFormatFileProps } from "./types";

export const useFormatFile = ({ onClick, file }: UseFormatFileProps) => {
  const isComplete = file.progress >= 1;
  const fileSize = getHumanReadableFileSize(file.size);

  const DetailsContainer: "button" | "div" =
    isComplete && onClick ? "button" : "div";

  return { fileSize, DetailsContainer, isComplete };
};
