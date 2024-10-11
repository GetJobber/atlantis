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
                    content: "Add new entry to componentList.ts",
                    id: 1,
                  },
                  {
                    content:
                      "Add a new folder under src/content that matches the title used above. Use Button or Chip as an example",
                    id: 2,
                  },
                  {
                    content:
                      "Add an entry to generate new props. In generateDocs.mjs, add the new key you just used for the folder (componentName)",
                    id: 3,
                  },
                  {
                    content:
                      "Add a new entry to site/src/content/index.ts that matches your title",
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
