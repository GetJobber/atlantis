# InputFile

# Input File

InputFile allows users to upload a file, or multiple files by dragging and
dropping them into an area on the page or by clicking a button.

## Design & usage guidelines

When contributing to, or consuming the InputFile component, consider the
following:

- Provide feedback once the file(s) have been dropped and uploading begins.

## Web Component Code

```tsx
InputFile Uploader File Input File Uploader Upload Dropzone Image Web React import type { SyntheticEvent } from "react";
import React, { useCallback } from "react";
import classnames from "classnames";
import type { DropzoneOptions, FileError } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import styles from "./InputFile.module.css";
import {
  BASIC_IMAGE_TYPES,
  convertToMimeTypes,
  formatMimeTypes,
  mimeTypeToReadable,
} from "./FileTypes";
import { InputFileHintText } from "./InputFileHintText";
import { InputFileDescription } from "./InputFileDescription";
import { InputFileButton } from "./InputFileButton";
import { InputFileDropzoneWrapper } from "./InputFileDropzoneWrapper";
import type { InputFileValidationError } from "./types";
import { InputFileValidationErrors } from "./InputFileValidationErrors";
import { InputFileContentContext } from "./InputFileContentContext";
import { Content } from "../Content";

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
   * Override the default hint text with a custom value.
   */
  readonly hintText?: string;

  /**
   * Further description of the input.
   */
  readonly description?: string;

  /**
   * An object which helps control and validate the number of files being uploaded
   * via the dropzone.
   * `maxFilesValidation={{ maxFiles: 3, numberOfCurrentFiles: files.length }}`
   */
  readonly maxFilesValidation?: {
    /**
     * Maximum number of files that can be uploaded via the dropzone.
     */
    readonly maxFiles: number;

    /**
     * The current count of uploaded files. This value should be
     * updated whenever a file is successfully uploaded or removed.
     */
    readonly numberOfCurrentFiles: number;
  };

  /**
   * Children will be rendered instead of the default content
   */
  readonly children?: React.ReactNode;

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
  hintText,
  maxFilesValidation,
  getUploadParams,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  validator,
  children,
}: InputFileProps) {
  const maxFiles = maxFilesValidation?.maxFiles || 0;
  const numberOfCurrentFiles = maxFilesValidation?.numberOfCurrentFiles || 0;

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
    [maxFiles, numberOfCurrentFiles, validator],
  );

  const options: DropzoneOptions = {
    multiple: allowMultiple,
    maxFiles: maxFiles - numberOfCurrentFiles,
    onDrop: useCallback(handleDrop, [uploadFile]),
    validator: handleValidation,
  };

  if (allowedTypes === "images") {
    options.accept = "image/*";
  } else if (allowedTypes === "basicImages") {
    options.accept = convertToMimeTypes(BASIC_IMAGE_TYPES).join(",");
  } else if (Array.isArray(allowedTypes)) {
    options.accept = convertToMimeTypes(allowedTypes).join(",");
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone(options);

  const allowedTypesString = Array.isArray(allowedTypes)
    ? formatMimeTypes(allowedTypes.map(mimeTypeToReadable))
    : allowedTypes;

  const validationErrors = fileRejections?.reduce((acc, { file, errors }) => {
    errors.forEach(error => {
      if (error.code === "too-many-files") {
        if (!acc.some(e => e.code === "too-many-files")) {
          acc.push({
            code: "too-many-files",
            message: `Cannot exceed a maximum of ${maxFiles} files.`,
          });
        }
      } else if (error.code === "file-invalid-type") {
        let formatMessage;

        if (allowedTypes === "basicImages") {
          formatMessage = formatMimeTypes(
            BASIC_IMAGE_TYPES.map(mimeTypeToReadable),
          );
        } else if (allowedTypes === "images") {
          formatMessage = "an image";
        } else {
          formatMessage = allowedTypesString;
        }

        const message =
          allowedTypes === "images"
            ? `${file.name} must be ${formatMessage}.`
            : `${file.name} must be in ${formatMessage} format.`;

        acc.push({
          code: error.code,
          message: message,
        });
      } else {
        acc.push({
          code: error.code,
          message: `${file.name} ${error.message}`,
        });
      }
    });

    return acc;
  }, [] as InputFileValidationError[]);

  const dropZone = classnames(styles.dropZoneBase, {
    [styles.dropZone]: variation === "dropzone",
    [styles.active]: isDragActive,
    [styles.error]: fileRejections?.length > 0,
  });

  const fileType =
    allowedTypes === "images" || allowedTypes === "basicImages"
      ? "Image"
      : "File";

  const contentContext = {
    fileType: fileType,
    allowMultiple,
    description,
    hintText: hintText || "",
    buttonLabel: providedButtonLabel || "",
    size,
  };

  const defaultContent = (
    <>
      {variation === "dropzone" && (
        <InputFile.DropzoneWrapper>
          <Content spacing="small">
            <InputFile.Button size="small" fullWidth={false} />
            {size === "base" && (
              <>
                <InputFile.HintText />
                <InputFile.Description />
              </>
            )}
          </Content>
        </InputFile.DropzoneWrapper>
      )}

      {variation === "button" && <InputFile.Button fullWidth={true} />}
    </>
  );

  return (
    <>
      <div
        {...getRootProps({ className: dropZone })}
        tabIndex={variation === "button" ? -1 : 0}
      >
        <input {...getInputProps()} data-testid="input-file-input" />
        <InputFileContentContext.Provider value={contentContext}>
          {children || defaultContent}
        </InputFileContentContext.Provider>
      </div>
      <InputFileValidationErrors validationErrors={validationErrors} />
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

InputFile.Button = InputFileButton;
InputFile.Description = InputFileDescription;
InputFile.DropzoneWrapper = InputFileDropzoneWrapper;
InputFile.HintText = InputFileHintText;
import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";

// If you need to pass children use Button directly instead of this component
interface InputFileButtonProps
  extends Omit<
    ButtonProps,
    "submit" | "name" | "value" | "to" | "url" | "children"
  > {}

export function InputFileButton({
  label,
  size,
  fullWidth = false,
  ...buttonProps
}: InputFileButtonProps) {
  const { buttonLabel: contextLabel, size: contextSize } =
    useInputFileContentContext();

  return (
    <Button
      {...buttonProps}
      label={label || contextLabel}
      size={size ?? contextSize}
      type="secondary"
      fullWidth={fullWidth}
    />
  );
}
import { createContext, useContext } from "react";
import type { ButtonSize } from "../Button";

export interface InputFileContentContextValue {
  readonly fileType: string;
  readonly allowMultiple: boolean;
  readonly description: string | undefined;
  readonly hintText: string;
  readonly buttonLabel: string;
  readonly size: ButtonSize;
}

const InputFileContentContext = createContext<InputFileContentContextValue>({
  fileType: "File",
  allowMultiple: false,
  description: undefined,
  hintText: getDefaultHintText("File", false),
  buttonLabel: getDefaultLabel(false, "File"),
  size: "base",
});

function useInputFileContentContext(): InputFileContentContextValue {
  const context = useContext(InputFileContentContext);
  const computedHintText =
    context.hintText ||
    getDefaultHintText(context.fileType, context.allowMultiple);
  const computedButtonLabel =
    context.buttonLabel ||
    getDefaultLabel(context.allowMultiple, context.fileType);

  return {
    ...context,
    hintText: computedHintText,
    buttonLabel: computedButtonLabel,
  };
}

export { InputFileContentContext, useInputFileContentContext };

function getDefaultLabel(multiple: boolean, fileType: string) {
  return multiple ? `Upload ${fileType}s` : `Upload ${fileType}`;
}

function getDefaultHintText(fileType: string, multiple: boolean) {
  const fileTypeDeterminer = fileType === "Image" ? "an" : "a";
  const hintText = multiple
    ? `Select or drag ${fileType.toLowerCase()}s here to upload`
    : `Select or drag ${fileTypeDeterminer} ${fileType.toLowerCase()} here to upload`;

  return hintText;
}
import type { PropsWithChildren } from "react";
import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import type { TextProps } from "../Text";
import { Text } from "../Text";

export function InputFileDescription({
  size = "small",
  variation = "subdued",
  children,
  ...textProps
}: PropsWithChildren<TextProps>) {
  const { description } = useInputFileContentContext();

  if (!children && !description) {
    return null;
  }

  return (
    <Text size={size} variation={variation} {...textProps}>
      {children || description}
    </Text>
  );
}
import React from "react";
import styles from "./InputFile.module.css";

export function InputFileDropzoneWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.dropzoneContent}>{children}</div>;
}
import type { PropsWithChildren } from "react";
import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import type { TextProps } from "../Text";
import { Text } from "../Text";

export function InputFileHintText({
  size = "small",
  children,
  ...textProps
}: PropsWithChildren<TextProps>) {
  const { hintText } = useInputFileContentContext();

  return (
    <Text {...textProps} size={size}>
      {children || hintText}
    </Text>
  );
}
import React from "react";
import type { InputFileValidationError } from "./types";
import styles from "./InputFile.module.css";
import { InputValidation } from "../InputValidation";

export function InputFileValidationErrors({
  validationErrors,
}: {
  readonly validationErrors: InputFileValidationError[];
}) {
  if (validationErrors.length === 0) {
    return null;
  }

  return (
    <div className={styles.validationErrors}>
      {validationErrors.map(error => (
        <InputValidation message={error.message} key={error.code} />
      ))}
    </div>
  );
}

```

