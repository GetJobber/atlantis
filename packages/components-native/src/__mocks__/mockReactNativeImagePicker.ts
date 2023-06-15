import {
  // @ts-expect-error tsc-ci
  ImagePickerOptions,
  ImagePickerResponse,
} from "react-native-image-picker";

const response: ImagePickerResponse = {
  // @ts-expect-error tsc-ci
  customButton: "",
  didCancel: false,
  error: "",
  data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUuz73PwAFYAKbSSNX6QAAAABJRU5ErkJggg==",
  uri: "file://pixel.jpg",
  isVertical: false,
  width: 1,
  height: 1,
  fileSize: 70,
  type: "image/jpeg",
};

export const mockImagePickerDefaultFunction = (
  _options: ImagePickerOptions,
  callback: (arg0: ImagePickerResponse) => void,
): void => {
  callback(response);
};

class ImagePicker {
  showImagePicker = mockImagePickerDefaultFunction;
  launchCamera = mockImagePickerDefaultFunction;
  launchImageLibrary = mockImagePickerDefaultFunction;
}

// eslint-disable-next-line import/no-default-export
export default new ImagePicker();
