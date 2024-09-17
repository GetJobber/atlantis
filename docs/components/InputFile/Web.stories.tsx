import React, { useCallback, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  FileUpload,
  InputFile,
  updateFiles,
} from "@jobber/components/InputFile";
import { FormatFile } from "@jobber/components/FormatFile";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Forms and Inputs/InputFile/Web",
  component: InputFile,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/InputFile": [
            "FileUpload",
            "InputFile",
            "updateFiles",
          ],
        },
      },
    },
  },
} as ComponentMeta<typeof InputFile>;

const StatefulTemplate: ComponentStory<typeof InputFile> = args => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <>
      <InputFile
        {...args}
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
      />
      {files.map(file => (
        <FormatFile file={file} key={file.key} />
      ))}
    </>
  );

  function handleUpload(file: FileUpload) {
    setFiles(oldFiles => updateFiles(file, oldFiles));
  }
};

const FileSizeValidatorTemplate: ComponentStory<typeof InputFile> = args => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const maxFileSize = 2 * 1024 * 1024;
  const fileSizeValidator = useCallback(
    (file: File) => {
      if (file.size > maxFileSize) {
        return {
          code: "file-too-large",
          message: `File size should not exceed ${
            maxFileSize / (1024 * 1024)
          } MB.`,
        };
      }

      return null;
    },
    [maxFileSize],
  );

  return (
    <>
      <Heading level={4}>Attempt to upload an image larger than 2MB</Heading>
      <InputFile
        {...args}
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        validator={fileSizeValidator}
        allowedTypes="basicImages"
        description="JPEG, JPG or PNG up to 2MB each"
      />
      {files.map(file => (
        <FormatFile file={file} key={file.key} />
      ))}
    </>
  );

  function handleUpload(file: FileUpload) {
    setFiles(oldFiles => updateFiles(file, oldFiles));
  }
};

const MaxFilesTemplate: ComponentStory<typeof InputFile> = args => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <>
      <Heading level={4}>Upload more than 3 files at one time</Heading>
      <InputFile
        {...args}
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        maxFilesValidation={{ maxFiles: 3, numberOfCurrentFiles: files.length }}
      />
      {files.map(file => (
        <FormatFile
          file={file}
          key={file.key}
          onDelete={() => {
            handleDelete(file);
          }}
        />
      ))}
    </>
  );

  function handleUpload(file: FileUpload) {
    setFiles(oldFiles => updateFiles(file, oldFiles));
  }

  function handleDelete(file: FileUpload) {
    console.log(file);
    setFiles(oldFiles => oldFiles.filter(f => f.key !== file.key));
  }
};

const VariationsAndSizesTemplate: ComponentStory<typeof InputFile> = args => {
  return (
    <Content>
      <Heading level={2}>Default</Heading>
      <InputFile {...args} />

      <Heading level={2}>Dropzone</Heading>
      <InputFile
        buttonLabel="Base Dropzone Uploader"
        getUploadParams={fetchUploadParams}
      />
      <InputFile
        buttonLabel="Dropzone Uploader with description"
        getUploadParams={fetchUploadParams}
        allowMultiple
        allowedTypes="images"
        description="JPEG, HEIC, PNG up to 5MB each"
      />
      <InputFile
        size="small"
        getUploadParams={fetchUploadParams}
        buttonLabel="Small Dropzone Uploader"
      />

      <Heading level={2}>Button</Heading>
      <InputFile
        variation="button"
        size="base"
        buttonLabel="Base Button Uploader"
        getUploadParams={fetchUploadParams}
      />
      <InputFile
        variation="button"
        size="small"
        buttonLabel="Small Button Uploader"
        getUploadParams={fetchUploadParams}
      />
    </Content>
  );

  function fetchUploadParams() {
    return Promise.resolve({ url: "https://httpbin.org/post" });
  }
};
export const VariationsAndSizes = VariationsAndSizesTemplate.bind({});

export const UsingUpdateFiles = StatefulTemplate.bind({});
UsingUpdateFiles.args = {
  allowMultiple: true,
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
};

export const ImagesOnly = StatefulTemplate.bind({});
ImagesOnly.args = {
  allowMultiple: true,
  allowedTypes: "images",
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
};

export const MaxFilesLimit = MaxFilesTemplate.bind({});
MaxFilesLimit.args = {
  allowMultiple: true,
  // maxFiles: 3,
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
};

export const WithDescription = StatefulTemplate.bind({});
WithDescription.args = {
  allowMultiple: true,
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
  description: "JPEG, HEIC, PNG up to 5MB each",
};

export const FileSizeValidator = FileSizeValidatorTemplate.bind({});
FileSizeValidator.args = {
  allowMultiple: true,
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
};
