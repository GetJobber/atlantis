import React, { useCallback } from "react";
import classnames from "classnames";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import axios, { AxiosRequestConfig } from "axios";
import { v1 as uuidv1 } from "uuid";
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
   * Any extra fields or headers to send with the upload.
   * If unspecified only the file will be included.
   */
  readonly fields?: { [field: string]: string };

  /**
   * The HTTP method which we wish to use for the upload
   *
   * When the HTTP method is `"PUT"`, the `fields` will
   * be used as headers for the request
   *
   * When the HTTP method is `"POST"` the `fields` are
   * form fields
   *
   * @default "POST"
   */
  readonly httpMethod?: "POST" | "PUT";
}

interface InputFileProps {
  /**
   * Display variation.
   * @default "dropzone"
   */
  readonly variation?: "dropzone" | "button";

  /**
   * Size of the InputFile
   * @default "base"
   */
  readonly size?: "small" | "base";

  /**
   * Label for the InputFile's button.
   * @default Automatic
   */
  readonly buttonLabel?: string;

  /**
   * Allowed File types.
   *
   * @param "images" - only accepts all types of image
   * @param "basicImages" - only accepts png, jpg and jpeg
   *
   * @default "all"
   */
  readonly allowedTypes?: "all" | "images" | "basicImages";

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

interface CreateAxiosConfigParams extends Omit<UploadParams, "key"> {
  /**
   * The file being uploaded
   */
  readonly file: File;

  /**
   * The uploadProgress callback used by axios.
   * The axios request config type from the library specifies
   * the input to this function as `any`
   */
  handleUploadProgress(progress: any): void;
}

export function InputFile({
  variation = "dropzone",
  size = "base",
  buttonLabel: providedButtonLabel,
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
  if (allowedTypes === "images") {
    options.accept = "image/*";
  } else if (allowedTypes === "basicImages") {
    options.accept = "image/png, image/jpg, image/jpeg";
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  const { buttonLabel, hintText } = getLabels(
    providedButtonLabel,
    allowMultiple,
    allowedTypes,
  );
  const dropZone = classnames(styles.dropZoneBase, {
    [styles.dropZone]: variation === "dropzone",
    [styles.active]: isDragActive,
  });

  return (
    <div
      {...getRootProps({ className: dropZone })}
      tabIndex={variation === "button" ? -1 : 0}
    >
      <input {...getInputProps()} />

      {variation === "dropzone" && (
        <Content spacing="small">
          <Button label={buttonLabel} size="small" type="secondary" />
          {size === "base" && (
            <Typography size="small" textColor="greyBlue">
              {hintText}
            </Typography>
          )}
        </Content>
      )}

      {variation === "button" && (
        <Button
          label={buttonLabel}
          size={size}
          type="secondary"
          fullWidth={true}
        />
      )}
    </div>
  );

  function handleDrop(acceptedFiles: File[]) {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }

  async function uploadFile(file: File) {
    const {
      url,
      key = uuidv1(),
      fields = {},
      httpMethod = "POST",
    } = await getUploadParams(file);

    const fileUpload = getFileUpload(file, key);
    onUploadStart && onUploadStart({ ...fileUpload });

    const handleUploadProgress = (progressEvent: any) => {
      onUploadProgress &&
        onUploadProgress({
          ...fileUpload,
          progress: progressEvent.loaded / progressEvent.total,
        });
    };

    const handleUploadComplete = () => {
      onUploadComplete?.({ ...fileUpload, progress: 1 });
    };

    const axiosConfig = createAxiosConfig({
      url,
      httpMethod,
      fields,
      file,
      handleUploadProgress,
    });
    axios.request(axiosConfig).then(handleUploadComplete);
  }
}

function createAxiosConfig({
  url,
  httpMethod = "POST",
  fields = {},
  file,
  handleUploadProgress,
}: CreateAxiosConfigParams): AxiosRequestConfig {
  let data: FormData | File;
  let headers: { [field: string]: string };

  if (httpMethod === "POST") {
    const formData = new FormData();
    Object.entries(fields).forEach(([field, value]) =>
      formData.append(field, value),
    );
    formData.append("file", file);

    data = formData;
    headers = { "X-Requested-With": "XMLHttpRequest" };
  } else {
    data = file;
    headers = fields;
  }

  return {
    method: httpMethod,
    url: url,
    headers: headers,
    data: data,
    onUploadProgress: handleUploadProgress,
  };
}

function getLabels(
  providedButtonLabel: string | undefined,
  multiple: boolean,
  allowedTypes: string,
) {
  let buttonLabel = multiple ? "Upload Files" : "Upload File";
  let hintText = multiple
    ? "or drag files here to upload"
    : "or drag a file here to upload";

  if (allowedTypes === "images" || allowedTypes === "basicImages") {
    buttonLabel = multiple ? "Upload Images" : "Upload Image";
    hintText = multiple
      ? "or drag images here to upload"
      : "or drag an image here to upload";
  }

  if (providedButtonLabel) buttonLabel = providedButtonLabel;

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
