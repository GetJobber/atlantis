import { Box, Gallery, Grid, Heading, Stack, Text } from "@jobber/components";
import { useState } from "react";
import { GalleryFile } from "@jobber/components/Gallery";

export const VisualTestGalleryPage = () => {
  const [files, setFiles] = useState<GalleryFile[]>([
    {
      key: "1",
      name: "Image 1",
      type: "image/jpeg",
      size: 200000,
      progress: 1,
      thumbnailSrc: "https://placehold.co/200x200/e6e6e6/999999?text=1",
      src: "https://placehold.co/800x800/e6e6e6/999999?text=1",
    },
    {
      key: "2",
      name: "Image 2",
      type: "image/jpeg",
      size: 200000,
      progress: 1,
      thumbnailSrc: "https://placehold.co/200x200/e6e6e6/999999?text=2",
      src: "https://placehold.co/800x800/e6e6e6/999999?text=2",
    },
    {
      key: "3",
      name: "Image 3",
      type: "image/jpeg",
      size: 200000,
      progress: 1,
      thumbnailSrc: "https://placehold.co/200x200/e6e6e6/999999?text=3",
      src: "https://placehold.co/800x800/e6e6e6/999999?text=3",
    },
    {
      key: "4",
      name: "Image 4",
      type: "image/jpeg",
      size: 200000,
      progress: 1,
      thumbnailSrc: "https://placehold.co/200x200/e6e6e6/999999?text=4",
      src: "https://placehold.co/800x800/e6e6e6/999999?text=4",
    },
    {
      key: "5",
      name: "Image 5",
      type: "image/jpeg",
      size: 200000,
      progress: 1,
      thumbnailSrc: "https://placehold.co/200x200/e6e6e6/999999?text=5",
      src: "https://placehold.co/800x800/e6e6e6/999999?text=5",
    },
  ]);

  const handleDelete = (fileToDelete: GalleryFile) => {
    setFiles(files.filter(file => file.key !== fileToDelete.key));
  };

  return (
    <Box padding="large">
      <Stack space="extravagant">
        <Heading level={1}>Gallery Examples</Heading>

        <Stack space="large">
          {/* Basic Gallery */}
          <section>
            <Text size="large">Basic Gallery</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Gallery files={files.slice(0, 3)} size="base" />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Large Gallery */}
          <section>
            <Text size="large">Large Gallery</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Gallery files={files.slice(0, 3)} size="large" />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Gallery with Max Limit */}
          <section>
            <Text size="large">Gallery with Max Limit</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Gallery files={files} max={3} size="base" />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Gallery with Delete Action */}
          <section>
            <Text size="large">Gallery with Delete Action</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Gallery files={files} onDelete={handleDelete} size="base" />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
