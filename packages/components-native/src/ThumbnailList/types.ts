import { CreateThumbnail, File } from "../FormatFile";

export enum RowCount {
  TwoRows = 2,
  ThreeRows = 3,
}

export interface ThumbnailListProps {
  files: File[];
  rowCount?: RowCount;
  handleOpenFile?: ({
    file,
    index,
    imageList,
  }: {
    file: File;
    index: number;
    imageList: File[];
  }) => void;
  createThumbnail: CreateThumbnail;
}
