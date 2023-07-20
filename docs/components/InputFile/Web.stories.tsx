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
    options: { showPanel: true },
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof InputFile>;

function fetchUploadParams() {
  return Promise.resolve({ url: "https://httpbin.org/post" });
}

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

const VariationsAndSizesTemplate: ComponentStory<typeof InputFile> = () => {
  return (
    <Content>
      <Heading level={2}>Dropzone</Heading>
      <InputFile getUploadParams={fetchUploadParams} />
      <InputFile size="small" getUploadParams={fetchUploadParams} />

      <Heading level={2}>Button</Heading>
      <InputFile variation="button" getUploadParams={fetchUploadParams} />
      <InputFile
        variation="button"
        size="small"
        getUploadParams={fetchUploadParams}
      />
    </Content>
  );
};
export const VariationsAndSizes = VariationsAndSizesTemplate.bind({});
VariationsAndSizes.parameters = {
  options: { showPanel: false },
};

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
