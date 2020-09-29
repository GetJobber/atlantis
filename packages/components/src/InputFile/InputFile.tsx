import React, { useCallback } from "react";
import classnames from "classnames";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios from "axios";
import uuid from "uuid";
import styles from "./InputFile.css";
import { Button } from "../Button";
import { Content } from "../Content";
import { Typography } from "../Typography";

export interface FileUpload {
  /**
   * File Identifier
   */
  readonly key: string;

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
   * The data url of the file.
   */
  src(): Promise<string>;
}

export interface UploadParams {
  /**
   * Url to POST file to.
   */
  readonly url: string;

  /**
   * Key to identify file.
   * If unspecified a `uuid` will be used.
   */
  readonly key?: string;

  /**
   * Any extra fields to send with the upload POST.
   * If unspecified only the file will be included.
   */
  readonly fields?: { [field: string]: string };
}

interface InputFileProps {
  /**
   * Display variation.
   * @default "dropzone"
   */
  readonly variation?: "dropzone" | "button";

  /**
   * Allowed File types.
   * @default "all"
   */
  readonly allowedTypes?: "all" | "images";

  /**
   * Allow for multiple files to be selected for upload.
   *
   * @default false
   */
  readonly allowMultiple?: boolean;

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

export function InputFile({
  variation = "dropzone",
  allowMultiple = false,
  allowedTypes = "all",
  getUploadParams,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
}: InputFileProps) {
  const options: DropzoneOptions = {
    multiple: allowMultiple,
    onDrop: useCallback(handleDrop, []),
  };
  if (allowedTypes === "images") options.accept = "image/*";
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  const { buttonLabel, hintText } = getLabels(allowMultiple, allowedTypes);
  const dropZone = classnames(styles.dropZoneBase, {
    [styles.dropZone]: variation === "dropzone",
    [styles.active]: isDragActive,
  });

  return (
    <div className={dropZone} {...getRootProps()}>
      <Variation />
      <input className={styles.input} {...getInputProps()} />
    </div>
  );

  function Variation() {
    if (variation === "button") {
      return (
        <Button
          label={buttonLabel}
          size="small"
          type="secondary"
          fullWidth={true}
        />
      );
    }

    return (
      <Content spacing="small">
        <Button label={buttonLabel} size="small" type="secondary" />
        <Typography size="small" textColor="greyBlue">
          {hintText}
        </Typography>
      </Content>
    );
  }

  function handleDrop(acceptedFiles: File[]) {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }

  async function uploadFile(file: File) {
    const { url, key = uuid(), fields = {} } = await getUploadParams(file);

    const fileUpload = getFileUpload(file, key);
    onUploadStart && onUploadStart({ ...fileUpload });

    const formData = new FormData();
    Object.entries(fields).forEach(([field, value]) =>
      formData.append(field, value),
    );
    formData.append("file", file);

    axios
      .post(url, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        onUploadProgress: progressEvent =>
          onUploadProgress &&
          onUploadProgress({
            ...fileUpload,
            progress: progressEvent.loaded / progressEvent.total,
          }),
      })
      .then(() => {
        onUploadComplete && onUploadComplete({ ...fileUpload, progress: 1 });
      });
  }
}

function getLabels(multiple: boolean, allowedTypes: string) {
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

function getFileUpload(file: File, key: string): FileUpload {
  return {
    key: key,
    name: file.name,
    type: file.type,
    size: file.size,
    progress: 0,
    src: getSrc,
  };

  function getSrc() {
    const promise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        if (
          event.target &&
          event.target.result &&
          typeof event.target.result === "string"
        ) {
          resolve(event.target.result);
        } else {
          reject("Could not generate file data url.");
        }
      };
      reader.readAsDataURL(file);
    });

    return promise;
  }
}

/**
 * Upsert a given `FileUpload` into an array of `FileUpload`s.
 * `key` is used to uniquely identify files.
 *
 * @param updatedFile FileUpload File that was updated.
 * @param files Existing array of FileUploads.
 * @returns FileUpload[] updated set of files.
 */
export function updateFiles(updatedFile: FileUpload, files: FileUpload[]) {
  const newFiles = [...files];
  const index = files.findIndex(file => file.key === updatedFile.key);

  if (index !== -1) {
    newFiles[index] = updatedFile;
  } else {
    newFiles.push(updatedFile);
  }

  return newFiles;
}