## Props

### Web Props

| Prop           | Type        | Required  | Default       | Description                       |
| -------------- | ----------- | --------- | ------------- | --------------------------------- | --------------------- | ----- | ------------------- |
| `variation`    | `"dropzone" | "button"` | ❌            | `dropzone`                        | Display variation.    |
| `size`         | `"small"    | "base"`   | ❌            | `base`                            | Size of the InputFile |
| `buttonLabel`  | `string`    | ❌        | `Automatic`   | Label for the InputFile's button. |
| `allowedTypes` | `"all"      | "images"  | "basicImages" | string[]`                         | ❌                    | `all` | Allowed File types. |

@param "images" - only accepts all types of image @param "basicImages" - only
accepts png, jpg and jpeg @param "string[]" - accept a specific list of MIME
types | | `allowMultiple` | `boolean` | ❌ | `[object Object]` | Allow for
multiple files to be selected for upload. | | `hintText` | `string` | ❌ |
`_none_` | Override the default hint text with a custom value. | | `description`
| `string` | ❌ | `_none_` | Further description of the input. | |
`maxFilesValidation` |
`{ readonly maxFiles: number; readonly numberOfCurrentFiles: number; }` | ❌ |
`_none_` | An object which helps control and validate the number of files being
uploaded via the dropzone.
`maxFilesValidation={{ maxFiles: 3, numberOfCurrentFiles: files.length }}` | |
`children` | `React.ReactNode` | ❌ | `_none_` | Children will be rendered
instead of the default content | | `getUploadParams` |
`(file: File) => UploadParams | Promise<UploadParams>` | ✅ | `_none_` | A
callback that receives a file object and returns a `UploadParams` needed to
upload the file.

