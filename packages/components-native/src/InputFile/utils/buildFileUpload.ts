import { v4 } from "react-native-uuid";
import { FileUpload, SourceFile, StatusCode } from "../types";

export function buildFileUpload(
  file: SourceFile,
  batchId: string,
  batchCount: number,
): FileUpload {
  return {
    uuid: v4(),
    name: fileName(),
    type: file.type,
    size: file.size,
    progress: 0,
    status: StatusCode.Pending,
    sourcePath: file.uri || "",
    dimension: file.dimension,
    batchContext: {
      batchId: batchId,
      batchCount: batchCount,
    },
    cancel: () => {
      // Do nothing by default
    },
  };

  function fileName(): string {
    if (file.name) {
      return file.name;
    }

    if (file.uri) {
      return file.uri.split("/").pop() ?? v4();
    }

    return v4();
  }
}
