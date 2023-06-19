import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { Alert, Platform, View } from "react-native";
import { openSettings } from "react-native-permissions";
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
} from "react-native-document-picker";
import React from "react";
import { IntlShape, useIntl } from "react-intl";
import { v4 } from "react-native-uuid";
import {
  PermissionsType,
  checkAndRequestCameraPermissions,
  checkAndRequestGalleryPermissions,
} from "./utils/permissions";
import { messages } from "./messages";
import { UploadError, uploadAsset } from "./utils/uploadAsset";
import { styles } from "./InputFile.style";
import {
  CancelCallback,
  FileSource,
  FileUpload,
  ResizeOptions,
  SourceFile,
  StatusCode,
  UploadParams,
} from "./types";
import {
  CONCURRENT_UPLOADS,
  EMAIL_IMAGE_DIMENSION,
  MAX_SELECTED_FILES,
  SMALL_IMAGE_DIMENSION,
} from "./constants";
import {
  getFileExtensions,
  partitionFilesBySafety,
} from "./utils/fileExtensionSafetyUtils";
import { validateFiles, validateFilesReturnType } from "./utils/validateFiles";
import { buildFileUpload } from "./utils/buildFileUpload";
import { buildSourceFile } from "./utils/buildSourceFile";
import { useAtlantisContext } from "../AtlantisContext";
import { Button } from "../Button";
import { AtlantisNativeInterface } from "../AtlantisNativeInterface";

type AllowedTypes = "images" | "videos" | "mixed";

export interface InputFileProps {
  /**
   * Allowed File types.
   */
  readonly allowedTypes?: AllowedTypes;

  /**
   * Defines how many files can be selected and uploaded.
   */
  readonly type?: "singleSelect" | "incrementSelect" | "multiSelect";

  /**
   * Accessibility label
   */
  readonly accessibilityLabel?: string;

  /**
   * Accessibility hint
   */
  readonly accessibilityHint?: string;

  /**
   * Changes the image dimension and/or quality that changes the file size.
   *
   * @default "original"
   */
  readonly imageQuality?: "original" | "email" | "small";

  /**
   * Input error handler. Triggered when error selecting files.
   */
  onInputError?: (error: string) => void;

  /**
   * A callback that receives a file object and returns a UploadParams needed to upload the file.
   */
  getUploadParams: (file: SourceFile) => UploadParams | Promise<UploadParams>;

  /**
   * Upload event handler. Triggered before upload start, when file is first selected.
   */
  onFileSelected?: (file: FileUpload) => void;

  /**
   * Upload event handler. Triggered on upload start.
   */
  onUploadStart?: (file: FileUpload) => void;

  /**
   * Upload event handler. Triggered as upload progresses.
   */
  onUploadProgress?: (file: FileUpload) => void;

  /**
   * Upload event handler. Triggered on upload completion.
   */
  onUploadComplete?: (file: FileUpload) => void;

  /**
   * Upload event handler. Triggered on upload error.
   */
  onUploadError?: (file: FileUpload) => void;
}

// We structure this so it can be passed directly to the ImagePicker Library
const imageQualityOptions: Record<
  Required<InputFileProps>["imageQuality"],
  ResizeOptions | undefined
> = {
  original: {
    maxWidth: undefined,
    maxHeight: undefined,
    quality: undefined,
  },
  email: {
    maxWidth: EMAIL_IMAGE_DIMENSION,
    maxHeight: EMAIL_IMAGE_DIMENSION,
    quality: 0.7,
  },
  small: {
    maxWidth: SMALL_IMAGE_DIMENSION,
    maxHeight: SMALL_IMAGE_DIMENSION,
    quality: 1,
  },
};

// Using MIME types and partial matches to include most files but
//  not image or video
//  reference: https://www.iana.org/assignments/media-types/media-types.xhtml
const restrictedToTypes = ["application/*", "audio/*", "text/*"];

interface FileToUpload {
  sourceFile: SourceFile;
  fileUpload: FileUpload;
}

type MediaSource = FileSource.gallery | FileSource.video | FileSource.camera;

interface MediaSourceSettings {
  readonly requestPermission: () => Promise<PermissionsType>;
  readonly permitted: (permissions: PermissionsType) => boolean;
  readonly capture: (
    responseHandler: (response: ImagePickerResponse) => void,
  ) => void;
  readonly messages: {
    permissionDeniedTitle: typeof messages.permissionFailedCamera;
    permissionDeniedMessage: typeof messages.permissionFailedDescription;
  };
}

