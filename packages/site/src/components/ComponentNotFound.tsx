import {
  Box,
  Card,
  Content,
  Heading,
  Link,
  List,
  Page,
} from "@jobber/components";

/**
 * Instructions that show up if a node cannot be found, typically in the ComponentView.
 * @returns ReactNode
 */
export const ComponentNotFound = () => {
  return (
    <Page width="fill" title="Component not found">
      <Box padding="base" direction="column">
        <Content>
          <Heading level={2}>Steps to (possibly) correct</Heading>
          <Box>
            <Card>
              <List
                items={[
                  {
                    content: "Add new entry to Components Web",
                    id: 1,
                    caption:
                      "Make the key you use matches the one in content/index.ts",
                  },
                  {
                    content:
                      "Add a new folder under src/content that matches the key used above and mimics Button or Chip",
                    id: 2,
                  },
                  {
                    content:
                      "Add an entry to generate new props. Under generateDocs.mjs, add the new key you just used for the folder (componentName)",
                    id: 3,
                  },
                  {
                    content:
                      "Add a new entry to site/src/content/index.ts that matches your key",
                    id: 4,
                  },
                  {
                    content:
                      "Remove any Storybook specific components from any copied/moved MDX files",
                    id: 4,
                  },
                  { content: "Reload this page", id: 5 },
                ]}
              ></List>
            </Card>
          </Box>
          <Box>
            <Link url="/components">Back to components</Link>
          </Box>
        </Content>
      </Box>
    </Page>
  );
};
