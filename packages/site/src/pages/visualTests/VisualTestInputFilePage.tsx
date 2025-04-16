import { Box, Grid, Heading, InputFile, Stack, Text } from "@jobber/components";
import { useState } from "react";
import { FileUpload } from "@jobber/components/InputFile";

export const VisualTestInputFilePage = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);

  const handleUploadParams = (file: File) => {
    // In a real app, this would return upload params from your server
    return {
      url: "https://example.com/upload",
      key: file.name,
      fields: {
        "content-type": file.type,
      },
    };
  };

  const handleUploadComplete = (file: FileUpload) => {
    setFiles(prevFiles => [...prevFiles, file]);
  };

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>InputFile Examples</Heading>

        <Stack gap="large">
          {/* Basic InputFile (Dropzone) */}
          <section>
            <Text size="large">Basic InputFile (Dropzone)</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputFile
                  getUploadParams={handleUploadParams}
                  onUploadComplete={handleUploadComplete}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputFile Button Variation */}
          <section>
            <Text size="large">InputFile Button Variation</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputFile
                  variation="button"
                  getUploadParams={handleUploadParams}
                  onUploadComplete={handleUploadComplete}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputFile with Multiple Files */}
          <section>
            <Text size="large">InputFile with Multiple Files</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputFile
                  allowMultiple={true}
                  getUploadParams={handleUploadParams}
                  onUploadComplete={handleUploadComplete}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputFile with File Type Restrictions */}
          <section>
            <Text size="large">InputFile with File Type Restrictions</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <InputFile
                    allowedTypes="images"
                    getUploadParams={handleUploadParams}
                    onUploadComplete={handleUploadComplete}
                    description="Only image files are allowed"
                  />
                  <InputFile
                    allowedTypes="basicImages"
                    getUploadParams={handleUploadParams}
                    onUploadComplete={handleUploadComplete}
                    description="Only PNG, JPG, and JPEG files are allowed"
                  />
                  <InputFile
                    allowedTypes={["application/pdf"]}
                    getUploadParams={handleUploadParams}
                    onUploadComplete={handleUploadComplete}
                    description="Only PDF files are allowed"
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* InputFile with Max Files */}
          <section>
            <Text size="large">InputFile with Max Files</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputFile
                  allowMultiple={true}
                  getUploadParams={handleUploadParams}
                  onUploadComplete={handleUploadComplete}
                  maxFilesValidation={{
                    maxFiles: 3,
                    numberOfCurrentFiles: files.length,
                  }}
                  description="Maximum 3 files allowed"
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Small InputFile */}
          <section>
            <Text size="large">Small InputFile</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <InputFile
                  size="small"
                  getUploadParams={handleUploadParams}
                  onUploadComplete={handleUploadComplete}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
