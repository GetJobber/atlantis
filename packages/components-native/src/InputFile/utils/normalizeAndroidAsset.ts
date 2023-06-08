import { Asset } from "react-native-image-picker";
import { getExtension, getType } from "mime";
import { v4 } from "react-native-uuid";

interface normalizedAssetDetails {
  filename: string;
  filetype: string;
}

// Special case: content type for video from image picker and from camera
// on Android are undefined so we assume type here is 'video/mp4'
const DEFAULT_FILE_TYPE = "video/mp4";

export function normalizeAndroidAsset(file: Asset): normalizedAssetDetails {
  let filename = file.fileName || v4();
  let filetype = file.type;

  if (!file.fileName || filename.match(/^\w+:\d+$/)) {
    filename = `${filename}.${getExtension(filetype || DEFAULT_FILE_TYPE)}`;
  }

  if (!filetype) {
    filetype = getType(filename) || DEFAULT_FILE_TYPE;
  }

  return { filename, filetype };
}