More info is available at:
https://atlantis.getjobber.com/?path=/docs/components-forms-and-inputs-inputfile--docs#getuploadparams
| | `onUploadStart` | `(file: FileUpload) => void` | ❌ | `_none_` | Upload
event handler. Triggered on upload start. | | `onUploadProgress` |
`(file: FileUpload) => void` | ❌ | `_none_` | Upload event handler. Triggered
as upload progresses. | | `onUploadComplete` | `(file: FileUpload) => void` | ❌
| `_none_` | Upload event handler. Triggered on upload completion. | |
`onUploadError` | `(error: Error) => void` | ❌ | `_none_` | Upload event
handler. Triggered on upload error. | | `validator` |
`<T extends File>(file: T) => FileError | FileError[]` | ❌ | `_none_` | Pass a
custom validator function that will be called when a file is dropped. |

## Categories

- Forms & Inputs

## Web Test Code

```typescript
InputFile Uploader File Input File Uploader Upload Dropzone Image Web React Test Testing Jest import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { userEvent } from "@testing-library/user-event";
import { InputFile } from ".";

jest.mock("axios", () => {
  return { request: jest.fn() };
});

beforeEach(() => {
  (axios.request as jest.Mock).mockReturnValue(Promise.resolve());
});

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

// eslint-disable-next-line max-statements
describe("Post Requests", () => {
  function fetchUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "https://httpbin.org/post",
      fields: { secret: "🤫" },
    });
  }

  it("renders an InputFile", () => {
    const { container } = render(
      <InputFile getUploadParams={fetchUploadParams} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with multiple uploads", () => {
    const { container } = render(
      <InputFile allowMultiple={true} getUploadParams={fetchUploadParams} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with custom accepted MIME types", () => {
    const { container } = render(
      <InputFile
        allowedTypes={["image/png", "image/jpg", "application/pdf"]}
        getUploadParams={fetchUploadParams}
      />,
    );
    const input = container.querySelector("input[type=file]");
    expect(input).toHaveAttribute(
      "accept",
      "image/png,image/jpg,application/pdf",
    );
  });

  it("renders an InputFile with only images allowed", () => {
    const { container } = render(
      <InputFile allowedTypes="images" getUploadParams={fetchUploadParams} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with multiple images allowed", () => {
    const { container } = render(
      <InputFile
        allowedTypes="images"
        allowMultiple={true}
        getUploadParams={fetchUploadParams}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with proper variations", () => {
    const { container } = render(
      <>
        <InputFile getUploadParams={fetchUploadParams} />
        <InputFile size="small" getUploadParams={fetchUploadParams} />
        <InputFile variation="button" getUploadParams={fetchUploadParams} />
        <InputFile
          variation="button"
          size="small"
          getUploadParams={fetchUploadParams}
        />
      </>,
    );
    expect(container).toMatchSnapshot();
  });

  it("supports custom button label", () => {
    const buttonLabel = "Custom Label";
    const { getByText } = render(
      <InputFile
        buttonLabel={buttonLabel}
        getUploadParams={fetchUploadParams}
      />,
    );
    expect(getByText(buttonLabel)).toBeInstanceOf(HTMLElement);
  });

  it("properly notifies upload callbacks", async () => {
    const fetchParams = jest.fn(fetchUploadParams);
    const handleStart = jest.fn();
    const handleProgress = jest.fn();
    const handleComplete = jest.fn();

    const { container } = render(
      <InputFile
        getUploadParams={fetchParams}
        onUploadStart={handleStart}
        onUploadProgress={handleProgress}
        onUploadComplete={handleComplete}
      />,
    );
    const input = container.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;

    await userEvent.upload(input, testFile);

    const baseMatch = {
      key: "atlantis.png",
      name: "atlantis.png",
      size: expect.any(Number),
      progress: expect.any(Number),
      src: expect.any(Function),
      type: "image/png",
    };

    await waitFor(() => {
      expect(fetchParams).toHaveBeenCalledTimes(1);

      expect(handleStart).toHaveBeenCalledWith({
        ...baseMatch,
        progress: 0,
        uploadUrl: "https://httpbin.org/post",
      });
      expect(axios.request).toHaveBeenCalledWith({
        data: expect.any(FormData),
        headers: { "X-Requested-With": "XMLHttpRequest" },
        method: "POST",
        onUploadProgress: expect.any(Function),
        url: "https://httpbin.org/post",
      });
      expect(handleComplete).toHaveBeenCalledWith({
        ...baseMatch,
        progress: 1,
        uploadUrl: "https://httpbin.org/post",
      });

      expect(handleStart).toHaveBeenCalledTimes(1);
      expect(handleComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe("when component fails to get upload params", () => {
    it("calls onError callback", async () => {
      const fetchParams = jest.fn(() => Promise.reject("error"));
      const handleError = jest.fn();

      const { container } = render(
        <InputFile getUploadParams={fetchParams} onUploadError={handleError} />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          new Error("Failed to get upload params"),
        );
      });
    });
  });

  describe("when the component fails to upload", () => {
    it("calls onError callback", async () => {
      const fetchParams = jest.fn(fetchUploadParams);
      const handleError = jest.fn();

      (axios.request as jest.Mock).mockRejectedValue(
        new Error("Failed to upload file"),
      );

      const { container } = render(
        <InputFile getUploadParams={fetchParams} onUploadError={handleError} />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          new Error("Failed to upload file"),
        );
      });
    });
  });

  describe("when a validator is provided and validation fails", () => {
    it("shows the validation message", async () => {
      function pngFileValidator(file: File) {
        if (file.name.endsWith(".png")) {
          return {
            code: "wrong-file-type",
            message: "Only .png files are allowed",
          };
        }

        return null;
      }

      const { container } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          validator={pngFileValidator}
        />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(container).toContainHTML("Only .png files are allowed");
      });
    });
  });

  describe("when the number of file uploads exceeds maxFiles", () => {
    it("shows the validation message and does not upload files", async () => {
      const { container, getByText } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          maxFilesValidation={{ maxFiles: 2, numberOfCurrentFiles: 0 }}
          allowMultiple={true}
        />,
      );

      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, [testFile, testFile, testFile]);

      await waitFor(() => {
        expect(
          getByText("Cannot exceed a maximum of 2 files."),
        ).toBeInTheDocument();
      });

      expect(axios.request).not.toHaveBeenCalled();
    });
  });

  describe("when allowedTypes uses FileTypes enum", () => {
    it("sets the correct MIME types for allowedTypes prop", () => {
      const { container } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          allowedTypes={[
            "JPEG",
            "PNG",
            "HEIC",
            "PDF",
            "DOCX",
            "CSV",
            "WEBP",
            "GIF",
            "AVIF",
          ]}
        />,
      );

      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      const expectedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/heic",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/csv",
        "image/webp",
        "image/gif",
        "image/avif",
      ].join(",");

      expect(input.accept).toBe(expectedMimeTypes);
    });
  });
});

describe("PUT requests", () => {
  function putUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "definitely_fake_url",
      fields: {
        "Content-Type": "sol_badguy",
        "Content-MD5": "dragon_install",
      },
      httpMethod: "PUT" as "PUT" | "POST",
    });
  }

  it("uses the returned fields as headers in a PUT request", async () => {
    const fetchParams = jest.fn(putUploadParams);
    const handleStart = jest.fn();
    const handleProgress = jest.fn();
    const handleComplete = jest.fn();

    const { container } = render(
      <InputFile
        getUploadParams={fetchParams}
        onUploadStart={handleStart}
        onUploadProgress={handleProgress}
        onUploadComplete={handleComplete}
      />,
    );
    const input = container.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;

    await userEvent.upload(input, testFile);

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        data: testFile,
        url: "definitely_fake_url",
        method: "PUT",
        headers: {
          "Content-MD5": "dragon_install",
          "Content-Type": "sol_badguy",
        },
        onUploadProgress: expect.any(Function),
      });
    });
  });
});

describe("Content", () => {
  function fetchUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "https://httpbin.org/post",
      fields: { secret: "🤫" },
    });
  }

  it("renders default content in dropzone variation", () => {
    render(
      <InputFile
        description="Description text"
        hintText="Hint text"
        getUploadParams={fetchUploadParams}
      />,
    );

    const button = screen.getByRole("button", {
      name: (accessibleName, element) => {
        return accessibleName === "Upload File" && element.tagName === "BUTTON";
      },
    });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("fullWidth");
    expect(screen.queryByText("Description text")).toBeInTheDocument();
    expect(screen.queryByText("Hint text")).toBeInTheDocument();
  });

  it("renders default content without hint text and description in small size", () => {
    render(
      <InputFile
        description="Description text"
        hintText="Hint text"
        size="small"
        getUploadParams={fetchUploadParams}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: (accessibleName, element) => {
          return (
            accessibleName === "Upload File" && element.tagName === "BUTTON"
          );
        },
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Description text")).not.toBeInTheDocument();
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("renders default content in button variation", () => {
    render(
      <InputFile
        hintText="Hint text"
        description="Description text"
        variation="button"
        getUploadParams={fetchUploadParams}
      />,
    );

    const button = screen.getByRole("button", {
      name: (accessibleName, element) => {
        return accessibleName === "Upload File" && element.tagName === "BUTTON";
      },
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("fullWidth");
    expect(screen.queryByText("Description text")).not.toBeInTheDocument();
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("renders custom content using InputFile subcomponents", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <InputFile.DropzoneWrapper>
          <div data-testid="custom-wrapper">
            <InputFile.Button size="large" />
            <InputFile.Description>Custom description</InputFile.Description>
            <InputFile.HintText>Custom hint</InputFile.HintText>
          </div>
        </InputFile.DropzoneWrapper>
      </InputFile>,
    );

    expect(screen.getByTestId("custom-wrapper")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upload File" })).toHaveClass(
      "large",
    );
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByText("Custom hint")).toBeInTheDocument();
  });

  it("renders custom content with non-subcomponents", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <div data-testid="custom-content">
          <h2>Custom Title</h2>
          <p>Custom instructions</p>
          <span>Additional content</span>
        </div>
      </InputFile>,
    );
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom instructions")).toBeInTheDocument();
    expect(screen.getByText("Additional content")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Upload file" }),
    ).not.toBeInTheDocument();
  });

  it("renders custom content mixing subcomponents and regular elements", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <div data-testid="mixed-content">
          <h2>Custom Upload Section</h2>
          <InputFile.Button />
          <div className="custom-section">
            <InputFile.HintText />
            <p>Additional instructions</p>
          </div>
          <InputFile.Description>Important notes</InputFile.Description>
        </div>
      </InputFile>,
    );

    expect(screen.getByTestId("mixed-content")).toBeInTheDocument();
    expect(screen.getByText("Custom Upload Section")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Upload File" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select or drag a file here to upload"),
    ).toBeInTheDocument();
    expect(screen.getByText("Additional instructions")).toBeInTheDocument();
    expect(screen.getByText("Important notes")).toBeInTheDocument();
  });

  it("provides correct context to nested components", () => {
    render(
      <InputFile
        getUploadParams={fetchUploadParams}
        allowMultiple={true}
        description="Context Description"
        hintText="Context Hint"
        allowedTypes="images"
      >
        <InputFile.Button />
        <InputFile.Description />
        <InputFile.HintText />
      </InputFile>,
    );

    expect(screen.getByText("Context Description")).toBeInTheDocument();
    expect(screen.getByText("Context Hint")).toBeInTheDocument();
  });

  it("maintains dropzone functionality with custom content", async () => {
    const handleUploadStart = jest.fn();
    render(
      <InputFile
        getUploadParams={fetchUploadParams}
        onUploadStart={handleUploadStart}
      >
        <div data-testid="custom-content">
          <InputFile.Button />
          <p>Custom text</p>
        </div>
      </InputFile>,
    );

    const input = screen.getByTestId("input-file-input");
    await userEvent.upload(input, testFile);

    await waitFor(() => {
      expect(handleUploadStart).toHaveBeenCalled();
    });
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileButton } from "./InputFileButton";
import { InputFileContentContext } from "./InputFileContentContext";
import type { ButtonSize } from "../Button/Button.types";

describe("InputFileButton", () => {
  const defaultContextValue = {
    fileType: "File",
    allowMultiple: false,
    description: undefined,
    hintText: "Select or drag a file here to upload",
    buttonLabel: "Upload File",
    size: "base" as ButtonSize,
  };

  function renderWithContext(
    content: React.ReactElement,
    contextValue = defaultContextValue,
  ) {
    return render(
      <InputFileContentContext.Provider value={contextValue}>
        {content}
      </InputFileContentContext.Provider>,
    );
  }

  it("renders with default props from context", () => {
    renderWithContext(<InputFileButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Upload File");
    expect(button.className).toContain("base");
  });

  it("uses provided props over context values", () => {
    renderWithContext(
      <InputFileButton label="Custom Label" size="small" fullWidth />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Custom Label");
    expect(button.className).toContain("small");
    expect(button.className).toContain("fullWidth");
  });

  it("passes through additional button props", () => {
    renderWithContext(<InputFileButton disabled loading variation="work" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("loading");
    expect(button.className).toContain("work");
  });
});
import React from "react";
import { renderHook } from "@testing-library/react";
import {
  InputFileContentContext,
  useInputFileContentContext,
} from "./InputFileContentContext";

describe("InputFileContentContext", () => {
  it("provides default values when no context is provided", () => {
    const { result } = renderHook(() => useInputFileContentContext());

    expect(result.current).toEqual({
      fileType: "File",
      allowMultiple: false,
      description: undefined,
      hintText: "Select or drag a file here to upload",
      buttonLabel: "Upload File",
      size: "base",
    });
  });

  it("computes the hint text based on fileType and allowMultiple", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe(
      "Select or drag images here to upload",
    );
  });

  it("computes button label based on fileType and allowMultiple", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.buttonLabel).toBe("Upload Images");
  });

  it("uses provided hint text and button label when available", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "Custom hint text",
          buttonLabel: "Custom button label",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe("Custom hint text");
    expect(result.current.buttonLabel).toBe("Custom button label");
  });

  it("handles different file types correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Document",
          allowMultiple: false,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe(
      "Select or drag a document here to upload",
    );
    expect(result.current.buttonLabel).toBe("Upload Document");
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileDescription } from "./InputFileDescription";
import type { InputFileContentContextValue } from "./InputFileContentContext";
import { InputFileContentContext } from "./InputFileContentContext";

describe("InputFileDescription", () => {
  const defaultContextValue: InputFileContentContextValue = {
    fileType: "File",
    allowMultiple: false,
    description: undefined,
    hintText: undefined,
    buttonLabel: undefined,
    size: "base",
  };

  function renderWithContext(
    content: React.ReactElement,
    contextValue = defaultContextValue,
  ) {
    return render(
      <InputFileContentContext.Provider value={contextValue}>
        {content}
      </InputFileContentContext.Provider>,
    );
  }

  it("renders nothing when no description is provided in context or children", () => {
    const { container } = renderWithContext(<InputFileDescription />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders description from context", () => {
    renderWithContext(<InputFileDescription />, {
      ...defaultContextValue,
      description: "Context description text",
    });
    expect(screen.getByText("Context description text")).toBeInTheDocument();
  });

  it("renders children over context description", () => {
    renderWithContext(
      <InputFileDescription>Child description text</InputFileDescription>,
      {
        ...defaultContextValue,
        description: "Context description text",
      },
    );
    expect(screen.getByText("Child description text")).toBeInTheDocument();
    expect(
      screen.queryByText("Context description text"),
    ).not.toBeInTheDocument();
  });

  it("defaults to small size and subdued variation", () => {
    renderWithContext(<InputFileDescription />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("small", "textSecondary");
  });

  it("applies custom size prop", () => {
    renderWithContext(<InputFileDescription size="large" />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("large");
  });

  it("applies custom variation prop", () => {
    renderWithContext(<InputFileDescription variation="error" />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("critical");
  });

  it("passes through additional text props", () => {
    renderWithContext(
      <InputFileDescription align="center" maxLines="single" />,
      {
        ...defaultContextValue,
        description: "Description text",
      },
    );
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("center");
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileHintText } from "./InputFileHintText";
import { InputFileContentContext } from "./InputFileContentContext";
import type { ButtonSize } from "../Button/Button.types";

describe("InputFileHintText", () => {
  const defaultContextValue = {
    fileType: "File",
    allowMultiple: false,
    description: undefined,
    hintText: "Select or drag a file here to upload",
    buttonLabel: "Upload File",
    size: "base" as ButtonSize,
  };

  function renderWithContext(
    content: React.ReactElement,
    contextValue = defaultContextValue,
  ) {
    return render(
      <InputFileContentContext.Provider value={contextValue}>
        {content}
      </InputFileContentContext.Provider>,
    );
  }

  it("renders hint text from context when no children provided", () => {
    renderWithContext(<InputFileHintText />);
    expect(
      screen.getByText("Select or drag a file here to upload"),
    ).toBeInTheDocument();
  });

  it("renders children instead of context hint text when provided", () => {
    renderWithContext(<InputFileHintText>Custom hint text</InputFileHintText>);
    expect(screen.getByText("Custom hint text")).toBeInTheDocument();
    expect(
      screen.queryByText("Select or drag a file here to upload"),
    ).not.toBeInTheDocument();
  });

  it("passes through text props to underlying Text component", () => {
    renderWithContext(<InputFileHintText size="large" variation="subdued" />);
    const textElement = screen.getByText(
      "Select or drag a file here to upload",
    );
    expect(textElement).toHaveClass("large", "textSecondary");
  });
});

```

## Component Path

`/components/InputFile`

---

_Generated on 2025-08-21T17:35:16.365Z_
