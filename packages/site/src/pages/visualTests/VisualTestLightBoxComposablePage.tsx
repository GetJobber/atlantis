import {
  Box,
  Button,
  Grid,
  Heading,
  LightBox,
  Stack,
  Text,
  useLightBoxContext,
} from "@jobber/components";
import { useState } from "react";

/**
 * Renders the slides and navigation for the inline gallery demo. Defined
 * outside the page component so it can safely access LightBox context via
 * the hook without being recreated on every parent render.
 */
function GalleryContent() {
  const { handleMouseMove } = useLightBoxContext();

  return (
    <div
      data-testid="ATL-Gallery"
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        height: 400,
        backgroundColor: "var(--color-base-grey--400)",
        borderRadius: "var(--radius-base)",
        overflow: "hidden",
      }}
    >
      <LightBox.Slides />
      <LightBox.Navigation />
    </div>
  );
}

export const VisualTestLightBoxComposablePage = () => {
  const [composableOpen, setComposableOpen] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const images = [
    {
      url: "https://placehold.co/800x600/e6e6e6/999999?text=Image+1",
      title: "Image 1",
      caption: "This is the first image",
    },
    {
      url: "https://placehold.co/800x600/e6e6e6/999999?text=Image+2",
      title: "Image 2",
      caption: "This is the second image",
    },
    {
      url: "https://placehold.co/800x600/e6e6e6/999999?text=Image+3",
      title: "Image 3",
      caption: "This is the third image",
    },
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>LightBox Composable Examples</Heading>

        <Stack gap="large">
          {/* Composable fullscreen */}
          <section>
            <Text size="large">Composable Fullscreen</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Button
                    label="Open Composable LightBox"
                    onClick={() => setComposableOpen(true)}
                  />
                  <LightBox.Provider
                    open={composableOpen}
                    images={images}
                    onRequestClose={() => setComposableOpen(false)}
                  >
                    <LightBox.Content />
                  </LightBox.Provider>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Inline gallery */}
          <section>
            <Text size="large">Inline Gallery</Text>
            <Stack gap="small">
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 6 }}>
                  <Stack gap="small">
                    <Button
                      label={
                        galleryVisible
                          ? "Hide Inline Gallery"
                          : "Show Inline Gallery"
                      }
                      onClick={() => setGalleryVisible(v => !v)}
                    />
                  </Stack>
                </Grid.Cell>
              </Grid>
              {galleryVisible && (
                <LightBox.Provider
                  open={true}
                  images={images}
                  imageIndex={galleryIndex}
                  onImageChange={setGalleryIndex}
                >
                  <GalleryContent />
                  <LightBox.Thumbnails />
                </LightBox.Provider>
              )}
            </Stack>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
