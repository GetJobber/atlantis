import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { useStyles } from "./MediaView.style";
import type { FormattedFile } from "../../types";
import { StatusCode } from "../../types";
import { computeA11yLabel } from "../../utils";
import { ActivityIndicator } from "../../../ActivityIndicator";
import { Icon } from "../../../Icon";
import { ProgressBar } from "../ProgressBar";
import { ErrorIcon } from "../ErrorIcon";
import { useAtlantisFormatFileContext } from "../../context/FormatFileContext";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

interface MediaViewProps {
  readonly accessibilityLabel?: string;
  readonly showOverlay: boolean;
  readonly showError: boolean;
  readonly file: FormattedFile;
  readonly styleInGrid: boolean;
  readonly onUploadComplete: () => void;
}

export function MediaView({
  accessibilityLabel,
  showOverlay,
  showError,
  file,
  styleInGrid,
  onUploadComplete,
}: MediaViewProps): React.JSX.Element {
  const { t } = useAtlantisI18n();
  const { useCreateThumbnail } = useAtlantisFormatFileContext();
  const { thumbnail, error } = useCreateThumbnail(file);
  const [isLoading, setIsLoading] = useState(false);

  const a11yLabel = computeA11yLabel({
    accessibilityLabel,
    showOverlay,
    showError,
    t,
  });

  const hasError = showError || error;
  const uri = thumbnail || file.thumbnailUrl || file.source;

  const styles = useStyles();

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
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      >
        <Overlay
          isLoading={isLoading}
          showOverlay={showOverlay}
          hasError={hasError}
          file={file}
          onUploadComplete={onUploadComplete}
          styles={styles}
        />
      </ImageBackground>
    </View>
  );
}

interface OverlayProps {
  readonly isLoading: boolean;
  readonly showOverlay: boolean;
  readonly hasError: boolean;
  readonly file: FormattedFile;
  readonly onUploadComplete: () => void;
  readonly styles: ReturnType<typeof useStyles>;
}

function Overlay({
  isLoading,
  showOverlay,
  hasError,
  file,
  onUploadComplete,
  styles,
}: OverlayProps) {
  if (isLoading) return <ActivityIndicator />;

  if (hasError) return <ErrorOverlay styles={styles} />;

  if (showOverlay) {
    return (
      <ProgressOverlay
        status={file.status}
        progress={file.progress}
        onUploadComplete={onUploadComplete}
        styles={styles}
      />
    );
  }

  if (isVideo(file.type) && file.showFileTypeIndicator) {
    return <Icon name="video" color="white" />;
  }

  return <></>;
}

interface ProgressOverlayProps {
  readonly status: StatusCode;
  readonly progress: number;
  readonly onUploadComplete: () => void;
  readonly styles: ReturnType<typeof useStyles>;
}

function ProgressOverlay({
  status,
  progress,
  onUploadComplete,
  styles,
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

function ErrorOverlay({
  styles,
}: {
  readonly styles: ReturnType<typeof useStyles>;
}) {
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