const mediaTypes: Record<AllowedTypes, MediaType> = {
  images: "photo",
  videos: "video",
  mixed: "mixed",
};

function useInputFileHooks() {
  const { onLogError, isOnline } = useAtlantisContext();
  return { isOnline, onLogError };
}

const IS_ANDROID_33_OR_GREATER =
  Platform.OS === "android" && Platform.Version >= 33;

function getMenuOptions(formatMessage: IntlShape["formatMessage"]) {
  const menuOptions = {
    images: [
      {
        title: formatMessage(messages.takePhoto),
        value: FileSource.camera,
      },
      {
        title: formatMessage(messages.chooseFromLibrary),
        value: FileSource.gallery,
      },
    ],
    videos: [
      ...(IS_ANDROID_33_OR_GREATER
        ? []
        : [
            {
              title: formatMessage(messages.takeVideo),
              value: FileSource.video,
            },
          ]),
      {
        title: formatMessage(messages.chooseFromLibrary),
        value: FileSource.gallery,
      },
    ],
    mixed: [
      {
        title: formatMessage(messages.takePhoto),
        value: FileSource.camera,
      },
      ...(IS_ANDROID_33_OR_GREATER
        ? []
        : [
            {
              title: formatMessage(messages.takeVideo),
              value: FileSource.video,
            },
          ]),
      {
        title: formatMessage(messages.chooseFromLibrary),
        value: FileSource.gallery,
      },
      {
        title: formatMessage(messages.browseFiles),
        value: FileSource.document,
      },
    ],
  };

  return menuOptions;
}

