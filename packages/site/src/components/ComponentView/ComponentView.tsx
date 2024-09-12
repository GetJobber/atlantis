import {
  Box,
  Card,
  Content,
  Grid,
  Heading,
  InputText,
  Link,
  List,
  Page,
  Tab,
  Tabs,
} from "@jobber/components";
import "./ComponentView.css";
import { useParams } from "react-router";
import { ReactNode } from "react";
import { PageWrapper } from "../../layout/PageWrapper";
import { SiteContent } from "../../content";
import { PropsList } from "../PropsList";
import { usePageValues } from "../../hooks/usePageValues";

export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const PageMeta = SiteContent[name];
  const Component = PageMeta?.component.element as () => ReactNode;
  const { updateValue, mappedProps } = usePageValues(
    PageMeta?.component.defaultProps,
  );
  const ComponentContent = PageMeta?.content as () => ReactNode;

  return PageMeta ? (
    <Grid>
      <Grid.Cell size={{ xs: 12, md: 9 }}>
        <Page
          width="fill"
          title={PageMeta?.title}
          subtitle={PageMeta?.description}
        >
          <PageWrapper>
            <component-documentation>
              <Content spacing="large">
                <Box direction="column" gap="small">
                  <preview-window>
                    <Component {...mappedProps} />
                  </preview-window>
                </Box>
                <Tabs>
                  <Tab label="Design">
                    <Content spacing="large">
                      <ComponentContent />
                    </Content>
                  </Tab>
                  <Tab label="Props">
                    <PropsList
                      defaultProps={PageMeta?.props}
                      values={mappedProps}
                      updateValue={updateValue}
                    />
                  </Tab>
                  <Tab label="Code Editor">
                    <preview-code>
                      <InputText multiline value={PageMeta?.component.code} />
                    </preview-code>
                  </Tab>
                  <Tab label="another">
                    <preview-code>
                      <InputText multiline value={PageMeta?.component.code} />
                    </preview-code>
                  </Tab>
                </Tabs>
              </Content>
            </component-documentation>
          </PageWrapper>
        </Page>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12, md: 3 }}>
        <Content>
          <Box padding="base" direction="column">
            <Heading level={2}>Links</Heading>
            <Box>
              {PageMeta?.links.map((link, index) => (
                <Box key={index}>
                  <Link key={index} url={link.url}>
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Content>
      </Grid.Cell>
    </Grid>
  ) : (
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
            <Link url="/components/web">Back to components</Link>
          </Box>
        </Content>
      </Box>
    </Page>
  );
};
