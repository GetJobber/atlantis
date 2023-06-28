import React from "react";
import { View } from "react-native";
import isNil from "lodash/isNil";
import { RowCount, ThumbnailListProps } from "./types";
import { styles } from "./ThumbnailList.style";
import { File, FormatFile } from "../FormatFile";

function isImage(file: File) {
  return !!file.contentType && file.contentType.includes("image/");
}

function hasValidUrl(file: File) {
  return !isNil(file.url);
}

export const filterImages = (files: File[]): File[] => {
  return files.filter((file: File) => {
    return isImage(file) && hasValidUrl(file);
  });
};

export function ThumbnailList({
  files,
  rowCount = RowCount.TwoRows,
  handleOpenFile,
  createThumbnail,
}: ThumbnailListProps): JSX.Element {
  const imageList = filterImages(files);

  return (
    <View
      style={[
        styles.list,
        rowCount === RowCount.ThreeRows && styles.maxDimensionsForThreeRows,
      ]}
    >
      {files.map((file, index) => {
        return (
          <FormatFile
            file={file}
            accessibilityLabel={file.fileName}
            key={`${file.fileName}-${index}`}
            styleInGrid
            onTap={openFile(file, index)}
            createThumbnail={createThumbnail}
          />
        );
      })}
    </View>
  );

  function openFile(file: File, index: number) {
    return () => {
      handleOpenFile?.({ file, index, imageList });
    };
  }
}
