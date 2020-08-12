import React, { useCallback } from "react";
import classnames from "classnames";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import uuid from "uuid";
import axios from "axios";
import styles from "./InputFile.css";
import { Button } from "../Button";
import { Content } from "../Content";
import { Typography } from "../Typography";

interface AtFile {
  /**
   * File Identifier
   */
  readonly id: string;

  /**
   * The name of the file.
   */
  readonly name: string;

  /**
   * The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file
   */
  readonly type: string;

  /**
   * The size of the file in bytes.
   */
  readonly size: number;

  /**
   * The progress of a file upload between 0 and 1.
   * - `0` represents Upload just started.
   * - `1` represents a complete upload.
   */
  readonly progress: number;

  /**
   * The url of the file.
   */
  readonly src?: string;

  /**
   * If the file is an image the url of the thumbnail.
   */
  readonly thumbnailSrc?: string;
}

interface UploadParams {
  readonly url: string;
}

interface InputFileProps {
  /**
   * Allowed File types.
   * @default "all"
   */
  readonly allowedTypes?: "all" | "images";

  /**
   * Allow for multiple files.
   * @default false
   */
  readonly multiple?: boolean;

  /**
   * A callback that receives a file object and returns the params needed
   * to upload the file.
   */
  getUploadParams(file: File): UploadParams;

  /**
   * Upload event handler.
   */
  onUploadStart?(file: AtFile): void;

  /**
   * Upload event handler.
   */
  onUploadProgress?(file: AtFile): void;

  /**
   * Upload event handler.
   */
  onUploadComplete?(file: AtFile): void;
}

export function InputFile({
  multiple = false,
  allowedTypes = "all",
  getUploadParams,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
}: InputFileProps) {
  const options: DropzoneOptions = {
    multiple,
    onDrop: useCallback(handleDrop, []),
  };
  if (allowedTypes === "images") options.accept = "image/*";
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  const { buttonLabel, hintText } = getCopy(multiple, allowedTypes);
  const dropZone = classnames(styles.dropZone, {
    [styles.active]: isDragActive,
  });

  return (
    <>
      <div className={dropZone} {...getRootProps()}>
        <input {...getInputProps()} />
        <Content spacing="small">
          <Button label={buttonLabel} size="small" type="secondary" />
          <Typography size="small" textColor="greyBlue">
            {hintText}
          </Typography>
        </Content>
      </div>
    </>
  );

  function handleDrop(acceptedFiles: File[]) {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }

  async function uploadFile(file: File) {
    const atFile = await getAtFile(file);
    onUploadStart && onUploadStart({ ...atFile });

    const uploadParams = await getUploadParams(file);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(uploadParams.url, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        onUploadProgress: progressEvent =>
          onUploadProgress &&
          onUploadProgress({
            ...atFile,
            progress: progressEvent.loaded / progressEvent.total,
          }),
      })
      .then(() => {
        onUploadComplete && onUploadComplete({ ...atFile, progress: 1 });
      });
  }
}

function getCopy(multiple: boolean, allowedTypes: string) {
  let buttonLabel = multiple ? "Select Files" : "Select a File";
  let hintText = multiple
    ? "or drag files here to upload"
    : "or drag a file here to upload";

  if (allowedTypes === "images") {
    buttonLabel = multiple ? "Select Images" : "Select an Image";
    hintText = multiple
      ? "or drag images here to upload"
      : "or drag an image here to upload";
  }

  return { buttonLabel, hintText };
}

function getAtFile(file: File): Promise<AtFile> {
  const atFile = {
    id: uuid(),
    name: file.name,
    type: file.type,
    size: file.size,
    progress: 0,
  };

  if (file.type.startsWith("image/")) {
    const promise = new Promise<AtFile>(resolve => {
      const reader = new FileReader();
      reader.onload = event => {
        if (
          event.target &&
          event.target.result &&
          typeof event.target.result === "string"
        ) {
          resolve({
            ...atFile,
            src: event.target.result,
            thumbnailSrc: event.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    });

    return promise;
  } else {
    return Promise.resolve(atFile);
  }
}

export function updateFiles(updatedFile: AtFile, files: AtFile[]) {
  const newFiles = [...files];
  const index = files.findIndex(file => file.id === updatedFile.id);

  if (index !== -1) {
    newFiles[index] = updatedFile;
  } else {
    newFiles.push(updatedFile);
  }

  return newFiles;
}
