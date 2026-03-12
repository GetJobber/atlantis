import React, { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@jobber/components/Card";
import type { FileUpload } from "@jobber/components/InputFile";
import {
  InputFile,
  updateFiles,
  useInputFileContentContext,
} from "@jobber/components/InputFile";
import { Button } from "@jobber/components/Button";
import { FormatFile } from "@jobber/components/FormatFile";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";
import { Icon } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Forms and Inputs/InputFile",
  component: InputFile,
} satisfies Meta<typeof InputFile>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputFile>>>;

function fetchUploadParams() {
  return Promise.resolve({ url: "https://httpbin.org/post" });
}

const StatefulTemplate = (args: Story["args"]) => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <>
      <InputFile
        {...args}
        getUploadParams={args?.getUploadParams ?? fetchUploadParams}
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

const FileSizeValidatorTemplate = (args: Story["args"]) => {
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
        getUploadParams={args?.getUploadParams ?? fetchUploadParams}
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

const MaxFilesTemplate = (args: Story["args"]) => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <>
      <Heading level={4}>Attempt to upload more than 3 files</Heading>
      <InputFile
        {...args}
        getUploadParams={args?.getUploadParams ?? fetchUploadParams}
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
    setFiles(oldFiles => oldFiles.filter(f => f.key !== file.key));
  }
};

const VariationsAndSizesTemplate = (args: Story["args"]) => {
  return (
    <Content>
      <Heading level={2}>Default</Heading>
      <InputFile
        {...args}
        getUploadParams={args?.getUploadParams ?? fetchUploadParams}
      />

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
};
export const VariationsAndSizes: Story = {
  render: VariationsAndSizesTemplate,
};

export const UsingUpdateFiles: Story = {
  render: StatefulTemplate,
  args: {
    allowMultiple: true,
    getUploadParams: fetchUploadParams,
  },
};

export const ImagesOnly: Story = {
  render: StatefulTemplate,
  args: {
    allowMultiple: true,
    allowedTypes: "images",
    getUploadParams: fetchUploadParams,
  },
};

export const CustomAllowedTypes: Story = {
  render: StatefulTemplate,
  args: {
    allowMultiple: true,
    allowedTypes: ["JPEG", "PNG", "PDF", "DOCX"],
    getUploadParams: fetchUploadParams,
  },
};

export const MaxFilesLimit: Story = {
  render: MaxFilesTemplate,
  args: {
    allowMultiple: true,
    getUploadParams: fetchUploadParams,
  },
};

export const WithDescription: Story = {
  render: StatefulTemplate,
  args: {
    allowMultiple: true,
    getUploadParams: fetchUploadParams,
    description: "JPEG, HEIC, PNG up to 5MB each",
  },
};

export const WithCustomHintText: Story = {
  render: StatefulTemplate,
  args: {
    allowMultiple: true,
    getUploadParams: fetchUploadParams,
    description: "This is the description",
    hintText: "This is the custom hint text",
  },
};

export const FileSizeValidator: Story = {
  render: FileSizeValidatorTemplate,
  args: {
    allowMultiple: true,
    getUploadParams: fetchUploadParams,
  },
};

const DropzoneContextDisplay = () => {
  const context = useInputFileContentContext();

  return (
    <Card elevation="base">
      <div style={{ padding: 16 }}>
        <Heading level={5}>
          Custom content can still access the InputFile context
        </Heading>
        <ul>
          <li>
            <Text>File Type: {context.fileType}</Text>
          </li>
          <li>
            <Text>Allow Multiple: {context.allowMultiple ? "Yes" : "No"}</Text>
          </li>
          <li>
            <Text>Description: {context.description}</Text>
          </li>
          <li>
            <Text>Hint Text: {context.hintText}</Text>
          </li>
          <li>
            <Text>Button Label: {context.buttonLabel}</Text>
          </li>
        </ul>
      </div>
    </Card>
  );
};

const CustomDropzoneContentTemplate = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <Content>
      <Heading level={4}>Custom Button</Heading>
      <InputFile
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.DropzoneWrapper>
          <Button ariaLabel="Upload" icon="image" type="tertiary" />
        </InputFile.DropzoneWrapper>
      </InputFile>

      <Heading level={4}>Custom Icons</Heading>
      <InputFile
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.DropzoneWrapper>
          <Icon name="pdf" />
          <Icon name="arrowRight" />
          <Icon name="printer" />
        </InputFile.DropzoneWrapper>
      </InputFile>

      <Heading level={4}>Custom content that uses InputFile.Provider</Heading>
      <InputFile
        allowMultiple={true}
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.DropzoneWrapper>
          <DropzoneContextDisplay />
        </InputFile.DropzoneWrapper>
      </InputFile>

      <Heading level={4}>Subcomponents in a different order</Heading>
      <InputFile
        description="Very cool description"
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.DropzoneWrapper>
          <Content spacing="small">
            <InputFile.HintText />
            <InputFile.Button size={"small"} fullWidth={false} />
            <InputFile.Description />
          </Content>
        </InputFile.DropzoneWrapper>
      </InputFile>

      <Heading level={4}>Subcomponents with additional content</Heading>
      <InputFile
        description="Very cool description"
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.DropzoneWrapper>
          <Content spacing="small">
            <Icon name="pdf" />
            <InputFile.Button size={"small"} fullWidth={false} />
            <InputFile.HintText />
            <Heading level={4}>Additional Header</Heading>
            <InputFile.Description />
          </Content>
        </InputFile.DropzoneWrapper>
      </InputFile>
      {files.map(file => (
        <FormatFile file={file} key={file.key} />
      ))}
    </Content>
  );

  function handleUpload(file: FileUpload) {
    setFiles(oldFiles => updateFiles(file, oldFiles));
  }
};

export const CustomContentInDropzoneVariation: Story = {
  render: CustomDropzoneContentTemplate,
};

const ButtonContextDisplay = () => {
  const context = useInputFileContentContext();

  return (
    <Button fullWidth={true}>
      <Text>File Type: {context.fileType}</Text>
    </Button>
  );
};

const CustomButtonContentTemplate = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <Content>
      <Heading level={4}>Custom button</Heading>
      <InputFile
        variation="button"
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <InputFile.Button
          ariaLabel="Upload image"
          label="Upload image"
          icon="image"
          type="tertiary"
          fullWidth={true}
        />
      </InputFile>

      <Heading level={4}>Custom button that uses InputFile.Provider</Heading>
      <InputFile
        variation="button"
        onUploadStart={handleUpload}
        onUploadProgress={handleUpload}
        onUploadComplete={handleUpload}
        getUploadParams={() =>
          Promise.resolve({ url: "https://httpbin.org/post" })
        }
      >
        <ButtonContextDisplay />
      </InputFile>

      {files.map(file => (
        <FormatFile file={file} key={file.key} />
      ))}
    </Content>
  );

  function handleUpload(file: FileUpload) {
    setFiles(oldFiles => updateFiles(file, oldFiles));
  }
};

export const CustomContentInButtonVariation: Story = {
  render: CustomButtonContentTemplate,
};