/* eslint max-statements: ["error", 15] */
export function InputFile({
  type = "singleSelect",
  allowedTypes = "mixed",
  accessibilityLabel,
  accessibilityHint,
  imageQuality = "original",
  onInputError,
  onFileSelected,
  getUploadParams,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
}: InputFileProps): JSX.Element {
  const { formatMessage } = useIntl();
  const { isOnline, onLogError } = useInputFileHooks();
  if (Platform.OS === "ios") {
    console.warn("InputFile is not supported on iOS");
  }
  return (
    <View style={[type !== "singleSelect" && styles.multiFile]}>
      <Button
        type="secondary"
        icon="add"
        fullHeight={true}
        onPress={() => {
          if (!isOnline) {
            return Alert.alert(
              formatMessage(messages.unavailableNetworkTitle),
              formatMessage(messages.unavailableNetworkMessage),
            );
          }

          return onPress();
        }}
        accessibilityLabel={
          accessibilityLabel ?? formatMessage(messages.defaultLabel)
        }
        accessibilityHint={
          accessibilityHint ?? formatMessage(messages.defaultHint)
        }
      />
    </View>
  );

  function filesSelected(selectedFiles: Asset[] | DocumentPickerResponse[]) {
    const files: FileToUpload[] = [];
    const batchId = v4();

    selectedFiles.forEach((file: Asset | DocumentPickerResponse) => {
      const sourceFile = buildSourceFile(file);
      const fileUpload = buildFileUpload(
        sourceFile,
        batchId,
        selectedFiles.length,
      );

      onFileSelected?.(fileUpload);
      files.push({ sourceFile, fileUpload });
    });

    function handleOnStart(fileUpload: FileUpload) {
      return function onStart(cancel: CancelCallback, retries?: number) {
        onUploadStart?.({
          ...fileUpload,
          cancel,
          status: StatusCode.Started,
          retries: retries ? retries : 0,
        });
      };
    }

    function handleOnProgress(fileUpload: FileUpload) {
      return function onProgress(
        fileSize: number,
        progress: number,
        cancel: CancelCallback,
      ) {
        onUploadProgress?.({
          ...fileUpload,
          size: fileSize,
          progress,
          cancel,
          status: StatusCode.InProgress,
        });
      };
    }

    function handleOnComplete(fileUpload: FileUpload) {
      return function onComplete(fileSize: number) {
        onUploadComplete?.({
          ...fileUpload,
          size: fileSize,
          progress: 1,
          status: StatusCode.Completed,
        });
        uploadNext();
      };
    }

    function handleError(fileUpload: FileUpload, error: UploadError) {
      onUploadComplete?.({
        ...fileUpload,
        progress: 0,
        status: StatusCode.Completed,
      });
      onUploadError?.({
        ...fileUpload,
        status: StatusCode.Failed,
        errorMessage: JSON.stringify(error),
      });
      uploadNext();
    }

    function handleOnError(fileUpload: FileUpload) {
      return function OnError(error: UploadError) {
        onLogError(`[File upload] ${JSON.stringify(error)}`);
        handleError(fileUpload, error);
      };
    }

    function uploadNext() {
      if (files.length > 0) {
        const file = files[0];
        files.splice(0, 1);
        upload(file);
      }
    }

    async function upload(file: FileToUpload) {
      try {
        const {
          url,
          key,
          fields = {},
        } = await getUploadParams(file.fileUpload);
        file.fileUpload.key = key;
        file.fileUpload.uploadUrl = encodeURI(`${url}/${key}`);

        uploadAsset(
          file.sourceFile,
          url,
          fields,
          handleOnStart(file.fileUpload),
          handleOnProgress(file.fileUpload),
          handleOnComplete(file.fileUpload),
          handleOnError(file.fileUpload),
        );
      } catch (e: any) {
        onLogError(`[File upload] getUploadParams failed ${JSON.stringify(e)}`);
        handleError(file.fileUpload, e.message);
      }
    }

    // Kick off up to 4 concurrent uploads
    for (
      let idx = 0;
      idx < Math.min(CONCURRENT_UPLOADS, selectedFiles.length);
      idx++
    ) {
      uploadNext();
    }
  }

  function onPress() {
    const menuActions = getMenuOptions(formatMessage);
    const androidParams = {
      title: "Attach files",
      options: menuActions[allowedTypes],
    };
    if (Platform.OS === "android") {
      try {
        AtlantisNativeInterface.openActionSheet(androidParams)
          .then(async (result: number) => {
            handleActionSheetResponse(result);
          })
          .catch((e: Error) => {
            // catch rejected promises from iOS native layer
            if (e.message !== "Cancelled by user") {
              console.log(onLogError);
              onLogError(
                `[File upload] Android: not able to select media option to upload`,
              );
            }
          });
      } catch (e: any) {
        if (e.message !== "Cancelled by user") {
          console.log(onLogError);
          onLogError(
            `[File upload] Android: not able to select media option to upload`,
          );
        }
      }
    }
  }

  function handleMediaSelection(sourceLocation: MediaSource) {
    const source = getMediaSourceSettings(sourceLocation);

    source
      .requestPermission()
      .then(permissions => {
        if (source.permitted(permissions)) {
          source.capture((response: ImagePickerResponse) => {
            if (response.errorCode) {
              onLogError(
                `[File upload] image picker failed with code:${response.errorCode} message:${response.errorMessage}}`,
              );
              return;
            }
            if (response.didCancel) {
              // console.log("File upload media selection cancelled by user");
              return;
            }
            if (!response.assets) {
              onLogError(`[File upload] image picker failed because no assets`);
              return;
            }
            if (checkFilesSelected(response.assets)) {
              filesSelected(response.assets);
            }
          });
        } else {
          Alert.alert(
            formatMessage(source.messages.permissionDeniedTitle),
            formatMessage(source.messages.permissionDeniedMessage),
            [
              {
                text: formatMessage(messages.permissionFailedCancelButton),
                style: "cancel",
              },
              {
                text: formatMessage(
                  messages.permissionFailedGotoSettingsButton,
                ),
                onPress: () => openSettings(),
              },
            ],
          );
        }
      })
      .catch((e: any) => {
        onLogError(
          `[File upload] requestPermission threw exception:${JSON.stringify(
            e,
          )}`,
        );
      });
  }

  function getMediaSourceSettings(source: MediaSource): MediaSourceSettings {
    switch (source) {
      case FileSource.camera:
        return {
          requestPermission: checkAndRequestCameraPermissions,
          permitted: (permissions: PermissionsType) => permissions.camera,
          capture: withResponseHandler(launchCamera, {
            mediaType: "photo",
            saveToPhotos: true,
            ...imageQualityOptions[imageQuality],
          }),
          messages: {
            permissionDeniedTitle: messages.permissionFailedCamera,
            permissionDeniedMessage: messages.permissionFailedDescription,
          },
        };

      case FileSource.video:
        return {
          requestPermission: checkAndRequestCameraPermissions,
          permitted: (permissions: PermissionsType) => permissions.camera,
          capture: withResponseHandler(launchCamera, {
            mediaType: "video",
            saveToPhotos: true,
          }),
          messages: {
            permissionDeniedTitle: messages.permissionFailedCamera,
            permissionDeniedMessage: messages.permissionFailedDescription,
          },
        };

      case FileSource.gallery:
        return {
          requestPermission: checkAndRequestGalleryPermissions,
          permitted: (permissions: PermissionsType) => permissions.photoLibrary,
          capture: withResponseHandler(launchImageLibrary, {
            mediaType: mediaTypes[allowedTypes],
            selectionLimit: type === "multiSelect" ? MAX_SELECTED_FILES : 1,
            ...imageQualityOptions[imageQuality],
          }),
          messages: {
            permissionDeniedTitle: messages.permissionFailedGallery,
            permissionDeniedMessage: messages.permissionFailedDescription,
          },
        };
    }
  }

  function processDocumentPickerFiles(
    docPickerFiles: DocumentPickerResponse[],
  ): DocumentPickerResponse[] {
    const filteredFileList = getFilteredFiles(
      docPickerFiles,
      formatMessage,
      onInputError,
    );
    if (filteredFileList.length === 0) return [];

    if (!checkFilesSelected(filteredFileList)) return [];

    return filteredFileList;
  }

  async function handleFileSelection() {
    try {
      const pickerResult = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        allowMultiSelection: type === "multiSelect",
        // restrict file types on Android only
        ...(Platform.OS === "android"
          ? {
              type: restrictedToTypes,
            }
          : undefined),
      });
      if (pickerResult.length === 0) return;

      const processedFileList = await processDocumentPickerFiles(pickerResult);
      if (processedFileList.length === 0) return;

      filesSelected(processedFileList);
    } catch (e) {
      handleDocPickerExceptions(e as unknown);
    }
  }

  function handleDocPickerExceptions(e: unknown) {
    if (DocumentPicker.isCancel(e)) {
      //by default, do nothing on
      return;
    }

    if (isInProgress(e)) {
      console.warn(
        "multiple pickers were opened, only the last will be considered",
      );
    } else {
      console.error("Exception raised form document picker", e);
    }
  }

  function checkFilesSelected(
    files: Asset[] | DocumentPickerResponse[],
  ): boolean {
    const result = validateFiles(files);

    if (result === validateFilesReturnType.FileSizeExceededError) {
      onInputError?.(formatMessage(messages.tooManyFiles));
      return false;
    }

    if (result === validateFilesReturnType.TooManyFilesError) {
      onInputError?.(formatMessage(messages.filesTooLarge));
      return false;
    }
    return true;
  }

  function handleActionSheetResponse(fileSource: FileSource) {
    switch (fileSource) {
      case FileSource.gallery: {
        handleMediaSelection(FileSource.gallery);
        break;
      }
      case FileSource.camera: {
        handleMediaSelection(FileSource.camera);
        break;
      }
      case FileSource.video: {
        handleMediaSelection(FileSource.video);
        break;
      }
      case FileSource.document: {
        handleFileSelection();
        break;
      }
      default: {
        break;
      }
    }
  }
}

function withResponseHandler(
  launcher: typeof launchImageLibrary | typeof launchCamera,
  options: ImageLibraryOptions | CameraOptions,
) {
  return function (handlePickerResponse: {
    (response: ImagePickerResponse): void;
  }) {
    launcher(options, handlePickerResponse);
  };
}

function getFilteredFiles(
  files: DocumentPickerResponse[],
  formatMessage: IntlShape["formatMessage"],
  onInputError?: (message: string) => void,
): DocumentPickerResponse[] {
  const partitionedFiles = partitionFilesBySafety(files);

  if (partitionedFiles.unsafe.length > 0) {
    onInputError?.(
      formatMessage(messages.invalidFileExtension, {
        blockedExtensionsFound: getFileExtensions(
          partitionedFiles.unsafe,
        ).toString(),
      }),
    );
  }

  return partitionedFiles.safe;
}
