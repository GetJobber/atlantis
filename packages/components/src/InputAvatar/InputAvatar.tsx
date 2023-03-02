import React, { PropsWithChildren, useState } from "react";
import styles from "./InputAvatar.css";
import { Avatar, AvatarProps } from "../Avatar";
import { FileUpload, InputFile, UploadParams } from "../InputFile";
import { ProgressBar } from "../ProgressBar";
import { Button } from "../Button";

interface InputAvatarProps extends Omit<AvatarProps, "size"> {
  /**
   * A callback that receives a file object and returns a `UploadParams` needed
   * to upload the file.
   *
   * More info is available at:
   * https://atlantis.getjobber.com/?path=/docs/components-inputfile--input-file#getuploadparams
   */
  getUploadParams(file: File): UploadParams | Promise<UploadParams>;

  /**
   * Triggered when an image is changed.
   */
  onChange?(file?: FileUpload): void;

  /**
   * Triggered when an image upload has completed.
   */
  onUploadComplete?(file?: FileUpload): void;
}

export function InputAvatar({
  getUploadParams,
  onUploadComplete,
  onChange,
  ...avatarProps
}: InputAvatarProps) {
  const [progress, setProgress] = useState(1);

  return (
    <div className={styles.inputAvatar}>
      <div className={styles.preview}>
        <Avatar size="large" {...(avatarProps as AvatarProps)} />
        {progress < 1 && (
          <Overlay>
            <Centered>
              <ProgressBar
                size="small"
                currentStep={progress * 100}
                totalSteps={100}
              />
            </Centered>
          </Overlay>
        )}
      </div>
      <InputFile
        variation="button"
        buttonLabel={avatarProps.imageUrl ? "Change Image" : undefined}
        size="small"
        allowedTypes="images"
        getUploadParams={getUploadParams}
        onUploadStart={handleChange}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUploadComplete}
      />
      {avatarProps.imageUrl != undefined && progress === 1 && (
        <Button
          label="Remove"
          size="small"
          type="secondary"
          variation="destructive"
          onClick={clearAvatar}
        />
      )}
    </div>
  );

  function handleChange(newFile: FileUpload) {
    onChange && onChange(newFile);
    handleUpload(newFile);
  }

  function handleUploadComplete(newFile: FileUpload) {
    onUploadComplete && onUploadComplete(newFile);
    handleUpload(newFile);
  }

  async function handleUpload(newFile: FileUpload) {
    setProgress(newFile.progress);
  }

  function clearAvatar() {
    onChange && onChange(undefined);
    setProgress(1);
  }
}

function Overlay({ children }: PropsWithChildren<{}>) {
  return <div className={styles.overlay}>{children}</div>;
}

function Centered({ children }: PropsWithChildren<{}>) {
  // Note: this HIGHLY experimental Centered component is applying margin.
  return <div className={styles.centered}>{children}</div>;
}
