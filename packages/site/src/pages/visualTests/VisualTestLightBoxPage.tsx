import {
  Box,
  Button,
  Grid,
  Heading,
  LightBox,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestLightBoxPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

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
        <Heading level={1}>LightBox Examples</Heading>

        <Stack gap="large">
          {/* Basic LightBox */}
          <section>
            <Text size="large">Basic LightBox</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Button
                    label="Open LightBox"
                    onClick={() => {
                      setImageIndex(0);
                      setIsOpen(true);
                    }}
                  />
                  <LightBox
                    open={isOpen}
                    images={images}
                    imageIndex={imageIndex}
                    onRequestClose={({ lastPosition }) => {
                      setIsOpen(false);
                      setImageIndex(lastPosition);
                    }}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* LightBox with specific image */}
          <section>
            <Text size="large">LightBox with specific image</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Button
                    label="Open Second Image"
                    onClick={() => {
                      setImageIndex(1);
                      setIsOpen(true);
                    }}
                  />
                  <LightBox
                    open={isOpen}
                    images={images}
                    imageIndex={imageIndex}
                    onRequestClose={({ lastPosition }) => {
                      setIsOpen(false);
                      setImageIndex(lastPosition);
                    }}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* LightBox with single image */}
          <section>
            <Text size="large">LightBox with single image</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Button
                    label="Open Single Image"
                    onClick={() => {
                      setImageIndex(0);
                      setIsOpen(true);
                    }}
                  />
                  <LightBox
                    open={isOpen}
                    images={[images[0]]}
                    imageIndex={0}
                    onRequestClose={() => setIsOpen(false)}
                  />
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
