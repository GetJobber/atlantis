import { Box, Grid, Heading, Markdown, Stack, Text } from "@jobber/components";

export const VisualTestMarkdownPage = () => {
  const basicContent = "This is **bold** and this is _italic_ text.";
  const complexContent = `
# Heading 1
## Heading 2

This is a paragraph with **bold** and _italic_ text.

* List item 1
* List item 2
* List item 3

[Visit Jobber](https://www.getjobber.com)
`;

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Markdown Examples</Heading>

        <Stack gap="large">
          {/* Basic Markdown */}
          <section>
            <Text size="large">Basic Markdown</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Markdown content={basicContent} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Complex Markdown */}
          <section>
            <Text size="large">Complex Markdown</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Markdown content={complexContent} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Basic Usage Only */}
          <section>
            <Text size="large">Basic Usage Only</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Markdown content={complexContent} basicUsage={true} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* External Links */}
          <section>
            <Text size="large">External Links</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Markdown
                  content="[Open in new tab](https://www.getjobber.com)"
                  externalLink={true}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* With Link Click Handler */}
          <section>
            <Text size="large">With Link Click Handler</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Markdown
                  content="[Click me](https://www.getjobber.com)"
                  onLinkClick={target => {
                    console.log("Link clicked:", target.href);
                  }}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
