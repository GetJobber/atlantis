import { v4 } from "react-native-uuid";
import { File } from "../../types";
import { FileUpload, StatusCode } from "../../../InputFile";

export const FILE_UPLOAD_MOCK_FILE = ({
  progress,
  status = StatusCode.InProgress,
}: {
  progress: number;
  status?: StatusCode;
}): FileUpload => ({
  batchContext: {
    batchCount: 1,
    batchId: "FILES",
  },
  uuid: v4(),
  key: "path/test.txt",
  name: "test.txt",
  size: 1,
  type: "application/txt",
  progress: progress,
  status: status,
  sourcePath: "path/test.txt",
  uploadUrl: "uploadUrl",
  cancel: jest.fn(),
});

export const FILE_UPLOAD_MOCK_IMAGE = ({
  progress,
  size,
  status = StatusCode.InProgress,
}: {
  progress: number;
  size?: number;
  status?: StatusCode;
}): FileUpload => ({
  batchContext: {
    batchCount: 1,
    batchId: "IMAGES",
  },
  uuid: v4(),
  key: "path/test.png",
  name: "test.png",
  size: size || 1,
  type: "image/png",
  progress: progress,
  status: status,
  sourcePath: "path/test.png",
  uploadUrl: "uploadUrl",
  cancel: jest.fn(),
});

export const FILE_UPLOAD_MOCK_PDF = ({
  progress,
  status = StatusCode.InProgress,
}: {
  progress: number;
  status?: StatusCode;
}): FileUpload => ({
  batchContext: {
    batchCount: 1,
    batchId: "FILES",
  },
  uuid: v4(),
  key: "path/test.pdf",
  name: "test.pdf",
  size: 1,
  type: "file/pdf",
  progress: progress,
  status: status,
  sourcePath: "path/test.pdf",
  uploadUrl: "uploadUrl",
  cancel: jest.fn(),
});

export const FILE_MOCK_PDF: File = {
  fileName: "some_file.pdf",
  fileSize: 1,
  contentType: "pdf",
  url: "https://path/to/file.pdf",
  thumbnailUrl: "https://path/to/fileThumbnail.pdf",
};

export const FILE_MOCK_VIDEO: File = {
  fileName: "some_file.mp4",
  fileSize: 1,
  contentType: "video",
  url: undefined, //undefined to prevent thumbnail errors
  thumbnailUrl: "path/to/fileThumbnail.mp4",
};

export const FILE_MOCK_FILE: File = {
  fileName: "some_file.txt",
  fileSize: 1,
  contentType: "file",
  url: "https://path/to/file",
  thumbnailUrl: "https://path/to/fileThumbnail",
};

export const FILE_MOCK_IMAGE: File = {
  fileName: "some_image.jpg",
  fileSize: 1,
  contentType: "image/jpg",
  url: "https://path/to/image",
  thumbnailUrl: "https://path/to/imageThumbnail",
};
