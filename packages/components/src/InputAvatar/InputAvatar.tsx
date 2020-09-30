import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./InputAvatar.css";
import { Avatar } from "../Avatar";
import { FileUpload, InputFile, UploadParams } from "../InputFile";
import { ProgressBar } from "../ProgressBar";

interface InputAvatarProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;

  /**
   * A callback that receives a file object and returns a `UploadParams` needed
   * to upload the file.
   *
   * More info is available at:
   * https://atlantis.getjobber.com/components/input-file#getuploadparams
   */
  getUploadParams(file: File): UploadParams | Promise<UploadParams>;

  /**
   * Upload event handler. Triggered on upload start.
   */
  onUploadStart?(file: FileUpload): void;

  /**
   * Upload event handler. Triggered as upload progresses.
   */
  onUploadProgress?(file: FileUpload): void;

  /**
   * Upload event handler. Triggered on upload completion.
   */
  onUploadComplete?(file: FileUpload): void;
}

export function InputAvatar({ getUploadParams }: InputAvatarProps) {
  const [fileKey, setFileKey] = useState<string>();
  const [image, setImage] = useState<string>();
  const [progress, setProgress] = useState(1);

  return (
    <div className={styles.inputAvatar}>
      <div className={styles.preview}>
        <Avatar size="large" initials="" imageUrl={image} />
        {progress < 1 && (
          <Overlay>
            <Centered>
              <ProgressBar
                size="small"
                currentStep={progress + 100}
                totalSteps={100}
              />
            </Centered>
          </Overlay>
        )}
      </div>
      <InputFile
        variation="button"
        allowedTypes="images"
        getUploadParams={getUploadParams}
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
      />
    </div>
  );

  async function handleUpload(newFile: FileUpload) {
    if (fileKey !== newFile.key) {
      setFileKey(newFile.key);
      setImage(await newFile.src());
    }
    setProgress(newFile.progress);
  }
}

function Overlay({ children }: PropsWithChildren<{}>) {
  return <div className={styles.overlay}>{children}</div>;
}

function Centered({ children }: PropsWithChildren<{}>) {
  // Note: this HIGHLY experimental Centered component is applying margin.
  return <div className={styles.centered}>{children}</div>;
}
