import React, { useMemo, useState } from "react";
import type { DimensionValue } from "react-native";
import { View } from "react-native";
import { useStyles } from "./FormatFile.style";
import { FormatFileContent } from "./FormatFile";
import type { CreateThumbnail, File, FileUpload } from "./types";
import { StatusCode } from "./types";
import { AtlantisFormatFileContext } from "./context/FormatFileContext";
import { createUseCreateThumbnail } from "./utils/createUseCreateThumbnail";
import { parseFile } from "./utils/parseFile";

export interface FormatFileThumbnailProps<T> {
  /**
   * File upload details object. Can be a File or a FileUpload.
   */
  readonly file: T;

  /**
   * Accessibility label for the thumbnail.
   */
  readonly accessibilityLabel?: string;

  /**
   * Set false to hide the filetype icon.
   */
  readonly showFileTypeIndicator?: boolean;

  /**
   * A function to generate a thumbnail for media files.
   */
  readonly createThumbnail?: CreateThumbnail;

  /**
   * The dimensions of the thumbnail container.
   */
  readonly size: {
    readonly width: DimensionValue;
    readonly height: DimensionValue;
  };

  /**
   * A reference to the element in the rendered output.
   */
  readonly testID?: string;
}

/**
 * A lightweight, visual-only file thumbnail component.
 *
 * Unlike `FormatFile`, this component does **not** include a `TouchableOpacity`
 * wrapper or a `BottomSheet`. The consumer is responsible for handling press
 * interactions and action sheets externally.
 *
 * This makes it suitable for use inside virtualized lists (e.g. FlashList)
 * where you need a single shared BottomSheet rather than one per item, and
 * where the consumer controls the item dimensions via the `size` prop.
 */
export function FormatFileThumbnail<T extends File | FileUpload>({
  file,
  accessibilityLabel,
  showFileTypeIndicator = true,
  createThumbnail: createThumbnailProp,
  size,
  testID,
}: FormatFileThumbnailProps<T>) {
  const formattedFile = useMemo(
    () => parseFile(file, showFileTypeIndicator),
    [file, showFileTypeIndicator],
  );
  const styles = useStyles();

  const [showOverlay, setShowOverlay] = useState<boolean>(
    formattedFile.status !== StatusCode.Completed,
  );

  const createThumbnail = createThumbnailProp
    ? createThumbnailProp
    : async () => ({ error: false, thumbnail: "" });
  const { useCreateThumbnail } = createUseCreateThumbnail(createThumbnail);

  return (
    <AtlantisFormatFileContext.Provider value={{ useCreateThumbnail }}>
      <View
        style={[
          styles.thumbnailContainer,
          // Override marginBottom — spacing between items is a layout concern
          // that belongs to the consumer, not the thumbnail itself.
          { marginBottom: 0 },
          size && { width: size.width, height: size.height },
        ]}
        testID={testID}
      >
        <FormatFileContent
          accessibilityLabel={accessibilityLabel}
          file={formattedFile}
          onUploadComplete={() => setShowOverlay(false)}
          isMedia={!!formattedFile.isMedia}
          styleInGrid={true}
          showOverlay={showOverlay}
          skipContainerStyles={true}
        />
      </View>
    </AtlantisFormatFileContext.Provider>
  );
}
