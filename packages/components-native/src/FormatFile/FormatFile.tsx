import React, { createRef, useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useIntl } from "react-intl";
import { messages } from "./messages";
import { styles } from "./FormatFile.style";
import { MediaView } from "./components/MediaView";
import {
  BottomSheetOptionsSuffix,
  FormatFileBottomSheet,
} from "./components/FormatFileBottomSheet";
import { FileView } from "./components/FileView";
import { acceptedExtensions, videoExtensions } from "./constants";
import {
  CreateThumbnail,
  File,
  FileUpload,
  FormattedFile,
  StatusCode,
} from "./types";
import { AtlantisFormatFileContext } from "./context/FormatFileContext";
import { createUseCreateThumbnail } from "./utils/createUseCreateThumbnail";
import { BottomSheetRef } from "../BottomSheet/BottomSheet";

interface FormatFileProps<T> {
  /**
   * File upload details object. Can be a File or a FileUpload
   */
  file: T;

  /**
   * Accessibility label
   */
  readonly accessibilityLabel?: string;

  /**
   * Accessibility hint
   */
  readonly accessibilityHint?: string;
  /**
   * A function which handles the onTap event.
   */
  onTap?: (file: T) => void;
  /**
   * A function to be called on "Remove" Bottom Sheet Option press
   */
  onRemove?: () => void;

  /**
   * Handler for the "Preview" Bottom Sheet Option press
   */
  onPreviewPress?: (formattedFile: FormattedFile) => void;
  /**
   * A file type to show at Bottom Sheet options
   */
  bottomSheetOptionsSuffix?: BottomSheetOptionsSuffix;

  /**
   * Uses a grid layout when multi-file upload is supported
   */
  styleInGrid?: boolean;

  /**
   * A reference to the element in the rendered output
   */
  readonly testID?: string;

  /**
   * Set false to hide the filetype icon
   */
  readonly showFileTypeIndicator?: boolean;

  readonly createThumbnail?: CreateThumbnail;
}

type FormatFileInternalProps = Omit<
  FormatFileProps<File | FileUpload>,
  "file" | "onTap"
> & {
  file: FormattedFile;
  onTap: () => void;
};

interface FormatFileContentProps {
  accessibilityLabel?: string;
  file: FormattedFile;
  showOverlay: boolean;
  styleInGrid: boolean;
  onUploadComplete: () => void;
  isMedia: boolean;
}

function FormatFileContent({
  accessibilityLabel,
  file,
  showOverlay,
  styleInGrid,
  onUploadComplete,
  isMedia,
}: FormatFileContentProps): JSX.Element {
  return (
    <View
      style={[
        styles.thumbnailContainer,
        styleInGrid && styles.thumbnailContainerGrid,
      ]}
    >
      {isMedia ? (
        <MediaView
          accessibilityLabel={accessibilityLabel}
          file={file}
          showOverlay={showOverlay}
          showError={file.error}
          styleInGrid={styleInGrid}
          onUploadComplete={onUploadComplete}
        />
      ) : (
        <FileView
          accessibilityLabel={accessibilityLabel}
          file={file}
          showOverlay={showOverlay}
          showError={file.error}
          styleInGrid={styleInGrid}
          onUploadComplete={onUploadComplete}
        />
      )}
    </View>
  );
}

const FormatFileInternalMemoized = React.memo(FormatFileInternal);

function isMediaFile(fileType: string): boolean {
  return fileType.includes("image") || fileType.includes("video");
}

function isVideo(fileName: string): boolean {
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

  return videoExtensions.some(({ type }) => type === extension.toLowerCase());
}

function getContentType(fileName = "", fileType = "unknown"): string {
  if (isVideo(fileName)) {
    return "video";
  }

  return fileType;
}

function isAcceptedExtension(file: FormattedFile): boolean {
  return acceptedExtensions.some(extension =>
    // type property may return undefined on M1 Systems running iOS Simulator
    (file.type || "").includes(extension.name),
  );
}

