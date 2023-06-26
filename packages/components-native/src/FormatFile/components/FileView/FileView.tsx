import React from "react";
import { View } from "react-native";
import { useIntl } from "react-intl";
import { IconNames } from "@jobber/design";
import { styles } from "./FileView.style";
import { Icon } from "../../../Icon";
import { Text } from "../../../Text";
import { FormattedFile, StatusCode } from "../../types";
import { computeA11yLabel } from "../../utils";
import { ProgressBar } from "../ProgressBar";
import { ErrorIcon } from "../ErrorIcon";

interface FileViewProps {
  accessibilityLabel?: string;
  showOverlay: boolean;
  showError: boolean;
  file: FormattedFile;
  styleInGrid: boolean;
  onUploadComplete: () => void;
}

export function FileView({
  accessibilityLabel,
  styleInGrid,
  file,
  showOverlay,
  showError,
  onUploadComplete,
}: FileViewProps): JSX.Element {
  const { formatMessage } = useIntl();
  const a11yLabel = computeA11yLabel({
    accessibilityLabel,
    showOverlay,
    showError,
    formatMessage,
  });

  const freezeProgressBar =
    file.status !== StatusCode.Completed && file.progress >= 0.9;
  return (
    <View
      style={[
        styles.fileBackground,
        styleInGrid ? styles.fileBackgroundGrid : styles.fileBackgroundFlat,
      ]}
      accessible={true}
      accessibilityLabel={a11yLabel}
    >
      <View
        style={[
          styles.fileBackground,
          styleInGrid ? styles.fileIconGrid : styles.fileIconFlat,
        ]}
        testID={"test-file"}
      >
        {(styleInGrid || !showError) && file.showFileTypeIndicator && (
          <Icon
            size={"large"}
            name={mapFileTypeToIconName({
              fileName: file.name,
              fileType: file.type,
            })}
          />
        )}
      </View>
      <View
        style={[
          showError && styleInGrid ? styles.fileNameError : styles.fileName,
          styleInGrid ? styles.fileNameGrid : styles.fileNameFlat,
        ]}
      >
        <Text level="textSupporting" variation="subdued" maxLines="single">
          {file.name}
        </Text>
      </View>
      {!showError && showOverlay && (
        <View
          style={[styles.fileBackground, styles.overlay, styles.fileOverlay]}
          testID="format-file-progress-bar-container"
        >
          <ProgressBar
            status={file.status}
            progress={freezeProgressBar ? 0.9 : file.progress}
            onComplete={onUploadComplete}
          />
        </View>
      )}
      {showError && (
        <View
          style={[
            styles.fileBackground,
            styles.overlayError,
            styles.fileOverlay,
          ]}
          testID="format-file-error-container"
        >
          <View style={!styleInGrid ? styles.iconCenter : undefined}>
            <ErrorIcon />
          </View>
        </View>
      )}
    </View>
  );
}

interface FileTypeToIconNameParams {
  fileName?: string;
  fileType?: string;
}
function mapFileTypeToIconName({
  fileName,
  fileType,
}: FileTypeToIconNameParams): IconNames {
  if (!fileName && !fileType) {
    return "alert";
  }
  if (fileType?.includes("pdf") || fileName?.match(/~*.pdf$/)) {
    return "pdf";
  } else if (
    fileType?.includes("ms-word") ||
    fileName?.match(/~*.doc$|docx$/)
  ) {
    return "word";
  } else if (
    fileType?.includes("ms-excel") ||
    fileName?.match(/~*.xls$|xlsx$/)
  ) {
    return "excel";
  } else if (fileType?.includes("video") || fileName?.match(/~*.mp4$|mp4$/)) {
    return "video";
  } else {
    return "file";
  }
}
