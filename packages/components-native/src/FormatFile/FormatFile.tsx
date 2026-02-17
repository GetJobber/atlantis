import React, { createRef, useCallback, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useStyles } from "./FormatFile.style";
import { MediaView } from "./components/MediaView";
import type { BottomSheetOptionsSuffix } from "./components/FormatFileBottomSheet";
import { FormatFileBottomSheet } from "./components/FormatFileBottomSheet";
import { FileView } from "./components/FileView";
import type { CreateThumbnail, File, FileUpload, FormattedFile } from "./types";
import { StatusCode } from "./types";
import { AtlantisFormatFileContext } from "./context/FormatFileContext";
import { createUseCreateThumbnail } from "./utils/createUseCreateThumbnail";
import { parseFile } from "./utils/parseFile";
import type { BottomSheetRef } from "../BottomSheet/BottomSheet";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export interface FormatFileProps<T> {
  /**
   * File upload details object. Can be a File or a FileUpload
   */
  readonly file: T;

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
  readonly onTap?: (file: T) => void;
  /**
   * A function to be called on "Remove" Bottom Sheet Option press
   */
  readonly onRemove?: () => void;

  /**
   * Handler for the "Preview" Bottom Sheet Option press
   */
  readonly onPreviewPress?: (formattedFile: FormattedFile) => void;
  /**
   * A file type to show at Bottom Sheet options
   */
  readonly bottomSheetOptionsSuffix?: BottomSheetOptionsSuffix;

  /**
   * Uses a grid layout when multi-file upload is supported
   */
  readonly styleInGrid?: boolean;

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
  readonly file: FormattedFile;
  readonly onTap: () => void;
};

interface FormatFileContentProps {
  readonly accessibilityLabel?: string;
  readonly file: FormattedFile;
  readonly showOverlay: boolean;
  readonly styleInGrid: boolean;
  readonly onUploadComplete: () => void;
  readonly isMedia: boolean;

  /**
   * @internal
   * When true, the component skips its container wrapper entirely
   * (no border, background, or dimension styles). Use this when the
   * parent component handles container styling directly, such as in
   * FormatFileThumbnail.
   */
  readonly skipContainerStyles?: boolean;
}

export function FormatFileContent({
  accessibilityLabel,
  file,
  showOverlay,
  styleInGrid,
  onUploadComplete,
  isMedia,
  skipContainerStyles = false,
}: FormatFileContentProps) {
  const styles = useStyles();

  const content = isMedia ? (
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
  );

  if (skipContainerStyles) {
    return content;
  }

  return (
    <View
      style={[
        styles.thumbnailContainer,
        styleInGrid && styles.thumbnailContainerGrid,
      ]}
    >
      {content}
    </View>
  );
}

const FormatFileInternalMemoized = React.memo(FormatFileInternal);

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
}: FormatFileProps<T>) {
  const onTapModified = onTap ? () => onTap(file) : () => undefined;

  const formattedFile = useMemo(
    () => parseFile(file, showFileTypeIndicator),
    [file, showFileTypeIndicator],
  );

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
}: FormatFileInternalProps) {
  const [showOverlay, setShowOverlay] = useState<boolean>(
    file.status !== StatusCode.Completed,
  );

  const { t } = useAtlantisI18n();
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
          accessibilityHint={accessibilityHint ?? t("FormatFile.hint")}
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
