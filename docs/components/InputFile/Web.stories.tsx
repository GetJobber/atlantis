import React, { useState } from "react";
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
        buttonLabel="Dropzone Uploader with supportText"
        getUploadParams={fetchUploadParams}
        allowedTypes="images"
        supportText="JPEG, HEIC, PNG up to 5MB each"
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

export const SupportText = StatefulTemplate.bind({});
SupportText.args = {
  allowMultiple: true,
  getUploadParams: () => Promise.resolve({ url: "https://httpbin.org/post" }),
  supportText: "JPEG, HEIC, PNG up to 5MB each",
};
