/* eslint-disable no-null/no-null */
import { useMemo } from "react";
import { File, GalleryItem } from "./GalleryTypes";
import { LightBoxImage } from "../LightBox";

export function useFiles(files: File[]) {
  const items = useMemo<GalleryItem[]>(
    () =>
      files.map(({ name, type, src }) => ({
        name,
        type,
        src,
        icon: getIcon(type),
      })),
    [files],
  );

  const images = useMemo<LightBoxImage[]>(
    () =>
      files
        .filter(file => file.type.match(/^image\/.*$/) !== null)
        .map(({ name, src }) => ({
          title: name,
          url: src,
        })),
    [files],
  );

  function getIcon(type: string) {
    if (type.match(/^image\/.*$/) !== null) return undefined;
    if (type.match(/^video\/.*$/) !== null) return "video";

    switch (type) {
      case "application/pdf": {
        return "pdf";
      }
      case "application/msword": {
        return "word";
      }
      case "application/vnd.ms-excel": {
        return "excel";
      }
      default: {
        return "file";
      }
    }
  }

  return { items, images };
}