function parseFile(
  file: File | FileUpload,
  showFileTypeIndicator: boolean,
): FormattedFile {
  let formattedFile: FormattedFile;

  if ("progress" in file) {
    formattedFile = {
      source: file.sourcePath,
      name: file.name,
      size: file.size,
      external: false,
      progress: file.progress,
      status: file.status,
      error: file.status === StatusCode.Failed,
      type: file.type || file.key,
      isMedia: false,
      showPreview: false,
      showFileTypeIndicator: showFileTypeIndicator,
    };
  } else {
    formattedFile = {
      source: file.url,
      thumbnailUrl: file.thumbnailUrl,
      name: file.fileName,
      size: file.fileSize,
      external: true,
      progress: 1,
      status: StatusCode.Completed,
      error: false,
      type: getContentType(file.fileName, file.contentType),
      isMedia: false,
      showPreview: false,
      showFileTypeIndicator: showFileTypeIndicator,
    };
  }

  formattedFile.isMedia = isMediaFile(formattedFile.type || "");
  formattedFile.showPreview =
    formattedFile.isMedia || isAcceptedExtension(formattedFile);

  return formattedFile;
}

export function FormatFile<T extends File | FileUpload>({
  file,
  accessibilityLabel,
  accessibilityHint,
  onTap,
  onRemove,
  bottomSheetOptionsSuffix,
  styleInGrid = false,
  testID,
  showFileTypeIndicator = true,
  createThumbnail,
  onPreviewPress,
}: FormatFileProps<T>): JSX.Element {
  const onTapModified = onTap ? () => onTap(file) : () => undefined;

  const formattedFile = parseFile(file, showFileTypeIndicator);

  return (
    <FormatFileInternalMemoized
      file={formattedFile}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onTap={onTapModified}
      onRemove={onRemove}
      bottomSheetOptionsSuffix={bottomSheetOptionsSuffix}
      styleInGrid={styleInGrid}
      testID={testID}
      createThumbnail={createThumbnail}
      onPreviewPress={onPreviewPress}
    />
  );
}

function FormatFileInternal({
  file,
  accessibilityLabel,
  accessibilityHint,
  onTap,
  onRemove,
  bottomSheetOptionsSuffix,
  styleInGrid = false,
  onPreviewPress,
  testID,
  createThumbnail: createThumbnailProp,
}: FormatFileInternalProps): JSX.Element {
  const [showOverlay, setShowOverlay] = useState<boolean>(
    file.status !== StatusCode.Completed,
  );

  const { formatMessage } = useIntl();
  const bottomSheetRef = createRef<BottomSheetRef>();

  const handlePreviewPress = useCallback(() => {
    onPreviewPress?.(file);
  }, [file, onPreviewPress]);
  const createThumbnail = createThumbnailProp
    ? createThumbnailProp
    : async () => ({ error: false, thumbnail: "" });
  const { useCreateThumbnail } = createUseCreateThumbnail(createThumbnail);

  return (
    <AtlantisFormatFileContext.Provider value={{ useCreateThumbnail }}>
      <View>
        <TouchableOpacity
          accessibilityRole="imagebutton"
          accessibilityHint={
            accessibilityHint ??
            formatMessage(messages.defaultAccessibilityHint)
          }
          onPress={handleOnPress}
          testID={testID}
        >
          <FormatFileContent
            accessibilityLabel={accessibilityLabel}
            file={file}
            onUploadComplete={() => setShowOverlay(false)}
            isMedia={!!file.isMedia}
            styleInGrid={styleInGrid}
            showOverlay={showOverlay}
          />
        </TouchableOpacity>
        <FormatFileBottomSheet
          bottomSheetRef={bottomSheetRef}
          onRemovePress={onRemove}
          bottomSheetOptionsSuffix={bottomSheetOptionsSuffix}
          onPreviewPress={file.showPreview ? handlePreviewPress : undefined}
        />
      </View>
    </AtlantisFormatFileContext.Provider>
  );

  function handleOnPress() {
    if (showOverlay || !onRemove) {
      onTap();
      return;
    }

    bottomSheetRef.current?.open();
  }
}
