import {
  Box,
  Button,
  Card,
  Content,
  Grid,
  Heading,
  Link,
  List,
  Page,
  Tab,
  Tabs,
  showToast,
} from "@jobber/components";
import "./ComponentView.css";
import { useParams } from "react-router";
import { ReactNode, useEffect, useMemo } from "react";
import prism from "prismjs";
import reactElementToJSXString from "react-element-to-jsx-string";
import { PageWrapper } from "../../layout/PageWrapper";
import { SiteContent } from "../../content";
import { PropsList } from "../PropsList";
import { usePageValues } from "../../hooks/usePageValues";

export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const PageMeta = SiteContent[name];
  const Component = PageMeta?.component.element as () => ReactNode;
  const { updateValue, values, stateValueWithFunction } = usePageValues(
    PageMeta?.props,
    PageMeta?.component.defaultProps,
  );
  const ComponentContent = PageMeta?.content as () => ReactNode;

  const updateStyles = () => {
    // Tabs fires this update before updating its own DOM.
    requestAnimationFrame(() => {
      const pres = document.querySelectorAll(".root-pre");
      pres.forEach(p => {
        p.classList.remove("language-tsx");
        p.classList.add("language-javascript");
      });
      const code = document.querySelectorAll(".root-code");
      code.forEach(p => {
        p.classList.remove("language-tsx");
        p.classList.add("language-javascript");
      });
      prism.highlightAll();
    });
  };
  useEffect(() => {
    updateStyles();
    window.addEventListener("error", e => {
      if (e.type === "error" && e.message) {
        showToast({ message: e.message });
        e.preventDefault();
      }
    });
  }, []);

  const code = useMemo(() => {
    return reactElementToJSXString(<Component {...stateValueWithFunction} />);
  }, [stateValueWithFunction]);

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
                    <Component {...stateValueWithFunction} />
                  </preview-window>
                </Box>
                <Tabs onTabChange={updateStyles}>
                  <Tab label="Design">
                    <Content spacing="large">
                      <ComponentContent />
                    </Content>
                  </Tab>
                  <Tab label="Props">
                    <PropsList
                      defaultProps={PageMeta?.props}
                      values={values}
                      updateValue={updateValue}
                    />
                  </Tab>
                  <Tab label="Code">
                    <preview-code>
                      <Box width={"100%"} alignItems="start">
                        <Box width={"100%"}>
                          <pre className="root-pre type-javascript">
                            <code className="root-code type-javascript">
                              {code}
                            </code>
                          </pre>
                        </Box>

                        <Box width="100%" direction="row" justifyContent="end">
                          <Button
                            label="Copy"
                            type="tertiary"
                            size="small"
                            onClick={() => {
                              navigator.clipboard.writeText(code);
                              showToast({
                                message: "Copied code to clipboard",
                              });
                            }}
                          ></Button>
                        </Box>
                      </Box>
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
            <Link url="/components">Back to components</Link>
          </Box>
        </Content>
      </Box>
    </Page>
  );
};
