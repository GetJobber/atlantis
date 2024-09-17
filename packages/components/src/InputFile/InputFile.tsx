import React, { SyntheticEvent, useCallback } from "react";
import classnames from "classnames";
import { DropzoneOptions, FileError, useDropzone } from "react-dropzone";
import axios, { AxiosRequestConfig } from "axios";
import styles from "./InputFile.css";
import { InputValidation } from "../InputValidation";
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
   * Base URL where file was sent as a POST. This is the same URL as what's returned in getUploadParams.
   */
  readonly uploadUrl?: string;

  /**
   * The data url of the file.
   */
  src(): Promise<string>;

  /**
   * Callback for when the image file fails to load.
   *
   * This only works for image files.
   */
  onImageLoadError?(event: SyntheticEvent<HTMLImageElement>): void;
}

export interface UploadParams {
  /**
   * Url to POST file to.
   */
  readonly url: string;

  /**
   * Key to identify file.
   * If unspecified a generated Id will be used.
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
   * @param "string[]" - accept a specific list of MIME types
   *
   * @default "all"
   */
  readonly allowedTypes?: "all" | "images" | "basicImages" | string[];

  /**
   * Allow for multiple files to be selected for upload.
   *
   * @default false
   */
  readonly allowMultiple?: boolean;

  /**
   * Further description of the input.
   */
  readonly description?: string;

  readonly maxFilesValidation?: {
    /**
     * Maximum number of files that can be uploaded via the dropzone.
     */
    readonly maxFiles: number;

    /**
     * Number of files that are currently uploaded.
     */
    readonly numberOfCurrentFiles: number;
  };

  /**
   * A callback that receives a file object and returns a `UploadParams` needed
   * to upload the file.
   *
   * More info is available at:
   * https://atlantis.getjobber.com/?path=/docs/components-forms-and-inputs-inputfile--docs#getuploadparams
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

  /**
   *  Upload event handler. Triggered on upload error.
   */
  onUploadError?(error: Error): void;

  /**
   * Pass a custom validator function that will be called when a file is dropped.
   */
  readonly validator?: <T extends File>(
    file: T,
  ) => FileError | FileError[] | null;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUploadProgress(progress: any): void;
}

/* eslint-disable max-statements */
export function InputFile({
  variation = "dropzone",
  size = "base",
  buttonLabel: providedButtonLabel,
  allowMultiple = false,
  allowedTypes = "all",
  description,
  maxFilesValidation,
  getUploadParams,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  validator,
}: InputFileProps) {
  const maxFiles = maxFilesValidation?.maxFiles;
  const numberOfCurrentFiles = maxFilesValidation?.numberOfCurrentFiles;

  const handleValidation = useCallback(
    (file: File) => {
      if (
        maxFiles &&
        numberOfCurrentFiles &&
        maxFiles - numberOfCurrentFiles <= 0
      ) {
        return {
          code: "too-many-files",
          message: `Cannot exceed a maximum of ${maxFiles} files.`,
        };
      }

      return validator ? validator(file) : null;
    },
    [maxFiles, numberOfCurrentFiles],
  );

  const options: DropzoneOptions = {
    multiple: allowMultiple,
    maxFiles: maxFiles,
    onDrop: useCallback(handleDrop, [uploadFile]),
    validator: handleValidation,
  };

  if (allowedTypes === "images") {
    options.accept = "image/*";
  } else if (allowedTypes === "basicImages") {
    options.accept = "image/png, image/jpg, image/jpeg";
  } else if (Array.isArray(allowedTypes)) {
    options.accept = allowedTypes.join(",");
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone(options);

  const validationErrors = fileRejections?.reduce((acc, { file, errors }) => {
    errors.forEach(error => {
      if (error.code === "too-many-files") {
        if (!acc.some(e => e.code === "too-many-files")) {
          acc.push({
            code: "too-many-files",
            message: `Cannot exceed a maximum of ${maxFiles} files.`,
          });
        }
      } else {
        acc.push({
          code: error.code,
          message: `${file.name} ${error.message}`,
        });
      }
    });

    return acc;
  }, [] as { code: string; message: string }[]);

  const { buttonLabel, hintText } = getLabels(
    providedButtonLabel,
    allowMultiple,
    allowedTypes,
  );
  const dropZone = classnames(styles.dropZoneBase, {
    [styles.dropZone]: variation === "dropzone",
    [styles.active]: isDragActive,
    [styles.error]: fileRejections?.length > 0,
  });

  return (
    <>
      <div
        {...getRootProps({ className: dropZone })}
        tabIndex={variation === "button" ? -1 : 0}
      >
        <input {...getInputProps()} />

        {variation === "dropzone" && (
          <div className={styles.dropzoneContent}>
            <Content spacing="small">
              <Button label={buttonLabel} size="small" type="secondary" />
              {size === "base" && (
                <>
                  <Typography size="small">{hintText}</Typography>
                  {description && (
                    <Typography size="small" textColor="textSecondary">
                      {description}
                    </Typography>
                  )}
                </>
              )}
            </Content>
          </div>
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
      {validationErrors?.length > 0 && (
        <div className={styles.validationErrors}>
          {validationErrors.map(error => (
            <InputValidation message={error.message} key={error.code} />
          ))}
        </div>
      )}
    </>
  );

  function handleDrop(acceptedFiles: File[]) {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }

  async function uploadFile(file: File) {
    let params;

    try {
      params = await getUploadParams(file);
    } catch {
      onUploadError && onUploadError(new Error("Failed to get upload params"));

      return;
    }

    const {
      url,
      key = generateId(),
      fields = {},
      httpMethod = "POST",
    } = params;

    const fileUpload = getFileUpload(file, key, url);
    onUploadStart && onUploadStart({ ...fileUpload });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    axios
      .request(axiosConfig)
      .then(handleUploadComplete)
      .catch(() => {
        onUploadError && onUploadError(new Error("Failed to upload file"));
      });
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
  allowedTypes: string | string[],
) {
  const fileType =
    allowedTypes === "images" || allowedTypes === "basicImages"
      ? "Image"
      : "File";
  let buttonLabel = multiple ? `Upload ${fileType}s` : `Upload ${fileType}`;
  const fileTypeDeterminer = fileType === "Image" ? "an" : "a";
  const hintText = multiple
    ? `Select or drag ${fileType.toLowerCase()}s here to upload`
    : `Select or drag ${fileTypeDeterminer} ${fileType.toLowerCase()} here to upload`;

  if (providedButtonLabel) buttonLabel = providedButtonLabel;

  return { buttonLabel, hintText };
}

function getFileUpload(
  file: File,
  key: string,
  uploadUrl?: string,
): FileUpload {
  return {
    key: key,
    name: file.name,
    type: file.type,
    size: file.size,
    progress: 0,
    src: getSrc,
    uploadUrl,
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

function generateId() {
  return Math.floor(Math.random() * Date.now()).toString(16);
}
