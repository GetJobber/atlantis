import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { useIntl } from "react-intl";
import { styles } from "./MediaView.style";
import { FormattedFile, StatusCode } from "../../types";
import { computeA11yLabel } from "../../utils";
import { ActivityIndicator } from "../../../ActivityIndicator";
import { Icon } from "../../../Icon";
import { ProgressBar } from "../ProgressBar";
import { ErrorIcon } from "../ErrorIcon";
import { useAtlantisFormatFileContext } from "../../context/FormatFileContext";

interface MediaViewProps {
  accessibilityLabel?: string;
  showOverlay: boolean;
  showError: boolean;
  file: FormattedFile;
  styleInGrid: boolean;
  onUploadComplete: () => void;
}

export function MediaView({
  accessibilityLabel,
  showOverlay,
  showError,
  file,
  styleInGrid,
  onUploadComplete,
}: MediaViewProps): JSX.Element {
  const { formatMessage } = useIntl();
  const { useCreateThumbnail } = useAtlantisFormatFileContext();
  const { thumbnail, error } = useCreateThumbnail(file);
  const [isLoading, setIsLoading] = useState(true);

  const a11yLabel = computeA11yLabel({
    accessibilityLabel,
    showOverlay,
    showError,
    formatMessage,
  });

  const hasError = showError || error;
  const uri = thumbnail || file.thumbnailUrl || file.source;

  return (
    <View accessible={true} accessibilityLabel={a11yLabel}>
      <ImageBackground
        style={[
          styles.imageBackground,
          styleInGrid ? styles.imageBackgroundGrid : styles.imageBackgroundFlat,
        ]}
        resizeMode={styleInGrid ? "cover" : "contain"}
        source={{ uri }}
        testID={"test-image"}
        onLoadStart={() => setIsLoading(false)}
        onLoadEnd={() => setIsLoading(true)}
      >
        <Overlay
          isLoading={isLoading}
          showOverlay={showOverlay}
          hasError={hasError}
          file={file}
          onUploadComplete={onUploadComplete}
        />
      </ImageBackground>
    </View>
  );
}

interface OverlayProps {
  isLoading: boolean;
  showOverlay: boolean;
  hasError: boolean;
  file: FormattedFile;
  onUploadComplete: () => void;
}

function Overlay({
  isLoading,
  showOverlay,
  hasError,
  file,
  onUploadComplete,
}: OverlayProps) {
  if (isLoading) return <ActivityIndicator />;

  if (hasError) return <ErrorOverlay />;

  if (showOverlay) {
    return (
      <ProgressOverlay
        status={file.status}
        progress={file.progress}
        onUploadComplete={onUploadComplete}
      />
    );
  }

  if (isVideo(file.type) && file.showFileTypeIndicator) {
    return <Icon name="video" color="white" />;
  }

  return <></>;
}

interface ProgressOverlayProps {
  status: StatusCode;
  progress: number;
  onUploadComplete: () => void;
}

function ProgressOverlay({
  status,
  progress,
  onUploadComplete,
}: ProgressOverlayProps) {
  const freezeProgressBar = status !== StatusCode.Completed && progress >= 0.9;
  return (
    <View
      style={[styles.imageBackground, styles.overlay]}
      testID="format-file-progress-bar-container"
    >
      <ProgressBar
        status={status}
        progress={freezeProgressBar ? 0.9 : progress}
        onComplete={onUploadComplete}
      />
    </View>
  );
}

function ErrorOverlay() {
  return (
    <View
      style={[styles.imageBackground, styles.overlayError]}
      testID="format-file-error-container"
    >
      <ErrorIcon />
    </View>
  );
}

function isVideo(fileType = ""): boolean {
  return fileType.includes("video");
}
